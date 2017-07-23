import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import { addMessage, fetchMessages } from '../actions/messages';

const mapStateToProps = ({ messages, socket, currentChannel, profiles}) => { 
  return {
    messages: messages.filter(message => message.channel_id === currentChannel.id),
    socket,
    currentChannel,
    profiles
  };
};

const mapDispatchToProps = dispatch => ({
  addMessage: message => {
    dispatch(addMessage(message));
  },
  fetchMessages: (roomId, channelId) => {
    dispatch(fetchMessages(roomId, channelId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
