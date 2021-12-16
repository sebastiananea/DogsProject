import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  return (
    <div>
      <div className='landing'>
        <div className='welcome'>
          <h1>Bienvenido!</h1>
          <Link to='/home'>
            <button className='btnLanding'>Ingresar</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
