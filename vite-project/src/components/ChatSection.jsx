import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext'; 
import { db } from '../firebaseConfig'; 
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import '../assets/styles/ChatSection.css';

const ChatSection = () => {
    const { currentUser } = useAuth(); 
    const [messageContent, setMessageContent] = useState(''); 
    const [messages, setMessages] = useState([]); 

    const sendMessage = async () => {
        if (messageContent.trim() === '') return;

        const messageData = {
            senderId: currentUser.uid,
            content: messageContent,
            timestamp: serverTimestamp(),
            isRead: false
        };

        try {
            await addDoc(collection(db, 'chats', 'user1_user2', 'messages'), messageData);

            await updateLastMessage(messageContent);

            setMessageContent('');
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    const updateLastMessage = async (messageContent) => {
        const chatRef = doc(db, 'chats', 'user1_user2');
        await updateDoc(chatRef, {
            lastMessage: messageContent,
            lastMessageTimestamp: serverTimestamp(),
        });
    };

    useEffect(() => {
        const q = query(collection(db, 'chats', 'user1_user2', 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(messages);
        });

        return () => unsubscribe(); 
    }, []);

    return (
        <div className="chatSection-container">
            <h2>Chat dengan Penjual</h2>

            <div className="chatSection-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chatMessage ${msg.senderId === currentUser.uid ? 'sent' : 'received'}`}>
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>

            <div className="chatSection-input">
                <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Ketik pesan..."
                />
                <button onClick={sendMessage}>Kirim</button>
            </div>
        </div>
    );
};

export default ChatSection;
