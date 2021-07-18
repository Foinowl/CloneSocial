import React, { useState } from "react"

import Button from '../../../../components/Button'
import Friend from "../Friend/Friend"

import './FriendList.scss'


const FriendList = () => {
  const [showFriendsModal, setShowFriendsModal] = useState(false)

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
				<Friend/>
				<p className="no-chat">No friends added</p>
			</div>
		</div>
	)
}

export default FriendList