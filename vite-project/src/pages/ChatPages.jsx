import React from 'react';
import Header2 from '../components/header/Header2';
import ChatPage from '../components/chat/ChatPage';
import Footer from '../components/footer/Footer';
import '../assets/styles/Chat/ChatPages.css'; 

function ChatPages() {
  return (
    <div className="chat-pages-container">
      <Header2 />
      <div className="main-content">
        <ChatPage />
      </div>
      <Footer />
    </div>
  );
}

export default ChatPages;
