import React, { useState, useEffect } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import ChatAlert from './ChatAlert';
import axios from 'axios';

interface ChatPopupProps {
  onClose: () => void;
}

interface ChatMessage {
  id: number;
  email: string;
  username: string;
  message: string;
  created_at: string;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ onClose }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    fetchMessages();

    const intervalId = setInterval(fetchMessages, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/show-chat');
      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleShowMessage = () => {
    setShowAlert(true);
  };

  const handleSendCode = async () => {
    try {
      await axios.post('/api/email-code', { email });
      alert('Verification code sent to your email');
    } catch (error) {
      console.error('Error sending code:', error);
      alert('Failed to send verification code');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderMessageContent = (message: string) => {
    const giphyRegex = /\[GIF\]\s*(https:\/\/media[0-9]\.giphy\.com\/media\/[^\s]+)/g;
    const parts = message.split(giphyRegex);

    return parts.map((part, index) => {
      if (index % 2 === 0) {
        // This is regular text
        return <span key={index}>{part}</span>;
      } else {
        // This is a Giphy URL
        return <img key={index} src={part} alt="GIF" className="max-w-full h-auto rounded my-2" />;
      }
    });
  };

  return (
    <div className="fixed bottom-5 right-5 w-96 h-[32rem] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-bold text-lg">Public Chat</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors duration-200">
          <FaTimes className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="mb-4 p-3 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-blue-600">{msg.username}</span>
                <span className="text-xs text-gray-500">{formatDate(msg.created_at)}</span>
              </div>
              <div className="text-gray-700 break-words overflow-hidden">
                {renderMessageContent(msg.message)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">
            No messages yet. Start a conversation!
          </div>
        )}
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <button
          onClick={handleShowMessage}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>New Message</span>
          <FaPaperPlane className="w-4 h-4" />
        </button>
      </div>
      {showAlert && (
        <ChatAlert
          onClose={() => setShowAlert(false)}
          onSendCode={handleSendCode}
          email={email}
          setEmail={setEmail}
          onMessageSent={fetchMessages}
        />
      )}
    </div>
  );
};

export default ChatPopup;