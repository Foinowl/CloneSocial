import React, { useEffect, useRef, useState, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import {getRepeatMsg} from "../../../../utils/utils"

import { paginateMessages } from "../../../../store/actions/chat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Message from "../Message/Message"

import "./MessageBox.scss"

const MessageBox = ({ chat }) => {
	const dispatch = useDispatch()

	const user = useSelector((state) => state.auth.user)
	const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom)
	const senderTyping = useSelector((state) => state.chatReducer.senderTyping)
	const [loading, setLoading] = useState(false)
	const [scrollUp, setScrollUp] = useState(0)
	const [currentMsg, setCurrentMsg] = useState(null)
	const [currInd, setCurrInd] = useState(null)
	const [showChatOptions, setShowChatOptions] = useState(false)



	const msgBox = useRef()

	const scrollManual = (value) => {
		msgBox.current.scrollTop = value
	}


	const handleInfiniteScroll = (e) => {
		if (e.target.scrollTop === 0) {
			setLoading(true)
			const pagination = chat.Pagination
			const page = typeof pagination === "undefined" ? 1 : pagination.page

			dispatch(paginateMessages(chat.id, parseInt(page) + 1))
				.then((res) => {
					if (res) {
						setScrollUp(scrollUp + 1)
					}
					setLoading(false)
				})
				.catch((err) => {
					setLoading(false)
				})
		}
	}

	useEffect(() => {
		setTimeout(() => {
			scrollManual(Math.ceil(msgBox.current.scrollHeight * 0.1))
		}, 100)
	}, [scrollUp])

	useEffect(() => {
		if (
			senderTyping.typing &&
			msgBox.current.scrollTop > msgBox.current.scrollHeight * 0.3
		) {
			setTimeout(() => {
				scrollManual(msgBox.current.scrollHeight)
			}, 100)
		}
	}, [senderTyping])

	useEffect(() => {
		if (!senderTyping.typing) {
			setTimeout(() => {
				scrollManual(msgBox.current.scrollHeight)
			}, 100)
		}
	}, [scrollBottom])

	const resetSett = () => {
		setCurrInd(null)
		setCurrentMsg(null)
		setShowChatOptions(false)
	}

	const handlerClick = (ke) => {
		if(currInd === ke) {
			resetSett()
			return
		}

		setCurrInd(ke)
		setCurrentMsg(chat.Messages[ke])
		setShowChatOptions(true)
	}

	const closeRepeatWin = (e) => {
		e.stopPropagation()
		resetSett()
	}
	
    return (
			<div
				onScroll={handleInfiniteScroll}
				className="msg-box"
				id="msg-box"
				ref={msgBox}
			>
				{loading ? (
					<p className="loader m-0">
						<FontAwesomeIcon icon="spinner" className="fa-spin" />
					</p>
				) : null}

				{getRepeatMsg(chat.Messages).map((message, index) => {
					return (
						<Fragment>
							<Message
								user={user}
								chat={chat}
								message={message}
								index={index}
								showChatOptions={showChatOptions}
								setShowChatOptions={setShowChatOptions}
								handlerClick={handlerClick}
								key={message.id}
							/>
						</Fragment>
					)
				})}
				{showChatOptions ? (
					<div className="settingsMsg">
						<div className="container-repeat">
							<div>
								<FontAwesomeIcon
									icon={["fas", "retweet"]}
									className="fa-icon"
								/>
								<div>
									<h6 className="m-0">
										{currentMsg.User.firstName} {currentMsg.User.lastName}
									</h6>
									<p className="m-0">{currentMsg.message}</p>
								</div>
							</div>
							<FontAwesomeIcon
								icon={["fas", "plus-square"]}
								className="fa-icon"
								onClick={closeRepeatWin}
							/>
						</div>
					</div>
				) : null}
				{senderTyping.typing && senderTyping.chatId === chat.id ? (
					<div className="message mt-5p">
						<div className="other-person">
							<p className="m-0">
								{senderTyping.fromUser.firstName}{" "}
								{senderTyping.fromUser.lastName}...
							</p>
						</div>
					</div>
				) : null}
			</div>
		)
}

export default MessageBox
