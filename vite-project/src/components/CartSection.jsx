import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, doc, getDoc, getDocs, query, where, addDoc, orderBy, onSnapshot } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import '../assets/styles/ChatSection.css';
import { auth } from '../firebaseConfig';

function ChatSection() {
  const { chatId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userNames, setUserNames] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUserId(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchChatData = async () => {
      const chatRef = doc(db, 'chats', chatId);
      const chatSnapshot = await getDoc(chatRef);

      if (chatSnapshot.exists()) {
        const chatData = chatSnapshot.data();
        setChatMessages(chatData.messages);

        const users = chatData.users;
        const userNamesData = {};

        await Promise.all(
          users.map(async (userId) => {
            const userDoc = await getDoc(doc(db, 'users', userId));
            userNamesData[userId] = userDoc.data().name;
          })
        );

        setUserNames(userNamesData);
      }
    };

    const unsubscribeChat = onSnapshot(doc(db, 'chats', chatId), (snapshot) => {
      if (snapshot.exists()) {
        const chatData = snapshot.data();
        setChatMessages(chatData.messages);
      }
    });

    fetchChatData();
    return () => unsubscribeChat();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const chatRef = doc(db, 'chats', chatId);
    const messageData = {
      userId: currentUserId,
      text: newMessage,
      timestamp: new Date(),
    };

    await updateDoc(chatRef, {
      messages: arrayUnion(messageData),
      lastMessage: newMessage,
      lastMessageTimestamp: new Date(),
    });

    setNewMessage('');
  };

  return (
    <div className="chat-section">
      <div className="chat-messages">
        {chatMessages.map((message, index) => (
          <div key={index} className={`message ${message.userId === currentUserId ? 'sent' : 'received'}`}>
            <strong>{userNames[message.userId] || 'User'}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ketik pesan..."
        />
        <button onClick={handleSendMessage}>Kirim</button>
      </div>
    </div>
  );
}

export default ChatSection;
