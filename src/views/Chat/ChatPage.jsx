// import { useContext } from 'react';
import { ChatSelect } from '../../components/Chat/ChatSelect';
import { InboxPeople } from '../../components/Chat/InboxPeople';
import { Messages } from '../../components/Chat/Messages';
// import { ChatContext } from '../context/chat/ChatContext';
import '../../css/chat.css';

export const ChatPage = () => {
	// const { chatState } = useContext(ChatContext);
	return (
		<div className='messaging'>
			<div className='inbox_msg'>
				<InboxPeople />
				{/* {chatState.activeChat ?  */}
				<Messages />
				{/* :  */}
				<ChatSelect />
				{/* } */}
				{/* <ChatSelect /> */}
				{/* <Messages /> */}
			</div>
		</div>
	);
};
