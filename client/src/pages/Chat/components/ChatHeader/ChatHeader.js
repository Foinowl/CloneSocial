import React, { useState, Fragment } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import ChatService from "../../../../services/chatService"
import useDebounce from "../../hooks/useDebounce"

import Modal from "../../../../components/Modal"
import searchIcon from "../../../../assets/images/searchIcon.svg"
import Button from "../../../../components/Button"


import "./ChatHeader.scss"

const ChatHeader = ({chat}) => {


	const [showChatOptions, setShowChatOptions] = useState(false)
	const [showAddFriendModal, setShowAddFriendModal] = useState(false)
	const [showLeaveChatModal, setShowLeaveChatModal] = useState(false)
	const [showDeleteChatModal, setShowDeleteChatModal] = useState(false)
	const [suggestions, setSuggestions] = useState([])

	const socket = useSelector((state) => state.chatReducer.socket)

	const searchFriends = (e) => {
		ChatService.searchUsers(e.target.value).then((res) =>
			setSuggestions(res)
		)
	}

	const addNewFriend = (id) => {
		ChatService.addFriendToGroupChat(id, chat.id)
			.then((data) => {
				socket.emit("add-user-to-group", data)
				setShowAddFriendModal(false)
			})
			.catch((err) => console.log(err))
	}


	const debouncedSearch = useDebounce(searchFriends, 650)


	const leaveChat = () => {
		ChatService.leaveCurrentChat(chat.id)
			.then((data) => {
				socket.emit("leave-current-chat", data)
			})
			.catch((err) => console.log(err))
	}

	const deleteChat = () => {
		ChatService.deleteCurrentChat(chat.id).then((data) => {
			socket.emit("delete-chat", data)
		})
	}
	
	return (
		<Fragment>
			<div className="chatter">
				{chat.Users.map((user) => {
					return (
						<div className="chatter__info" key={user.id}>
							<h3>
								{user.firstName} {user.lastName}
							</h3>
							<div className="chatter__info-status">
								<span
									className={`online-status ${
										user.status === "online" ? "online" : "offline"
									}`}
								></span>
							</div>
						</div>
					)
				})}
			</div>

			<FontAwesomeIcon
				onClick={() => setShowChatOptions(!showChatOptions)}
				icon={["fas", "ellipsis-v"]}
				className="fa-icon"
			/>

			{showChatOptions ? (
				<div id="wrapper-overflow" onClick={() => setShowChatOptions(false)}>
					<div id="settings">
						<div onClick={() => setShowAddFriendModal(true)}>
							<FontAwesomeIcon
								icon={["fas", "user-plus"]}
								className="fa-icon"
							/>
							<p>Add user to chat</p>
						</div>

						{chat.type === "group" ? (
							<div onClick={() => leaveChat()}>
								<FontAwesomeIcon
									icon={["fas", "sign-out-alt"]}
									className="fa-icon"
								/>
								<p>Leave chat</p>
							</div>
						) : null}

						{chat.type === "dual" ? (
							<div onClick={() => deleteChat()}>
								<FontAwesomeIcon icon={["fas", "trash"]} className="fa-icon" />
								<p>Delete chat</p>
							</div>
						) : null}
					</div>
				</div>
			) : null}

			{showAddFriendModal && (
				<Modal
					active={showAddFriendModal}
					setActive={setShowAddFriendModal}
					auth={false}
				>
					<div className="modal__bottom-image-about--left">
						<img src={searchIcon}></img>
						<span className="m-0">Add friend to group chat</span>
					</div>

					<div className="modal__bottom-info">
						<div className="modal__text">
							<div className="modal__text-top">
								<span>Find friends by typing their name bellow:</span>
							</div>
							<div className="modal__text-bottom">
								<input
									onInput={(e) => debouncedSearch(e)}
									type="text"
									placeholder="Search..."
								/>
							</div>
						</div>
						<div className="modal__bottom-children">
							<div id="suggestions">
								{suggestions.map((user) => {
									return (
										<div key={user.id} className="suggestion">
											<span className="m-0">
												<img src={`${user.avatar}`} />
												{user.firstName} {user.lastName}
											</span>
											<Button
												type="outlined"
												text="ADD"
												cls={"search-btn"}
												onClick={() => addNewFriend(user.id)}
											/>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</Modal>
			)}
		</Fragment>
	)
}

export default ChatHeader