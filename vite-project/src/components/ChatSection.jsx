import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import '../assets/styles/ChatSection.css'

function ChatSection() {
    const { chatId } = useParams();
    const [chat, setChat] = useState(null);
    const [userNames, setUserNames] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchChat = async () => {
            if (!chatId) {
                setError("Chat ID tidak valid");
                return;
            }

            try {
                const docRef = doc(db, "chats", chatId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const chatData = docSnap.data();
                    setChat(chatData);

                    const userNamesData = {};
                    for (let userId of chatData.users) {
                        const userRef = doc(db, "users", userId);
                        const userSnap = await getDoc(userRef);
                        if (userSnap.exists()) {
                            userNamesData[userId] = userSnap.data().name;
                        }
                    }
                    setUserNames(userNamesData);
                } else {
                    setError("Chat tidak ditemukan");
                }
            } catch (err) {
                setError("Gagal memuat chat");
            }
        };

        fetchChat();
    }, [chatId]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            try {
                const docRef = doc(db, "chats", chatId);
                await updateDoc(docRef, {
                    messages: arrayUnion({ text: message, timestamp: new Date() })
                });
                setMessage('');
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            } catch (err) {
                setError("Failed to send message");
            }
        }
    };

    if (error) return <div>{error}</div>;
    if (!chat) return <div>Loading chat...</div>;

    return (
        <div className="chat-section">
            <h2>Percakapan antara {chat.users.map(userId => userNames[userId]).join(' & ')}</h2>
            <div className="messages">
                {chat.messages?.map((msg, index) => (
                    <div key={index} className="message">
                        <p>{msg.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Kirim pesan..."
                />
                <button onClick={handleSendMessage}>Kirim</button>
            </div>
        </div>
    );
}

export default ChatSection;
