import React from 'react'

const Footer = ({ children }) => {
  return (
    <footer>
      <div style={{
        paddingTop: '15px',
        paddingInline: '10px',
        backgroundColor: 'var(--app-background-color)'
      }}>
        <div className='container'>
          {children}
        </div>
      </div>
    </footer>
  )
}

export default Footer