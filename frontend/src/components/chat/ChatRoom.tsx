import { Navigate } from "react-router-dom"

const ChatRoom = () => {

  // 1. create one one chat with recipient user id (mongodb)
  // 2. redirect to /chat route with all recipient user ids
  // 3. get all userchats
  // 4. extract recipient user ids from user chats
  // 5. get recipient user info based on their user ids
  return (
    <Navigate to='/chat' />
  )
}

export default ChatRoom