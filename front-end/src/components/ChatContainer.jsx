import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa6';
import ChatLists from './ChatLists';
import InputText from './InputText';
import UserLogin from './UserLogin';
import socketIOClient from 'socket.io-client'

const ChatContainer = () => {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const socketio = socketIOClient('http://localhost:3002')
const [chats, setChats] = useState([])

    useEffect(()=>{
        socketio.on('chat', (chats)=>{
            setChats(chats)

        });
    });

    const sendTOSocket=(chat)=>{
        socketio.emit('chat',chat)
    }

    const addMessage = (chat)=>{
        const newChat={
            ...chat,
            user: localStorage.getItem('user'),
            avatar: localStorage.getItem("avatar"),

        };
        setChats([...chats, newChat])
        sendTOSocket([...chats, newChat])

    };





    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem('avatar');
        setUser(null);
    };

    return (
        <div>
            {user ? (
                <div>
                    <div className='chats_header'>
                        <h4>Username: {user}</h4>
                        <p><FaGithub className='chats_icon'/>Code with Vinayak</p>
                        <p className='chats_logout' onClick={handleLogout}>
                            <strong>Logout</strong>
                        </p>
                    </div>
                    <ChatLists chats={chats}/>
                    <InputText addMessage={addMessage}/>
                </div>
            ) : (
                <UserLogin setUser={setUser} />
            )}
        </div>
    );
};

export default ChatContainer;
