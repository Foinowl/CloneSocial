import React from "react"


import "./Message.scss"

const Message = ({
	user,
	chat,
	index,
	key,
	message,
	currentActiveMsg,
	setCurrentActiveMsg,
	parentId,
	handlerClick,
	handlerRepeatClick,
}) => {

	const determineMargin = () => {
		if (index + 1 === chat.Messages.length) return

		return message.fromUserId === chat.Messages[index + 1].fromUserId
			? "mb-5"
			: "mb-10"
	}


	const determMsg = (e) => {
		e.stopPropagation()
		setCurrentActiveMsg(null)
		handlerClick(index)
	}


	return (
		<>
			<div
				className={`message ${determineMargin()} ${
					message.fromUserId === user.id ? "creator" : ""
				}`}
				key={key}
				tabIndex={index}
				onClick={determMsg}
			>
				<div
					className={`${currentActiveMsg === message.id ? "focus" : ""}`}
				></div>
				<div
					className={message.fromUserId === user.id ? "owner" : "other-person"}
				>
					{message?.parentId ? (
						<>
							<div
								className="repeat"
								onClick={(e) => handlerRepeatClick(e, parentId, message.id)}
							>
								{message.fromUserId !== user.id || message?.parentId ? (
									<h6 className="m-0">
										{message?.children.User.firstName}
										{message?.children.User.lastName}
									</h6>
								) : null}{" "}
								{message.type === "text" ? (
									<p className="m-0">{message?.children.message}</p>
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