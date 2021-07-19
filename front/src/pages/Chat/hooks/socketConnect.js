import { useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import { fetchChats, onlineFriends, onlineFriend, offlineFriend, setSocket, receivedMessage, senderTyping, createChat, addUserToGroup, leaveCurrentChat, deleteCurrentChat } from '../../../store/actions/chat'

function useSocket(user, dispatch) {

    useEffect(() => {

        dispatch(fetchChats())
            .then(res => {

                const socket = socketIOClient.connect('http://127.0.0.1:3005')

                
                dispatch(setSocket(socket))

                socket.emit('join', user)

               

                console.log(res)
            })
            .catch(err => console.log(err))
    }, [dispatch])

}

export default useSocket