import React, { useState } from 'react';
import { FaTimes, FaPaperPlane, FaGift } from 'react-icons/fa';
import axios from 'axios';

interface ChatAlertProps {
  onClose: () => void;
  onSendCode: () => void;
  email: string;
  setEmail: (email: string) => void;
  onMessageSent: () => void;
}

const ChatAlert: React.FC<ChatAlertProps> = ({ onClose, onSendCode, email, setEmail, onMessageSent }) => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [showGifSearch, setShowGifSearch] = useState(false);
  const [gifSearchTerm, setGifSearchTerm] = useState('');
  const [gifResults, setGifResults] = useState<string[]>([]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.slice(0, 10));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value.slice(0, 200));
  };

  const handleSendCode = async () => {
    if (!email) {
      alert('Please enter an email address.');
      return;
    }

    try {
      const response = await axios.post('/api/email-code', { email });
      if (response.data.success) {
        alert('Verification code sent to your email.');
      } else {
        alert('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      alert('Failed to send verification code. Please try again.');
    }
  };

  const handleGifSearch = async () => {
    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: 'm49Q41Hc8hlcIdj9X2yJMxMOSMruOf8v',
          q: gifSearchTerm,
          limit: 9
        }
      });
      if (response.data.data.length > 0) {
        setGifResults(response.data.data.map((gif: any) => gif.images.fixed_height.url));
      } else {
        alert('No GIFs found. Try a different search term.');
      }
    } catch (error) {
      console.error('Error searching for GIF:', error);
      alert('Failed to search for GIFs. Please try again.');
    }
  };

  const handleGifSelect = (selectedGifUrl: string) => {
    setGifUrl(selectedGifUrl);
    setShowGifSearch(false);
    setGifResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message && !gifUrl) {
      alert('Please enter a message or select a GIF.');
      return;
    }
    try {
      const messageBody = gifUrl ? `[GIF] ${gifUrl}` : message;
      const response = await axios.post('/api/chat', { email, username, code, message: messageBody, isGif: !!gifUrl });
      if (response.data.success) {
        onMessageSent();
        onClose();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">New Message</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow text-gray-500 p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={handleSendCode}
                className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 transition-colors duration-200"
              >
                Send Code
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username (max 10 characters):</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-2 border text-gray-500 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
              maxLength={10}
            />
            <span className="text-xs text-gray-500">{username.length}/10</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border text-gray-500 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message (max 200 characters) or GIF (can only choose one):</label>
            {!gifUrl && (
              <>
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  className="w-full p-2 border text-gray-500 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  maxLength={200}
                ></textarea>
                <span className="text-xs text-gray-500">{message.length}/200</span>
              </>
            )}
          </div>
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setShowGifSearch(!showGifSearch)}
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200 flex items-center"
            >
              <FaGift className="mr-1" /> {gifUrl ? 'Change GIF' : 'Add GIF'}
            </button>
            {showGifSearch && (
              <div className="mt-2">
                <input
                  type="text"
                  value={gifSearchTerm}
                  onChange={(e) => setGifSearchTerm(e.target.value)}
                  placeholder="Search for a GIF"
                  className="w-full p-2 border text-gray-500 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleGifSearch}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  Search GIF
                </button>
                {gifResults.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {gifResults.map((gifUrl, index) => (
                      <img
                        key={index}
                        src={gifUrl}
                        alt={`GIF result ${index + 1}`}
                        className="w-full h-auto cursor-pointer rounded"
                        onClick={() => handleGifSelect(gifUrl)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            {gifUrl && (
              <div className="mt-2">
                <img src={gifUrl} alt="Selected GIF" className="max-w-full h-auto rounded-md" />
                <button
                  type="button"
                  onClick={() => setGifUrl('')}
                  className="mt-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  Remove GIF
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Send</span>
              <FaPaperPlane className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatAlert;