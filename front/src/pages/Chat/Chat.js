import React from "react"

import Messenger from "./components/Messenger/Messenger"
import FriendList from "./components/FriendList/FriendList"


import "./Chat.scss"


export const Chat = () => {

	return (
		<div id="chat-container">
			<div id="chat-wrap">

				<FriendList />
				
				<Messenger />

			</div>
		</div>
	)
}
