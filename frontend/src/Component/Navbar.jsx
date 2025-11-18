import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div id='main'>
      <h1>Grocery Mart</h1>
    <ul>
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Discover">Discover</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
    </ul>
    </div>
  )
}
