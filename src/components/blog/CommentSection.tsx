
import React, { useState } from 'react';
import { Comment } from '@/types/blogTypes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, ThumbsUp, Reply, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface CommentSectionProps {
  comments: Comment[];
  postId: number;
}

const CommentSection = ({ comments, postId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyToId, setReplyToId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});
  const [likedComments, setLikedComments] = useState<number[]>([]);
  const [likedReplies, setLikedReplies] = useState<number[]>([]);
  const { toast } = useToast();
  
  // Handle submitting a new comment
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    // In a real app, this would send the comment to the server
    toast({
      title: "Komentar terkirim!",
      description: "Komentar Anda akan ditampilkan setelah dimoderasi",
    });
    
    setNewComment('');
  };
  
  // Handle submitting a reply
  const handleSubmitReply = (commentId: number) => {
    if (!replyText.trim()) return;
    
    // In a real app, this would send the reply to the server
    toast({
      title: "Balasan terkirim!",
      description: "Balasan Anda akan ditampilkan setelah dimoderasi",
    });
    
    setReplyText('');
    setReplyToId(null);
  };
  
  // Toggle showing replies for a comment
  const toggleReplies = (commentId: number) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };
  
  // Handle liking a comment
  const handleLikeComment = (commentId: number) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter(id => id !== commentId));
    } else {
      setLikedComments([...likedComments, commentId]);
      toast({
        title: "Komentar disukai!",
        description: "Anda menyukai komentar ini",
        duration: 1500,
      });
    }
  };
  
  // Handle liking a reply
  const handleLikeReply = (replyId: number) => {
    if (likedReplies.includes(replyId)) {
      setLikedReplies(likedReplies.filter(id => id !== replyId));
    } else {
      setLikedReplies([...likedReplies, replyId]);
      toast({
        title: "Balasan disukai!",
        description: "Anda menyukai balasan ini",
        duration: 1500,
      });
    }
  };
  
  // Format date string
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Animation variants
  const commentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <MessageSquare className="mr-2 h-5 w-5 text-digicyan" />
        Diskusi ({comments?.length || 0})
      </h2>
      
      {/* New comment form with enhanced styling */}
      <motion.div 
        className="mb-8 glass-card p-5 rounded-xl border border-gray-800/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-white mb-4 text-lg font-medium">Tinggalkan Komentar</h3>
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://i.pravatar.cc/150?img=12" />
            <AvatarFallback className="bg-digicyan text-white">U</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea 
              placeholder="Tulis komentar Anda di sini..." 
              className="bg-dark-200 text-white border-dark-100 min-h-[100px] focus:border-digicyan/50 focus:ring-digicyan/30"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                className="bg-digicyan hover:bg-digicyan-600 text-black font-medium flex items-center gap-2"
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4" />
                Kirim Komentar
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Comments list with improved styling */}
      {comments && comments.length > 0 ? (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {comments.map((comment) => (
            <motion.div 
              key={comment.id} 
              className="bg-dark-300/70 backdrop-blur-sm rounded-xl p-5 border border-gray-800/50 hover:border-gray-700/70 transition-colors"
              variants={commentVariants}
            >
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-3 border-2 border-transparent">
                  <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                  <AvatarFallback className="bg-digicyan text-white">
                    {comment.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-white">{comment.userName}</h4>
                    <span className="text-xs text-gray-400">{formatDate(comment.date)}</span>
                  </div>
                  <p className="text-gray-200 mb-3">{comment.content}</p>
                  <div className="flex items-center space-x-4">
                    <button 
                      className={`flex items-center ${likedComments.includes(comment.id) ? 'text-digicyan' : 'text-gray-400 hover:text-digicyan'} text-sm transition-colors`}
                      onClick={() => handleLikeComment(comment.id)}
                      aria-label="Like comment"
                    >
                      <ThumbsUp className={`h-4 w-4 mr-1 ${likedComments.includes(comment.id) ? 'fill-digicyan' : ''}`} />
                      <span>{comment.likes + (likedComments.includes(comment.id) ? 1 : 0)}</span>
                    </button>
                    <button 
                      className="flex items-center text-gray-400 hover:text-digicyan text-sm transition-colors"
                      onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                      aria-label="Reply to comment"
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      <span>Balas</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Reply form with animation */}
              <AnimatePresence>
                {replyToId === comment.id && (
                  <motion.div 
                    className="mt-4 ml-12 bg-dark-200/80 p-4 rounded-lg border border-gray-800/50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                        <AvatarFallback className="bg-digicyan text-white">U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <Textarea 
                          placeholder="Tulis balasan Anda..." 
                          className="bg-dark-100 text-white border-dark-300 mb-2 min-h-[80px] text-sm focus:border-digicyan/50 focus:ring-digicyan/30"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-dark-100 text-gray-300 hover:bg-dark-100"
                            onClick={() => setReplyToId(null)}
                          >
                            Batal
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-digicyan hover:bg-digicyan-600 text-black font-medium"
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyText.trim()}
                          >
                            Balas
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Replies with animations */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-12">
                  <button 
                    className="flex items-center text-digicyan mb-2 text-sm hover:underline"
                    onClick={() => toggleReplies(comment.id)}
                    aria-label="Toggle replies"
                  >
                    {showReplies[comment.id] ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        <span>Sembunyikan {comment.replies.length} balasan</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        <span>Lihat {comment.replies.length} balasan</span>
                      </>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {showReplies[comment.id] && (
                      <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {comment.replies.map((reply) => (
                          <motion.div 
                            key={reply.id} 
                            className="bg-dark-200/80 rounded-lg p-4 border border-gray-800/30"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-start">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarImage src={reply.userAvatar} alt={reply.userName} />
                                <AvatarFallback className="bg-digicyan/80 text-white">
                                  {reply.userName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <h4 className="font-medium text-white text-sm">{reply.userName}</h4>
                                  <span className="text-xs text-gray-400">{formatDate(reply.date)}</span>
                                </div>
                                <p className="text-gray-200 text-sm">{reply.content}</p>
                                <div className="flex items-center mt-2">
                                  <button 
                                    className={`flex items-center ${likedReplies.includes(reply.id) ? 'text-digicyan' : 'text-gray-400 hover:text-digicyan'} text-xs transition-colors`}
                                    onClick={() => handleLikeReply(reply.id)}
                                    aria-label="Like reply"
                                  >
                                    <ThumbsUp className={`h-3 w-3 mr-1 ${likedReplies.includes(reply.id) ? 'fill-digicyan' : ''}`} />
                                    <span>{reply.likes + (likedReplies.includes(reply.id) ? 1 : 0)}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-10 bg-dark-300/70 rounded-xl border border-gray-800/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-300">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
        </motion.div>
      )}
    </div>
  );
};

export default CommentSection;
