import React from 'react'
import { useSelector } from "react-redux"

import "./Friend.scss"


const Friend = ({chat, click}) => {

	const currentChat = useSelector((state) => state.chatReducer.currentChat)

	const isChatOpened = () => {
		return currentChat.id === chat.id ? "opened" : ""
	}

	const lastMessage = () => {
		if (chat.Messages.length === 0) return ""

		const message = chat.Messages[chat.Messages.length - 1]
		return message.type === "image" ? "image uploaded" : message.message
	}

  return (
		<div onClick={click} className={`friend-list ${isChatOpened()}`}>
			<div>
				<img
					width="40"
					height="40"
					alt="User avatar"
					src={chat.Users[0].avatar}
				/>
				<div className="friend-info">
					<h4 className="m-0">
						{chat.Users[0].firstName} {chat.Users[0].lastName}
					</h4>
					<h5 className="m-0" >{lastMessage()}</h5>
				</div>
			</div>
			<div className="friend-status">
				<span
					className={`online-status ${
						chat.Users[0].status === "online" ? "online" : "offline"
					}`}
				></span>
			</div>
		</div>
	)
}

export default Friend