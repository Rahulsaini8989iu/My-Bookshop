import React, { useState } from 'react';
import { MessageCircle, Search, Filter, MoreVertical, Phone, Video, Mail, Clock, CheckCheck, Star } from 'lucide-react';

const MessageHistory = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      seller: {
        name: 'BookStore Pro',
        avatar: '/api/placeholder/40/40',
        online: true,
        rating: 4.8
      },
      lastMessage: 'Your order has been shipped! Tracking number: TRK123456789',
      timestamp: '10:30 AM',
      unread: 2,
      messages: [
        { id: 1, sender: 'seller', text: 'Hello! Thank you for your interest in our books.', time: '2024-01-15 09:00 AM' },
        { id: 2, sender: 'user', text: 'Hi, I\'m interested in "The Great Gatsby". Is it available?', time: '2024-01-15 09:05 AM' },
        { id: 3, sender: 'seller', text: 'Yes, it\'s available and in stock. Would you like to proceed with the order?', time: '2024-01-15 09:10 AM' },
        { id: 4, sender: 'user', text: 'Great! Please confirm the price and shipping details.', time: '2024-01-15 09:15 AM' },
        { id: 5, sender: 'seller', text: 'Your order has been shipped! Tracking number: TRK123456789', time: '2024-01-15 10:30 AM' }
      ]
    },
    {
      id: 2,
      seller: {
        name: 'Classic Books Store',
        avatar: '/api/placeholder/40/40',
        online: false,
        rating: 4.6
      },
      lastMessage: 'We have similar books in the classic category. Would you like recommendations?',
      timestamp: 'Yesterday',
      unread: 0,
      messages: [
        { id: 1, sender: 'seller', text: 'Welcome to Classic Books Store!', time: '2024-01-14 02:00 PM' },
        { id: 2, sender: 'user', text: 'I\'m looking for classic literature books.', time: '2024-01-14 02:05 PM' },
        { id: 3, sender: 'seller', text: 'We have similar books in the classic category. Would you like recommendations?', time: '2024-01-14 02:30 PM' }
      ]
    },
    {
      id: 3,
      seller: {
        name: 'Fantasy World',
        avatar: '/api/placeholder/40/40',
        online: true,
        rating: 4.9
      },
      lastMessage: 'The Hobbit is currently on sale! 20% discount this week.',
      timestamp: 'Jan 12',
      unread: 1,
      messages: [
        { id: 1, sender: 'seller', text: 'Hello! Check out our fantasy collection.', time: '2024-01-12 11:00 AM' },
        { id: 2, sender: 'seller', text: 'The Hobbit is currently on sale! 20% discount this week.', time: '2024-01-12 11:30 AM' }
      ]
    },
    {
      id: 4,
      seller: {
        name: 'Tech Books Hub',
        avatar: '/api/placeholder/40/40',
        online: false,
        rating: 4.7
      },
      lastMessage: 'The programming book you asked about is back in stock.',
      timestamp: 'Jan 10',
      unread: 0,
      messages: [
        { id: 1, sender: 'user', text: 'Do you have "Clean Code" by Robert Martin?', time: '2024-01-10 03:00 PM' },
        { id: 2, sender: 'seller', text: 'Currently out of stock, but we\'ll get it soon.', time: '2024-01-10 03:15 PM' },
        { id: 3, sender: 'seller', text: 'The programming book you asked about is back in stock.', time: '2024-01-10 05:00 PM' }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedChat.id) {
        const newMsg = {
          id: conv.messages.length + 1,
          sender: 'user',
          text: newMessage,
          time: new Date().toLocaleString()
        };
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMessage,
          timestamp: 'Just now'
        };
      }
      return conv;
    });

    setNewMessage('');
    // In real app, you would update state with updatedConversations
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
              <p className="text-gray-600 mt-1">Chat with sellers and get support</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MessageCircle size={16} className="text-green-500" />
            <span>{conversations.length} conversations</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex">
        {/* Conversations List */}
        <div className={`w-full md:w-96 border-r border-gray-200 ${selectedChat ? 'hidden md:block' : 'block'}`}>
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="overflow-y-auto h-[calc(100vh-350px)]">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedChat?.id === conversation.id ? 'bg-purple-50 border-purple-200' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Seller Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {conversation.seller.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {conversation.seller.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm truncate">
                        {conversation.seller.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreVertical size={14} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 truncate mb-1">
                      {conversation.lastMessage}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span>{conversation.seller.rating}</span>
                      </div>
                      {conversation.unread > 0 && (
                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 ${selectedChat ? 'block' : 'hidden md:block'}`}>
          {selectedChat ? (
            <div className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {selectedChat.seller.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {selectedChat.seller.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedChat.seller.name}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedChat.seller.online ? 'Online' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Mail size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center gap-1 mt-1 text-xs ${
                        message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        <Clock size={10} />
                        <span>{message.time.split(' ')[1]}</span>
                        {message.sender === 'user' && (
                          <CheckCheck size={10} className="text-green-300" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
                  >
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
                <p>Select a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageHistory;