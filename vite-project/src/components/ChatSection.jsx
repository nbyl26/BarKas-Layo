import React, { useState, useEffect } from 'react';
import { useAuth } from '..'; // Untuk mengambil user yang sedang login
import { db, auth } from './firebaseConfig';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

const ChatSection = () => {
    const { currentUser } = useAuth();
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState([]);

    // Fungsi untuk mengirim pesan
    const sendMessage = async () => {
        if (messageContent.trim() === '') return;

        const messageData = {
            senderId: currentUser.uid, // ID user yang sedang login
            content: messageContent,
            timestamp: serverTimestamp(),
            isRead: false
        };

        try {
            // Menambahkan pesan ke subcollection 'messages'
            await addDoc(collection(db, 'chats', 'user1_user2', 'messages'), messageData);

            // Mengupdate lastMessage dan lastMessageTimestamp di document 'user1_user2'
            await updateLastMessage(messageContent);

            // Reset input setelah pesan terkirim
            setMessageContent('');
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    // Fungsi untuk memperbarui informasi pesan terakhir
    const updateLastMessage = async (messageContent) => {
        const chatRef = doc(db, 'chats', 'user1_user2');
        await updateDoc(chatRef, {
            lastMessage: messageContent,
            lastMessageTimestamp: serverTimestamp(),
        });
    };

    // Mendengarkan perubahan pesan secara real-time
    useEffect(() => {
        const q = query(collection(db, 'chats', 'user1_user2', 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(messages);
        });

        return () => unsubscribe(); // Cleanup listener ketika komponen di-unmount
    }, []);

    return (
        <div className="chatSection-container">
            <h2>Chat dengan Penjual</h2>

            {/* Tampilkan riwayat pesan */}
            <div className="chatSection-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chatMessage ${msg.senderId === currentUser.uid ? 'sent' : 'received'}`}>
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>

            {/* Form pengiriman pesan */}
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
