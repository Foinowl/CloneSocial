import React from 'react'

import Message from "../Message/Message"

import "./MessageBox.scss"


const MessageBox = ({ chat }) => {
  return (
		<div className="msg-box">
			{/* <p className="loader m-0">
        <FontAwesomeIcon icon="spinner" className="fa-spin" />
      </p> */}

			<Message user={"john"} chat={chat} message={"leelo"} />
		</div>
	)
}

export default MessageBox