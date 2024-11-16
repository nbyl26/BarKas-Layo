import React, { useState, useRef } from 'react';
import { MessageCircle } from 'react-feather';
import '../../assets/styles/ChatBot/ChatBot.css';

function ChatBot() {
  const [isChatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  const toggleChat = () => {
    setChatVisible((prev) => !prev);
  };

  const sendMessage = () => {
    const userMessage = inputRef.current.value.trim();

    if (userMessage) {
      setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: 'user' }]);
      inputRef.current.value = ''; 

      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      }, 1000);
    }
  };

  const sendTemplateMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);

    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const getBotResponse = (userMessage) => {
    const responses = {
      "apa itu barkas layo?": "Barkas Layo adalah platform jual beli barang bekas.",
      "bagaimana cara berbelanja?": "Anda bisa mencari produk di halaman utama dan menambahkannya ke keranjang.",
      "Kenapa Harus Barkas Layo?": "Karena Barkas Layo adalah platform jual beli barang bekas yang terpercaya.",  
      "Mengapa Harga Barang Bekas Lebih Murah?": "Karena barang bekas sudah pernah dipakai, sehingga harganya lebih murah.",
      "terima kasih": "Sama-sama! Jika ada pertanyaan lain, silakan tanya."  
    };
    return responses[userMessage.toLowerCase()] || "Maaf, saya tidak mengerti.";
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      {/* Chatbot Button */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <button onClick={toggleChat} style={{ backgroundColor: '#76c7c0', border: 'none', borderRadius: '50%', padding: '15px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}>
        <MessageCircle style={{ color: 'white' }} />;
        </button>
      </div>

      {/* Chatbot Container */}
      {isChatVisible && (
        <div style={{ position: 'fixed', bottom: '70px', right: '20px', width: '300px', maxWidth: '90%', border: '1px solid #76c7c0', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}>
          <div style={{ backgroundColor: '#76c7c0', color: 'white', padding: '10px', borderRadius: '8px 8px 0 0' }}>
            <h3 style={{ margin: 0 }}>Chatbot</h3>
            <button onClick={toggleChat} style={{ float: 'right', background: 'none', border: 'none', color: 'white', fontSize: '16px' }}>&times;</button>
          </div>
          <div style={{ height: '200px', overflowY: 'auto', padding: '10px' }}>
            {messages.map((message, index) => (
              <p key={index} style={{ color: message.sender === 'user' ? '#76c7c0' : 'black' }}>{message.text}</p>
            ))}
            <div id="template-questions">
              <p style={{ cursor: 'pointer', color: '#76c7c0' }} onClick={() => sendTemplateMessage('apa itu barkas layo?')}>Apa itu Barkas Layo?</p>
              <p style={{ cursor: 'pointer', color: '#76c7c0' }} onClick={() => sendTemplateMessage('bagaimana cara berbelanja?')}>Bagaimana cara berbelanja?</p>
              <p style={{ cursor: 'pointer', color: '#76c7c0' }} onClick={() => sendTemplateMessage('Kenapa Harus Barkas Layo?')}>Kenapa Harus Barkas Layo?</p>
              <p style={{ cursor: 'pointer', color: '#76c7c0' }} onClick={() => sendTemplateMessage('Mengapa Harga Barang Bekas Lebih Murah?')}>Mengapa Harga Barang Bekas Lebih Murah?</p>
              <p style={{ cursor: 'pointer', color: '#76c7c0' }} onClick={() => sendTemplateMessage('terima kasih')}>Terima kasih</p>
            </div>
          </div>
          <input
            type="text"
            ref={inputRef}
            placeholder="Tanya kami..."
            onKeyPress={handleKeyPress}
            style={{ width: 'calc(100% - 40px)', padding: '10px', border: 'none', borderTop: '1px solid #ddd', borderRadius: '0 0 8px 8px' }}
            className="chat-bot-input"
          />
          <button onClick={sendMessage} style={{ backgroundColor: '#76c7c0', border: 'none', color: 'white', padding: '10px', borderRadius: '0 0 8px 0' }}>Kirim</button>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
