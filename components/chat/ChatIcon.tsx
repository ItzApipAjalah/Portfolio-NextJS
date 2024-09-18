import React from 'react';
import { FaComments } from 'react-icons/fa';

interface ChatIconProps {
  onClick: () => void;
}

const ChatIcon: React.FC<ChatIconProps> = ({ onClick }) => {
  return (
    <div
      className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-colors"
      onClick={onClick}
    >
      <FaComments size={24} />
    </div>
  );
};

export default ChatIcon;