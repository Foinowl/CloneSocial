import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import Button from '../../../../components/Button'
import Friend from "../Friend/Friend"

import { setCurrentChat } from "../../../../store/actions/chat"

import './FriendList.scss'


const FriendList = () => {

	const dispatch = useDispatch()
	const chats = useSelector((state) => state.chatReducer.chats)
	const socket = useSelector((state) => state.chatReducer.socket)
	
  const [showFriendsModal, setShowFriendsModal] = useState(false)

	const openChat = (chat) => {
		dispatch(setCurrentChat(chat))
	}
	
  return (
		<div className="friends shadow-light">
			<div className="friends__title">
				<h3 className="m-0">Friends</h3>
				<Button
					cls="friends__title-button"
					onClick={() => setShowFriendsModal(true)}
					text={"ADD"}
				></Button>
			</div>

			<hr />

			<div className="friends__box">
				{chats.length > 0 ? (
					chats.map((chat) => {
						return (
							<Friend click={() => openChat(chat)} chat={chat} key={chat.id} />
						)
					})
				) : (
					<p id="no-chat">No friends added</p>
				)}
			</div>
		</div>
	)
}

export default FriendList