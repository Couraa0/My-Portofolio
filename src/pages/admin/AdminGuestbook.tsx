import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  MessageSquare, Trash2, Reply, Search, RefreshCw, AlertCircle, X, Check, BadgeCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { GenzAvatar, parseNameAndAvatar } from '@/components/GenzAvatars';

interface GuestbookMessage {
  id: string;
  name: string;
  text: string;
  created_at: string;
  reactions: number;
  reply?: string;
}

export default function AdminGuestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reply Modal State
  const [replyInput, setReplyInput] = useState('');
  const [activeMessage, setActiveMessage] = useState<GuestbookMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setMessages(data || []);
    } catch (err: any) {
      console.error('Error fetching guestbook:', err);
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const { error: err } = await supabase
        .from('guestbook')
        .delete()
        .eq('id', id);

      if (err) throw err;
      
      toast.success('Message deleted successfully');
      setMessages(messages.filter(m => m.id !== id));
    } catch (err: any) {
      toast.error('Failed to delete message: ' + err.message);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMessage) return;

    try {
      setIsSubmitting(true);
      const { error: err } = await supabase
        .from('guestbook')
        .update({ reply: replyInput.trim() || null })
        .eq('id', activeMessage.id);

      if (err) throw err;

      toast.success(replyInput.trim() ? 'Reply added successfully' : 'Reply removed');
      
      // Update local state
      setMessages(messages.map(m => m.id === activeMessage.id ? { ...m, reply: replyInput.trim() || undefined } : m));
      setActiveMessage(null);
      setReplyInput('');
    } catch (err: any) {
      toast.error('Failed to add reply: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openReplyModal = (msg: GuestbookMessage) => {
    setActiveMessage(msg);
    setReplyInput(msg.reply || '');
  };

  const filteredMessages = messages.filter(m => {
    const { name: cleanName } = parseNameAndAvatar(m.name);
    return cleanName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.text.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="admin-section">
      <div className="section-header">
        <div>
          <h2 className="section-heading">
            
            Guestbook
          </h2>
          <p className="section-desc">{messages.length} pesan terdaftar</p>
        </div>
        <div className="admin-page-actions flex items-center gap-3">
          <div className="search-wrap !mb-0">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button onClick={fetchMessages} className="btn-secondary" disabled={loading}>
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {error ? (
        <div className="form-error">
          <AlertCircle size={20} />
          <p>{error}</p>
          <button className="underline ml-auto text-sm" onClick={fetchMessages}>Try Again</button>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-[15%]">Date</th>
                <th className="w-[20%]">Sender</th>
                <th className="w-[40%]">Message</th>
                <th className="w-[10%] text-center">Reactions</th>
                <th className="w-[15%] text-right">Actions</th>
              </tr>
            </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-muted-foreground">
                      <div className="flex justify-center mb-2"><RefreshCw size={24} className="animate-spin text-primary" /></div>
                      Loading messages...
                    </td>
                  </tr>
                ) : filteredMessages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-muted-foreground">
                      No messages found.
                    </td>
                  </tr>
                ) : (
                  filteredMessages.map((msg) => {
                    const { name: cleanName, avatarId } = parseNameAndAvatar(msg.name, msg.id);
                    return (
                      <tr key={msg.id}>
                        <td className="whitespace-nowrap text-sm text-muted-foreground">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </td>
                        <td className="font-medium">
                          <div className="flex items-center gap-2">
                            <GenzAvatar avatarId={avatarId} size={24} className="rounded-full border border-border" />
                            <span>{cleanName}</span>
                          </div>
                        </td>
                      <td>
                        <div className="text-sm max-w-sm">
                          <p className="line-clamp-2" title={msg.text}>{msg.text}</p>
                          {msg.reply && (
                            <div className="mt-2 text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 p-2 rounded-lg border border-blue-500/20 flex items-start gap-2">
                              <div className="flex items-center gap-1 font-bold mt-0.5 shrink-0 uppercase tracking-tighter text-[10px]">
                                Rakha <BadgeCheck size={12} className="fill-blue-500 text-white" />:
                              </div>
                              <span className="italic">"{msg.reply}"</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="inline-flex items-center justify-center bg-rose-500/10 text-rose-500 px-2 py-1 rounded text-xs font-semibold">
                          ♥ {msg.reactions || 0}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns !justify-end">
                          <button 
                            className="btn-edit" 
                            title="Reply"
                            onClick={() => openReplyModal(msg)}
                          >
                            <Reply size={18} />
                          </button>
                          <button 
                            className="btn-delete" 
                            title="Delete"
                            onClick={() => handleDelete(msg.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )
      }

      {/* Reply Modal */}
      {activeMessage && (
        <div className="modal-overlay" onClick={() => setActiveMessage(null)}>
          <div className="modal !max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title flex items-center gap-2">
                <Reply size={20} className="text-primary" />
                Reply to {parseNameAndAvatar(activeMessage.name).name}
              </h3>
              <button 
                onClick={() => setActiveMessage(null)}
                className="modal-close"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="bg-muted/40 p-3 rounded-lg border border-border/50 mb-6 text-sm italic">
                "{activeMessage.text}"
              </div>

              <div className="form-group">
                <label className="form-label">Your Reply (Admin)</label>
                <textarea 
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="Type a response..."
                  className="form-textarea min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground mt-2">Leave blank and save to remove an existing reply.</p>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                onClick={() => setActiveMessage(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleReplySubmit}
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? <RefreshCw size={16} className="animate-spin" /> : <Check size={16} />}
                Save Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
