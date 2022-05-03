// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ChatSelect } from '../../components/Chat/ChatSelect';
import { InboxPeople } from '../../components/Chat/InboxPeople';
import { Messages } from '../../components/Chat/Messages';
// import { ChatContext } from '../context/chat/ChatContext';
import '../../css/chat.css';

export const ChatPage = () => {
	const { user } = useSelector((state) => state.userReducer);
	const { activeChat } = useSelector((state) => state.chatReducer);
	return (
		<div className='messaging'>
			{/* {user?.chats.length ? ( */}
			<div className='inbox_msg'>
				<InboxPeople />
				{activeChat ? <Messages /> : <ChatSelect />}
			</div>
			{/* ) : (
				<p>No tenes chats</p>
			)} */}
		</div>
	);
};
