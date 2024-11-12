import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import '../assets/styles/ChatSection.css';

function ChatSection() {
    const { chatId } = useParams();
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null); // Reference for scrolling to the bottom
    const [usersNames, setUsersNames] = useState([]); // Store user names for chat

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
                    const userIds = chatData.users;
                    
                    // Ambil nama pengguna berdasarkan userId
                    const userNames = await Promise.all(userIds.map(async (userId) => {
                        const userDoc = await getDoc(doc(db, "users", userId));
                        return userDoc.exists() ? userDoc.data().name : userId;
                    }));

                    setUsersNames(userNames); // Set user names
                    setChat(chatData);
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
                    messages: arrayUnion({ 
                        userId: "current_user_id", // Gantilah dengan ID pengguna yang sedang login
                        text: message, 
                        timestamp: new Date() 
                    })
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
            <h2>Percakapan dengan {usersNames.join(' & ')}</h2> {/* Tampilkan nama pengguna */}
            <div className="messages">
                {chat.messages?.map((msg, index) => (
                    <div key={index} className={`message ${msg.userId === "current_user_id" ? 'sent' : 'received'}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* Scroll target */}
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
