import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../context/SocketContext';
// import { AuthContext } from '../auth/AuthContext';
// import { ChatContext } from '../context/chat/ChatContext';
import { IncomingMsg } from './IncomingMsg';
import { OutGoingMsg } from './OutGoingMsg';
import { SendMessage } from './SendMessage';

export const Messages = () => {
    const { socket } = useContext(SocketContext);
    const { messages, activeChat } = useSelector((state) => state.chatReducer);
    const { user } = useSelector((state) => state.userReducer);

    const onClick = (e) => {
        e.preventDefault();
        socket.emit('borrar-notificaciones', { userId: user.id, chatId: activeChat }, () => {});
    };

    return (
        <div className='mesgs'>
            <div id='messagesDiv' className='msg_history' onClick={onClick}>
                {messages?.map((msg) =>
                    // msg.to === auth.uid ? (
                    msg.de !== user.id ? <IncomingMsg key={msg.id} msg={msg} /> : <OutGoingMsg key={msg.id} msg={msg} />
                )}
            </div>

            <SendMessage />
        </div>
    );
};
