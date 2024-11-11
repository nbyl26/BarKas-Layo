import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Firebase setup
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

function ChatSection() {
    const { chatId } = useParams(); // Mengambil chatId dari URL
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Mengambil data chat berdasarkan chatId
        const fetchChat = async () => {
            const docRef = doc(db, "chats", chatId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setChat(docSnap.data());
            }
        };

        fetchChat();
    }, [chatId]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            const docRef = doc(db, "chats", chatId);
            await updateDoc(docRef, {
                messages: arrayUnion({ text: message, timestamp: new Date() })
            });
            setMessage(''); // Reset input message
        }
    };

    if (!chat) return <div>Loading...</div>;

    return (
        <div className="chat-section">
            <h2>Percakapan dengan {chat.users.join(' & ')}</h2>
            <div className="messages">
                {chat.messages?.map((msg, index) => (
                    <div key={index} className="message">
                        <p>{msg.text}</p>
                    </div>
                ))}
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
