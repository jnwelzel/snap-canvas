import React, { Component } from 'react'
import firebase from 'firebase'
import './Canvas.css'
import FIREBASE_CONFIG from './firebase'

class Canvas extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isCapturing: false
    }

    this.onMouseDownHandler = () => this.beginPath()
    this.onMouseUpHandler = () => this.finishPath()
    this.onMouseMoveHandler = (event) => this.capturePath(event)

    this.currentPath = []
    this.pathsCollection = []
    this.randomUserId = Math.random().toString(36).substring(7)
    this.firebaseDB = firebase.initializeApp(FIREBASE_CONFIG).database()
  }

  beginPath() {
    this.setState({
      isCapturing: true
    })

    this.currentPath = []
  }

  capturePath(event) {
    const X = event.clientX
    const Y = event.clientY
    if (this.state.isCapturing) {
      this.currentPath.push([X, Y])
      this.draw(
        this.currentPath.length === 1 ? null : this.currentPath[this.currentPath.length - 2],
        [X, Y]
      )
    }
  }

  finishPath() {
    this.setState({
      isCapturing: false
    })

    this.pathsCollection.push(this.currentPath)
    let newKey = this.firebaseDB.ref().push({
      userId: this.randomUserId,
      drawing: this.currentPath
    }).key

    setTimeout(() => {
      this.firebaseDB.ref(newKey).remove()
    }, 3000)
  }

  draw(previousCoords, nextCoords) {
    let context = this.canvas.getContext('2d')
    context.fillStyle = 'black'
    context.lineJoin = 'round'
    context.lineWidth = 2

    if (previousCoords !== null && previousCoords !== undefined) {
      context.beginPath()
      context.moveTo(previousCoords[0], previousCoords[1])
      context.lineTo(nextCoords[0], nextCoords[1])
      context.stroke()
    }
  }

  clearCanvas() {
    let context = this.canvas.getContext('2d')
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  loadDrawings(drawings) {
    this.clearCanvas()

    Object.keys(drawings).forEach((drawingKey) => {
      let drawingCoords = drawings[drawingKey].drawing
      for (let i = 0; i < drawingCoords.length; i++) {
        this.draw(
          i > 0 ? drawingCoords[i - 1] : null,
          drawingCoords[i]
        )
      }
    })
  }

  componentDidMount() {
    this.firebaseDB.ref().on('value', (snapshot) => {
      if (snapshot.val() !== null)
        this.loadDrawings(snapshot.val())
      else
        this.clearCanvas()
    })
  }

  render() {
    return (
      <div>
        <span id="my-id" title="Your very own personal ID">{this.randomUserId}</span>
        <canvas
          className="Canvas"
          onMouseDown={this.onMouseDownHandler}
          onMouseUp={this.onMouseUpHandler}
          onMouseMove={this.onMouseMoveHandler}
          ref={(canvas) => this.canvas = canvas}
          id='le-canvas'
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    )
  }
}

export default Canvas
