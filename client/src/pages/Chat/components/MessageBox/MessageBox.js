import React, { useEffect, useRef, useState, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"

import { paginateMessages } from "../../../../store/actions/chat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Message from "../Message/Message"
import {
	addCurrentRepeatMsg,
	addCurrentIndexMsg,
} from "../../../../store/actions/chat"

import "./MessageBox.scss"

const MessageBox = ({ chat }) => {
	const dispatch = useDispatch()

	const repeatMessage = useSelector(
		(state) => state.chatReducer.repeatMessage
	)
	const indexMessage = useSelector((state) => state.chatReducer.currentIdMsg)
	
	const user = useSelector((state) => state.auth.user)
	const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom)
	const senderTyping = useSelector((state) => state.chatReducer.senderTyping)

	const [loading, setLoading] = useState(false)
	const [scrollUp, setScrollUp] = useState(0)
	const [fetchScrollUp, setFetchScrollUp] = useState(0)
	const [currentActiveMsg, setCurrentActiveMsg] = useState(null)
	const [indexScroll, setIndexScroll] = useState(0)
	const [fromMsgScroll, setFromMsgScroll] = useState(0)

	const [currentMsg, setCurrentMsg] = useState(repeatMessage)
	const [currInd, setCurrInd] = useState(indexMessage)


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

	const loadPrevMessages = () => {
		const pagination = chat.Pagination
		const page = typeof pagination === "undefined" ? 1 : pagination.page

		dispatch(paginateMessages(chat.id, parseInt(page) + 1))
			.then((res) => {
				setLoading(false)
			})
			.catch((err) => {
				setLoading(false)
			})
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


	useEffect(() => {
		dispatch(addCurrentRepeatMsg(currentMsg))
		dispatch(addCurrentIndexMsg(currInd))
	}, [currentMsg, currInd])


	useEffect(() => {
		setCurrInd(indexMessage)
		setCurrentMsg(repeatMessage)
	}, [repeatMessage, indexMessage])


	useEffect(() => {
		if (indexScroll === 0) {
			return
		}
		setTimeout(() => {
					const scrollHeightIndex = Array.from(msgBox.current.children).reduceRight(
			(prev, curr, index) => {
				if (indexScroll < index && index < fromMsgScroll) {
					return prev + curr.scrollHeight
				} else {
					return prev
				}
			},
			0
		)
		setTimeout(() => {
			scrollManual(msgBox.current.scrollTop - scrollHeightIndex)
		}, 100)

		const timer = setTimeout(() => {
			setIndexScroll(0)
			setCurrentActiveMsg(0)
		}, 6100)
		return () => clearTimeout(timer)
		}, 500)
	}, [indexScroll])


	useEffect(() => {
		if(fetchScrollUp === 0) {
			return
		}
		const indexToScroll = chat.Messages.findIndex(
			(el) => el.id === fetchScrollUp
		)
		const indexFromScroll = chat.Messages.findIndex(
			(el) => el.id === fromMsgScroll
		)
		setFromMsgScroll(indexFromScroll)
		setIndexScroll(indexToScroll)
		setCurrentActiveMsg(fetchScrollUp)
	}, [fetchScrollUp])

	const resetSett = () => {
		setCurrInd(null)
		setCurrentMsg(null)
	}

	const handlerClick = (ke) => {
		if(currInd === ke) {
			resetSett()
			return
		}

		setCurrInd(ke)
		setCurrentMsg(chat.Messages[ke])
	}

	const handlerRepeatClick = (e, parentId, fromId) => {
		e.stopPropagation()

		const indexToScroll = chat.Messages.findIndex((el) => el.id === parentId)
		const indexFromScroll = chat.Messages.findIndex((el) => el.id === fromId)
		if(indexToScroll === -1) {
			const page = Math.ceil(
				(chat.Messages[chat.Messages.length - 1].id - parentId) / 20
			) + 1
			if(page < 1) {
				return
			}
			dispatch(paginateMessages(chat.id, page))
				.then((res) => {
					if (res) {
						setFromMsgScroll(fromId)
						setFetchScrollUp(parentId)
					}
				})
				.catch((err) => {})			
		}
		else{
			setFromMsgScroll(indexFromScroll)
			setIndexScroll(indexToScroll)
			setCurrentActiveMsg(parentId)
		}
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

				{chat.Messages.map((message, index) => {
					return (
						<Fragment>
							<Message
								user={user}
								chat={chat}
								message={message}
								parentId={message.parentId}
								index={index}
								loadPrevMessages={loadPrevMessages}
								currentActiveMsg={currentActiveMsg}
								setCurrentActiveMsg={setCurrentActiveMsg}
								handlerRepeatClick={handlerRepeatClick}
								handlerClick={handlerClick}
								scrollManual={scrollManual}
								msgBox={msgBox}
								key={message.id}
							/>
						</Fragment>
					)
				})}
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
