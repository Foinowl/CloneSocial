import React from 'react'
import "./ChatHeader.scss"

const ChatHeader = ({chat}) => {

  return (
		<div className="chatter">
			<div className="chatter__info">
				<h3>Петров Василий</h3>
				<div className="chatter__info-status">
					<span className="online-status offline"></span>
				</div>
			</div>
		</div>
	)
}

export default ChatHeader