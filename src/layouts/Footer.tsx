import React from 'react'
import AboutUs from '../components/about-us/AboutUs'

const Footer = ({ children }) => {
  return (
    <footer>
      <div style={{
        paddingTop: '15px',
        paddingInline: '10px',
        backgroundColor: 'var(--secondary-background-color)'
      }}>
        <div className='container'>
          {children}
        </div>
      </div>
    </footer>
  )
}

export default Footer