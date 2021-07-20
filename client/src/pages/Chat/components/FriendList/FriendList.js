import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import Button from '../../../../components/Button'
import Modal from "../../../../components/Modal"
import Friend from "../Friend/Friend"

import { setCurrentChat } from "../../../../store/actions/chat"
import ChatService from "../../../../services/chatService"
import useDebounce from "../../hooks/useDebounce"

import icon from "../../../../assets/images/chat.svg"
import searchIcon from "../../../../assets/images/searchIcon.svg"

import './FriendList.scss'


const FriendList = () => {

	const dispatch = useDispatch()
	const chats = useSelector((state) => state.chatReducer.chats)
	const socket = useSelector((state) => state.chatReducer.socket)
	
	
	const [showAboutFriendsModal, setshowAboutFriendsModal] = useState(false)
	const [showFriendsModal, setShowFriendsModal] = useState(false)
	
	const [suggestions, setSuggestions] = useState([])
	
	const openChat = (chat) => {
		dispatch(setCurrentChat(chat))
	}
	
	const searchFriends = (e) => {
		ChatService.searchUsers(e.target.value).then((res) =>
		setSuggestions(res)
		)
	}

	const debouncedSearch = useDebounce(searchFriends, 650)

	const addNewFriend = (id) => {
		ChatService.createChat(id)
			.then((chats) => {
				socket.emit("add-friend", chats)
				setShowFriendsModal(false)
			})
			.catch((err) => console.log(err))
	}
	
  return (
		<div className="friends shadow-light">
			<div className="friends__title">
				<h3 className="m-0">Friends</h3>
				<Button
					cls="friends__title-button"
					onClick={() => setshowAboutFriendsModal(true)}
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

			{showAboutFriendsModal && (
				<Modal
					active={showAboutFriendsModal}
					setActive={setshowAboutFriendsModal}
					auth={false}
				>
					<div className="modal__bottom-image-about">
						<img src={icon}></img>
					</div>

					<div className="modal__bottom-info">
						<div className="modal__text">
							<div className="modal__text-top">
								<span>
									Чтобы начать диалог начните искать другого пользователя
								</span>
							</div>
							<div className="modal__text-bottom">
								<span>
									Когда вы найдете нужного пользователя, вы сможете делиться с
									ним с сообщениями и медиа.
								</span>
							</div>
						</div>
						<div className="modal__bottom-children">
							<Button
								text="Продолжить"
								type="primary"
								cls="fullWidth"
								onClick={() => {
									setshowAboutFriendsModal(false)
									setShowFriendsModal(true)
								}}
							></Button>
						</div>
					</div>
				</Modal>
			)}

			{showFriendsModal && (
				<Modal
					active={showFriendsModal}
					setActive={setShowFriendsModal}
					auth={false}
				>
					<div className="modal__bottom-image-about--left">
						<img src={searchIcon}></img>
						<span className="m-0">Create new chat</span>
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
		</div>
	)
}

export default FriendList