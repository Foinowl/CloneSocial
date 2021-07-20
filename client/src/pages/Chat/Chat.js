import React from "react"
import { useSelector, useDispatch } from "react-redux"
import useSocket from "./hooks/socketConnect"

import Messenger from "./components/Messenger/Messenger"
import FriendList from "./components/FriendList/FriendList"
import Navbar from "./components/Navbar/Navbar"


import "./Chat.scss"


export const Chat = () => {

	
    const dispatch = useDispatch()
		const user = useSelector((state) => state.auth.user)

		useSocket(user, dispatch)

	return (
		<div id="chat-container">
			<Navbar />
			<div id="chat-wrap">

				<FriendList />
				
				<Messenger />

			</div>
		</div>
	)
}
