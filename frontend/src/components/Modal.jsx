import React from 'react'
import InputForm from './InputForm'

const Modal = ({children , onClose}) => {

  return (
    <>
    <div className='backdrop' onClick={onClose}></div>
        <div className='modal'>
            {children}
        </div>
    </>
  )
}

export default Modal
