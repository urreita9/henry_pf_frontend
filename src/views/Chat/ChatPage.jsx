// import { useContext } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatSelect } from '../../components/Chat/ChatSelect';
import { InboxPeople } from '../../components/Chat/InboxPeople';
import { Messages } from '../../components/Chat/Messages';
// import { ChatContext } from '../context/chat/ChatContext';
import '../../css/chat.css';
import { clearChat } from '../../redux/actions/chatActions';

export const ChatPage = () => {
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.userReducer);
	const { activeChat } = useSelector((state) => state.chatReducer);


	useEffect(()=>{
		return () => {
			dispatch(clearChat())
		}
	},[])
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
