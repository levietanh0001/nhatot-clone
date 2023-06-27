import ChatLayout from "../../layouts/ChatLayout"
import ChatPanel from "./ChatPanel"
import ContactPanel from "./ContactPanel"



const Chat = () => {
  return (
    <ChatLayout 
      ContactPanel={<ContactPanel />}
      ChatPanel={<ChatPanel />} 
    />
  )
}

export default Chat