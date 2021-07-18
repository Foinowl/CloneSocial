import React from 'react'

import "./Friend.scss"


const Friend = ({chat, click}) => {


  return (
		<div onClick={click} className={`friend-list`}>
			<div>
				<img width="40" height="40" alt="User avatar" />
				<div className="friend-info">
					<h4 className="m-0">
						{/* {chat.Users[0].firstName} {chat.Users[0].lastName} */}
						Имя фамилия
					</h4>
					<h5 className="m-0">Last message</h5>
				</div>
			</div>
			<div className="friend-status">
				<span className={`online-status offline`}></span>
			</div>
		</div>
	)
}

export default Friend