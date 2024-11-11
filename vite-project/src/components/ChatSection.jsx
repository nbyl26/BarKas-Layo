import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

function ChatSection() {
    const { chatId } = useParams();
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null); // Reference for scrolling to the bottom

    useEffect(() => {
        console.log("Received chatId:", chatId); // Menambahkan log untuk memverifikasi chatId

        const fetchChat = async () => {
            if (!chatId) {
                console.error("Invalid chatId:", chatId); // Log error jika chatId tidak valid
                setError("Chat ID tidak valid");
                return;
            }

            try {
                const docRef = doc(db, "chats", chatId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setChat(docSnap.data());
                } else {
                    setError("Chat tidak ditemukan");
                }
            } catch (err) {
                console.error("Error fetching chat:", err);
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
                // Scroll to the bottom after sending a message
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
            <h2>Percakapan dengan {chat.users.join(' & ')}</h2>
            <div className="messages">
                {chat.messages?.map((msg, index) => (
                    <div key={index} className="message">
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
