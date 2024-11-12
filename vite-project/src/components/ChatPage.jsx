import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import '../assets/styles/ChatPage.css';

function ChatPage() {
    const [chats, setChats] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "chats"));
                const chatList = [];
                const userNamesData = {};

                for (const docSnap of querySnapshot.docs) {
                    const chatData = { id: docSnap.id, ...docSnap.data() };
                    chatList.push(chatData);

                    for (const userId of chatData.users) {
                        if (!userNamesData[userId]) {
                            const userDoc = await getDoc(doc(db, "users", userId));
                            if (userDoc.exists()) {
                                userNamesData[userId] = userDoc.data().name;
                            }
                        }
                    }
                }
                setChats(chatList);
                setUserNames(userNamesData);
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
            <h2><span>Daftar</span> Percakapan</h2>
            <div className="chat-list">
                {chats.map(chat => (
                    <Link to={`/chat/${chat.id}`} key={chat.id} className="chat-item">
                        <div className="chat-info">
                            <span>{chat.users.map(userId => userNames[userId]).join(' & ')}</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ChatPage;
