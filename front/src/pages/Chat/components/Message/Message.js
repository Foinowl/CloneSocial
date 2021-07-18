import React from 'react'


import "./Message.scss"

const Message = ({ user, chat, index, message }) => {
  return (
		<div className="message">
			<div className="other-person">
				<h6 className="m-0">Петров Петрович</h6>

				<p className="m-0">Вот вам текст</p>

				<img src={message.message} alt="User upload" />
			</div>
		</div>
	)
}


export default Message