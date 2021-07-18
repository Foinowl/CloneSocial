import React from 'react'
import ChatHeader from '../ChatHeader/ChatHeader'
import MessageBox from "../MessageBox/MessageBox"
import MessageInput from "../MessageInput/MessageInput"


import './Messenger.scss'


const Messenger = () => {
  return (
    <div className="messenger shadow-light">
      

			<div className="messenger__wrap">
        <ChatHeader  />
        
				<hr />
				<MessageBox  />
				<MessageInput  />
      </div>
      

			{/* <p>No active chat</p> */}
		</div>
	)
}

export default Messenger