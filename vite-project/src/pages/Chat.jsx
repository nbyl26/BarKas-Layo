import React from 'react'
import Header2 from '../components/Header2'
import ChatSection from '../components/chatSection'
import Footer from '../components/Footer'
import '../assets/styles/Chat.css'

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
