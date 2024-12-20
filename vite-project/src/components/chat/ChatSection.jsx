import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import '../../assets/styles/Chat/ChatSection.css';

function ChatSection() {
    const { chatId } = useParams();
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null); 
    const [usersNames, setUsersNames] = useState([]); 

    useEffect(() => {
        if (!chatId) {
            setError("Chat ID tidak valid");
            return;
        }
    
        const docRef = doc(db, "chats", chatId);
    
        const unsubscribe = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                const chatData = docSnap.data();
                const userIds = chatData?.users;
    
                if (!Array.isArray(userIds)) {
                    setError("Data pengguna tidak valid");
                    return;
                }
    
                const userNames = await Promise.all(
                    userIds.map(async (userId) => {
                        const userDoc = await getDoc(doc(db, "users", userId));
                        return userDoc.exists() ? userDoc.data().name : userId;
                    })
                );
    
                setUsersNames(userNames); 
                setChat(chatData);
            } else {
                setError("Chat tidak ditemukan");
            }
        }, (err) => {
            setError("Gagal memuat chat");
        });
    
        return () => unsubscribe();
    }, [chatId]);
    

    const handleSendMessage = async () => {
        if (message.trim()) {
            try {
                const docRef = doc(db, "chats", chatId);
                await updateDoc(docRef, {
                    messages: arrayUnion({
                        userId: "current_user_id",
                        text: message,
                        timestamp: new Date(),
                    }),
                });
                setMessage('');
                // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            } catch (err) {
                setError("Gagal mengirim pesan");
            }
        }
    };
    

    if (error) return <div>{error}</div>;
    if (!chat) return <div>Loading chat...</div>;

    return (
        <div className="chat-section">
            <h2>Percakapan dengan <span>{usersNames.join(' & ')}</span></h2>
            <div className="messages">
                {chat.messages?.map((msg, index) => (
                    <div key={index} className={`message ${msg.userId === "current_user_id" ? 'sent' : 'received'}`}>
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