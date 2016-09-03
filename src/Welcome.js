import React, { Component } from 'react'
import { Link } from 'react-router'
import './Welcome.css'

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <h1>Welcome to SnapCanvas</h1>
        <h5>A real-time, colaborative drawing board for short-lived masterpieces</h5>
        <Link to="/canvas">Start drawing</Link>
      </div>
    )
  }
}

export default Welcome
