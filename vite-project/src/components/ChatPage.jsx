import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import '../assets/styles/ChatPage.css';

function ChatPage() {
    const [chats, setChats] = useState([]);
    
    useEffect(() => {
        const fetchChats = async () => {
            const querySnapshot = await getDocs(collection(db, "chats"));
            const chatList = [];
            querySnapshot.forEach((doc) => {
                chatList.push({ id: doc.id, ...doc.data() });
            });
            setChats(chatList);
        };

        fetchChats();
    }, []);

    return (
        <div className="chat-page">
            <h2>Daftar Percakapan</h2>
            <div className="chat-list">
                {chats.map(chat => (
                    <Link to={`/Chat/${chat.id}`} key={chat.id} className="chat-item">
                        <div className="chat-info">
                            <span>{chat.users.join(' & ')}</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ChatPage;
