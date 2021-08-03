import React, { useEffect, useRef, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./Message.scss"

const Message = ({
	user,
	chat,
	index,
	message,
	showChatOptions,
	setShowChatOptions,
	handlerClick,
}) => {
	const [stateFocus, setStateFocus] = useState(false)
	const determineMargin = () => {
		if (index + 1 === chat.Messages.length) return

		return message.fromUserId === chat.Messages[index + 1].fromUserId
			? "mb-5"
			: "mb-10"
	}

	// const handlerClick = (e) => {
	// 	setShowChatOptions(!showChatOptions)
	// }
	const determMsg = (e) => {
		handlerClick(index)
	}

	return (
		<>
			<div
				className={`message ${determineMargin()} ${
					message.fromUserId === user.id ? "creator" : ""
				} ${stateFocus ? "focus" : ""}`}
				onClick={determMsg}
			>
				<div
					className={message.fromUserId === user.id ? "owner" : "other-person"}
				>
					{message.parentId ? (
						<>
							<div className="repeat">
								{message.fromUserId !== user.id || message.parentId ? (
									<h6 className="m-0">
										{message.parentId.User.firstName}{" "}
										{message.parentId.User.lastName}
									</h6>
								) : null}{" "}
								{message.type === "text" ? (
									<p className="m-0">{message.parentId.message}</p>
								) : (
									<img src={message.message} alt="User upload" />
								)}
							</div>
							<div>
								<p className="m-0">{message.message}</p>
							</div>
						</>
					) : (
						<div>
							{message.fromUserId !== user.id ? (
								<h6 className="m-0">
									{message.User.firstName} {message.User.lastName}
								</h6>
							) : null}{" "}
							{message.type === "text" ? (
								<p className="m-0">{message.message}</p>
							) : (
								<img src={message.message} alt="User upload" />
							)}
						</div>
					)}
				</div>
			</div>
		</>
	)
}


export default Message