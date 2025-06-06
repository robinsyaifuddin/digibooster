
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatBot } from '@/hooks/useChatBot';
import { ChatMessage } from '@/types/chatTypes';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, sendMessage, getQuickReplies } = useChatBot();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Hide tooltip after 5 seconds or when chat is opened
    if (isOpen) {
      setShowTooltip(false);
    } else {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    setIsTyping(true);
    await sendMessage(inputMessage);
    setInputMessage('');
    setIsTyping(false);
  };

  const handleQuickReply = async (message: string) => {
    setIsTyping(true);
    await sendMessage(message);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button with Tooltip */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="mb-3 max-w-[280px] sm:max-w-xs"
            >
              <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-3 rounded-2xl shadow-2xl border border-gray-700">
                <p className="text-sm font-medium leading-relaxed text-center">
                  Punya Pertanyaan atau mau Ngobrol? sini, Digi BOT bantu kamu sepenuhnya!
                </p>
                <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900 border-r border-b border-gray-700" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
        >
          {/* Animated background effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <X className="w-6 h-6 text-white relative z-10" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="relative z-10"
              >
                <MessageCircle className="w-6 h-6 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <motion.div 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 flex items-center justify-between"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Bot className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold">Digi BOT</h3>
                  <motion.p 
                    className="text-sm opacity-90"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Customer Service
                  </motion.p>
                </div>
              </div>
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <motion.div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring" }}
                      >
                        {message.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                      </motion.div>
                      <motion.div 
                        className={`rounded-2xl px-4 py-2 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 shadow-sm'}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring" }}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {new Date(message.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
                      <div className="flex space-x-1">
                        {[0, 0.2, 0.4].map((delay, index) => (
                          <motion.div
                            key={index}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {getQuickReplies().length > 0 && (
              <motion.div 
                className="p-3 bg-white border-t border-gray-200"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-wrap gap-2">
                  {getQuickReplies().map((reply, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 hover:from-cyan-200 hover:to-blue-200 text-cyan-700 rounded-full text-xs font-medium transition-all duration-200"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input */}
            <motion.div 
              className="p-4 bg-white border-t border-gray-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik pesan Anda..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
