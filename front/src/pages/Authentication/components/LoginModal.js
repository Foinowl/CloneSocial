import React from 'react'

import Modal from '../../../components/Modal'

const LoginModal = ({ active, setActive }) => {
  return (
  
    <Modal active={active} setActive={setActive} auth={true}>
      <p>Logal modal </p>
    </Modal>
  )
}

export default LoginModal