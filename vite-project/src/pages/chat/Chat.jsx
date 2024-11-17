import React from 'react'
import Header2 from '../../components/header/Header2'
import ChatSection from '../../components/chat/ChatSection'
import Footer from '../../components/footer/Footer'
import '../../assets/styles/Chat/Chat.css'

function Chat() {
  return (
    <div className="chat-pages-container">
      <div className="main-content">
        <Header2 />
        <ChatSection />
      </div>
      <Footer />
    </div>
  )
}

export default Chat
