import React, { Component } from 'react'
import './Canvas.css'

class Canvas extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isCapturing: false
    }

    this.onMouseDownHandler = () => this.beginPath()
    this.onMouseUpHandler = () => this.endPath()
    this.onMouseMoveHandler = (event) => this.capturePath(event)

    this.currentPath = []
    this.pathsCollection = []
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
      this.currentPath.push([ X, Y ])
      this.draw(this.currentPath)
    }
  }

  endPath() {
    this.setState({
      isCapturing: false
    })

    this.pathsCollection.push(this.currentPath)
  }

  draw(coords) {
    let context = this.canvas.getContext('2d')
    context.fillStyle = 'black'
    context.lineJoin = 'round'
    context.lineWidth = 2

    if (coords.length > 1) {
      let previousCoords = coords[coords.length - 2]
      let currentCoords = coords[coords.length - 1]

      context.beginPath()
      context.moveTo(previousCoords[0], previousCoords[1])
      context.lineTo(currentCoords[0], currentCoords[1])
      context.stroke()
    }
  }

  render() {
    return (
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
    )
  }
}

export default Canvas
