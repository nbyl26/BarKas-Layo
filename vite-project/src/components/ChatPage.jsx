import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import '../assets/styles/ChatPage.css';

function ChatPage() {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "chats"));
                const chatList = [];
                querySnapshot.forEach((doc) => {
                    chatList.push({ id: doc.id, ...doc.data() });
                });
                setChats(chatList);
            } catch (err) {
                setError("Failed to load chats");
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    if (loading) return <div>Loading chats...</div>;
    if (error) return <div>{error}</div>;

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
