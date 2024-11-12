import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import '../assets/styles/ChatPage.css';

function ChatPage() {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState({}); // Store user names

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "chats"));
                const chatList = [];
                
                // Loop through each chat
                for (const docSnap of querySnapshot.docs) {
                    const chatData = docSnap.data();
                    const userIds = chatData.users;
                    
                    // Ambil nama pengguna berdasarkan userId
                    const userNames = await Promise.all(userIds.map(async (userId) => {
                        const userDoc = await getDoc(doc(db, "users", userId));
                        return userDoc.exists() ? userDoc.data().name : userId;
                    }));

                    chatList.push({ id: docSnap.id, ...chatData, userNames });
                }

                setChats(chatList);
            } catch (err) {
                console.error("Error loading chats:", err);
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
            <h2><span>Daftar</span> Percakapan</h2>
            <div className="chat-list">
                {chats.map(chat => (
                    <Link to={`/chat/${chat.id}`} key={chat.id} className="chat-item">
                        <div className="chat-info">
                            <span>{chat.userNames.join(' & ')}</span> {/* Tampilkan nama pengguna */}
                            <p>{chat.lastMessage}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ChatPage;
