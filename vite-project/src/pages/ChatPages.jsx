import React from 'react';
import Header2 from '../components/Header2';
import ChatPage from '../components/ChatPage';
import Footer from '../components/Footer';
import '../assets/styles/ChatPages.css'; // Pastikan Anda menambahkan file CSS

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
