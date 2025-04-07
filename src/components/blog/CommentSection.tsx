
import { useState } from 'react';
import { Comment } from '@/types/blogTypes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, ThumbsUp, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommentSectionProps {
  comments: Comment[];
  postId: number;
}

const CommentSection = ({ comments, postId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyToId, setReplyToId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});
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

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <MessageSquare className="mr-2 h-5 w-5 text-digicyan" />
        Diskusi ({comments?.length || 0})
      </h2>
      
      {/* New comment form */}
      <div className="mb-8 bg-dark-300 p-4 rounded-lg">
        <h3 className="text-white mb-3 text-lg">Tinggalkan Komentar</h3>
        <Textarea 
          placeholder="Tulis komentar Anda di sini..." 
          className="bg-dark-200 text-white border-dark-100 mb-3 min-h-[100px]"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end">
          <Button 
            className="bg-digicyan hover:bg-digicyan-600"
            onClick={handleSubmitComment}
          >
            Kirim Komentar
          </Button>
        </div>
      </div>
      
      {/* Comments list */}
      {comments && comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-dark-300 rounded-lg p-4">
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-3">
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
                      className="flex items-center text-gray-400 hover:text-digicyan text-sm"
                      aria-label="Like comment"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>{comment.likes}</span>
                    </button>
                    <button 
                      className="flex items-center text-gray-400 hover:text-digicyan text-sm"
                      onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                      aria-label="Reply to comment"
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      <span>Balas</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Reply form */}
              {replyToId === comment.id && (
                <div className="mt-4 ml-12 bg-dark-200 p-3 rounded-lg">
                  <Textarea 
                    placeholder="Tulis balasan Anda..." 
                    className="bg-dark-100 text-white border-dark-300 mb-3 min-h-[80px]"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      className="border-dark-100 text-gray-300 hover:bg-dark-100"
                      onClick={() => setReplyToId(null)}
                    >
                      Batal
                    </Button>
                    <Button 
                      className="bg-digicyan hover:bg-digicyan-600"
                      onClick={() => handleSubmitReply(comment.id)}
                    >
                      Balas
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-12">
                  <button 
                    className="flex items-center text-digicyan mb-2 text-sm"
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
                  
                  {showReplies[comment.id] && (
                    <div className="space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="bg-dark-200 rounded-lg p-3">
                          <div className="flex items-start">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src={reply.userAvatar} alt={reply.userName} />
                              <AvatarFallback className="bg-digicyan text-white">
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
                                  className="flex items-center text-gray-400 hover:text-digicyan text-xs"
                                  aria-label="Like reply"
                                >
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  <span>{reply.likes}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-dark-300 rounded-lg">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-300">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
