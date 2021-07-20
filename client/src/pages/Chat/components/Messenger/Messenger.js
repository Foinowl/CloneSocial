import React from 'react'
import { useSelector, useDispatch } from "react-redux"


import ChatHeader from '../ChatHeader/ChatHeader'
import MessageBox from "../MessageBox/MessageBox"
import MessageInput from "../MessageInput/MessageInput"


import './Messenger.scss'


const Messenger = () => {
	const chat = useSelector((state) => state.chatReducer.currentChat)

	const activeChat = () => {
		return Object.keys(chat).length > 0
	}
	
  return (
		<div className="messenger shadow-light">
			{activeChat() ? (
				<div className="messenger__wrap">
					<ChatHeader chat={chat} />

					<hr />

					<MessageBox chat={chat} />
					<MessageInput chat={chat} />
				</div>
			) : (
				<p>No active chat</p>
			)}
		</div>
	)
}

export default Messenger