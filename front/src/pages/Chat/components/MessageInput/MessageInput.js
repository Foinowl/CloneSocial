import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "emoji-mart/css/emoji-mart.css"

import "./MessageInput.scss"

const MessageInput = () => {
  return (

    
		<div id="input-container">
			<div id="image-upload-container">
				<div>
					 
						<div id="message-notification">
							<FontAwesomeIcon icon="bell" className="fa-icon" />
							<p className="m-0">new message</p>
						</div>
				</div>

				<div id="image-upload">
						{/* <div id="image-details">
							<p className="m-0">name</p>
							<FontAwesomeIcon
								icon="upload"
								className="fa-icon"
							/>
							<FontAwesomeIcon
								icon="times"
								className="fa-icon"
							/>
						</div> */}

					<FontAwesomeIcon
						icon={["far", "image"]}
						className="fa-icon"
					/>
				</div>
			</div>
			<div id="message-input">
				<input
					type="text"
					placeholder="Message..."

				/>
				<FontAwesomeIcon
					icon={["far", "smile"]}
					className="fa-icon"
				/>
			</div>

			<input
				id="chat-image"
				type="file"
			/>
		</div>
	)
}

export default MessageInput