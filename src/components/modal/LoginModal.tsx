import { createPortal } from 'react-dom';
import React from 'react'
import styles from './LoginModal.module.scss';


const Modal = () => {
  return (
    <div>Modal</div>
  )
}


export const LoginModal = () => {
  return (
    <div style={{ border: '2px solid black' }}>
      <p>This child is placed in the parent div.</p>
      {createPortal(
        <p>This child is placed in the document body.</p>,
        document.body
      )}
    </div>
  )
}

export default LoginModal;
