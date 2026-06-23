import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Paperclip, ArrowUp, Search, MoreHorizontal, Edit, Trash2, PanelLeftClose, PanelLeftOpen, Check, X } from "lucide-react";
import { auth } from "../firebase";
import { api } from "../services/api";

import "./Chat.css";
import auraosLogo from "../assets/auraos_logo.png";

const EASE = [0.16, 1, 0.3, 1];

// ─── MARKDOWN COMPONENT ──────────────────────────────────────────────────────
function MarkdownRenderer({ content }) {
  return (
    <div className="apple-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const [copied, setCopied] = useState(false);
            
            const handleCopy = () => {
              navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            };

            return !inline && match ? (
              <div className="code-block-wrapper">
                <div className="code-block-header">
                  <span className="code-lang">{match[1]}</span>
                  <button onClick={handleCopy} className="code-copy-btn">
                    {copied ? <Check size={14} /> : "Copy"}
                  </button>
                </div>
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, padding: '16px', background: '#F5F5F7', fontSize: '13px', borderRadius: '0 0 12px 12px' }}
                  showLineNumbers={true}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// ─── MAIN APP WORKSPACE ──────────────────────────────────────────────────────
export default function AuraOSChat() {
  // State
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingId, setStreamingId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  // Sidebar & Search State
  const [sidebarExpanded, setSidebarExpanded] = useState(() => {
    const saved = localStorage.getItem("auraos_sidebar");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [searchQuery, setSearchQuery] = useState("");
  
  // Context Menu State
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const bottomRef = useRef(null);

  // Initialize Auth
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u) fetchSessions();
    });
    return () => unsub();
  }, []);

  // Save Sidebar preference
  useEffect(() => {
    localStorage.setItem("auraos_sidebar", JSON.stringify(sidebarExpanded));
  }, [sidebarExpanded]);

  // Fetch Sessions
  const fetchSessions = async () => {
    try {
      const res = await api.chat.list();
      if (res?.chats) {
        setSessions(res.chats);
        setFilteredSessions(res.chats);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Real-time Title Search (Layer 1)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSessions(sessions);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredSessions(sessions.filter(s => s.title.toLowerCase().includes(q)));
      
      // Optionally trigger Layer 2 backend search here
      // api.chat.search(searchQuery).then(res => setFilteredSessions(res.results));
    }
  }, [searchQuery, sessions]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingId]);

  // Load a chat
  const loadChat = async (_id) => {
    setChatId(_id);
    try {
      const res = await api.chat.get(_id);
      if (res?.chat?.messages) {
        setMessages(res.chat.messages);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Create new chat
  const newChat = () => {
    setChatId(null);
    setMessages([]);
    setSearchQuery("");
  };

  // Send Message
  const sendMessage = async (e, textOverride = null) => {
    e?.preventDefault();
    const text = textOverride || input;
    if (!text.trim() && !loading) return;

    setInput("");
    
    let currentId = chatId;
    if (!currentId) {
      try {
        const res = await api.chat.create();
        currentId = res.chat_id;
        setChatId(currentId);
        // Will be titled asynchronously by backend
      } catch (err) {
        console.error(err);
        alert("Error creating chat: " + err.message);
        return;
      }
    }

    const newMsg = { id: Date.now().toString(), role: "user", content: text };
    const placeholderBotId = (Date.now() + 1).toString();
    
    setMessages((prev) => [...prev, newMsg, { id: placeholderBotId, role: "model", content: "" }]);
    setStreamingId(placeholderBotId);
    setLoading(true);

    try {
      const res = await api.chat.send({ message: text, chat_id: currentId });
      if (res?.response) {
        setMessages((prev) => prev.map(m => 
          m.id === placeholderBotId ? { ...m, content: res.response } : m
        ));
        
        // Refresh sessions to get potentially new auto-generated title
        setTimeout(() => fetchSessions(), 3000); 
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => prev.map(m => 
        m.id === placeholderBotId ? { ...m, content: `Error: ${err.message || "Failed to connect"}` } : m
      ));
    } finally {
      setLoading(false);
      setStreamingId(null);
    }
  };

  // Context Menu Actions
  const handleRename = async (id) => {
    if (!editTitle.trim()) {
      setEditingId(null);
      return;
    }
    try {
      await api.chat.rename(id, editTitle);
      setSessions(prev => prev.map(s => s.id === id ? { ...s, title: editTitle } : s));
    } catch (e) {
      console.error(e);
    } finally {
      setEditingId(null);
      setMenuOpenId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this conversation?")) return;
    try {
      await api.chat.delete(id);
      setSessions(prev => prev.filter(s => s.id !== id));
      if (chatId === id) newChat();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete ALL conversations? This cannot be undone.")) return;
    try {
      await api.chat.deleteAll();
      setSessions([]);
      newChat();
    } catch (e) {
      console.error(e);
    }
  };

  const activeTitle = sessions.find(s => s.id === chatId)?.title || "New Conversation";

  return (
    <div className="chat-app-root">
      
      {/* ────────────────────────────
          TOP NAV BAR (44px)
          ──────────────────────────── */}
      <header className="chat-topbar">
        <div className="chat-topbar-left">
          <button className="chat-logo-btn" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
            <img src={auraosLogo} alt="AuraOS" className="chat-logo-img" />
          </button>
          
          <button className="chat-logo-btn" style={{ marginLeft: '8px' }} onClick={() => setDropdownOpen(!dropdownOpen)}>
            AuraOS
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div 
                className="chat-dropdown-menu"
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <Link to="/" className="chat-dropdown-item" onClick={() => setDropdownOpen(false)}>Home</Link>
                <Link to="/intelligence" className="chat-dropdown-item" onClick={() => setDropdownOpen(false)}>Intelligence</Link>
                <Link to="/architecture" className="chat-dropdown-item" onClick={() => setDropdownOpen(false)}>Platform</Link>
                <Link to="/plans" className="chat-dropdown-item" onClick={() => setDropdownOpen(false)}>Plans</Link>
                <Link to="/research" className="chat-dropdown-item" onClick={() => setDropdownOpen(false)}>Research</Link>
                <Link to="/about" className="chat-dropdown-item" onClick={() => setDropdownOpen(false)}>About</Link>
                <div style={{ height: "1px", background: "var(--chat-border)", margin: "4px 0" }} />
                <Link to="/profile" className="chat-dropdown-item" onClick={() => setDropdownOpen(false)}>Settings</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="chat-topbar-center">
          {activeTitle}
        </div>

        <div className="chat-topbar-right">
          <div className="chat-avatar">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" style={{ width: "100%", height: "100%" }} />
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--chat-text-secondary)" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            )}
          </div>
        </div>
      </header>

      {/* ────────────────────────────
          WORKSPACE
          ──────────────────────────── */}
      <div className="chat-workspace">
        
        {/* 1. Left Pane: Library */}
        <motion.aside 
          className="chat-pane-left"
          initial={false}
          animate={{ width: sidebarExpanded ? 300 : 0, opacity: sidebarExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ overflow: 'hidden', borderRight: sidebarExpanded ? '1px solid var(--chat-border)' : 'none' }}
        >
          <div style={{ padding: "0 16px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="chat-search-bar" style={{ display: "flex", alignItems: "center", background: "var(--chat-selected-bg)", borderRadius: "8px", padding: "6px 10px", flex: 1, marginRight: "12px" }}>
              <Search size={14} color="var(--chat-text-secondary)" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: "none", background: "transparent", outline: "none", fontSize: "13px", marginLeft: "8px", width: "100%" }} 
              />
            </div>
            <button onClick={newChat} style={{ border: "none", background: "transparent", color: "var(--chat-text-secondary)", cursor: "pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>

          <div className="library-section" style={{ flex: 1, overflowY: 'auto' }}>
            {filteredSessions.map(s => (
              <div 
                key={s.id} 
                className={`library-item ${chatId === s.id ? "active" : ""}`}
                onClick={() => loadChat(s.id)}
                onMouseLeave={() => setMenuOpenId(null)}
              >
                {editingId === s.id ? (
                  <input 
                    autoFocus
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRename(s.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    onBlur={() => handleRename(s.id)}
                    className="library-rename-input"
                  />
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.title}</span>
                    <button 
                      className="library-more-btn"
                      onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === s.id ? null : s.id); }}
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                )}

                {/* Context Menu */}
                {menuOpenId === s.id && editingId !== s.id && (
                  <div className="library-context-menu">
                    <button onClick={(e) => { e.stopPropagation(); setEditTitle(s.title); setEditingId(s.id); }}><Edit size={12}/> Rename</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(s.id); }} style={{ color: 'red' }}><Trash2 size={12}/> Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div style={{ padding: "16px", borderTop: "1px solid var(--chat-border)" }}>
             <button onClick={handleDeleteAll} style={{ background: "transparent", border: "none", color: "var(--chat-text-secondary)", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
               <Trash2 size={14} /> Delete all conversations
             </button>
          </div>
        </motion.aside>

        {/* 2. Center Pane: Space */}
        <main className="chat-pane-center">
          
          <div className="chat-stream">
            {messages.length === 0 ? (
              // EMPTY STATE
              <div className="chat-empty-state">
                <img src={auraosLogo} alt="AuraOS" className="empty-logo" />
                <h2 className="empty-title">What would you like AuraOS to understand?</h2>
                <p className="empty-subtitle">Memory. Knowledge. Reasoning.<br/>Unified into a single intelligence layer.</p>
                
                <div className="suggestion-grid">
                  {[
                    "Analyze my Resume",
                    "Review my Portfolio",
                    "Summarize Documents",
                    "Generate Career Roadmap",
                    "Research a Topic",
                    "Explain Uploaded Files"
                  ].map(sug => (
                    <div key={sug} className="suggestion-card" onClick={(e) => sendMessage(e, sug)}>
                      {sug}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // MESSAGES
              <>
                <div className="chat-identity-banner">MEMORY · KNOWLEDGE · REASONING</div>
                
                {messages.map((m) => (
                  <motion.div 
                    key={m.id} 
                    className={`chat-message-row ${m.role === "user" ? "msg-user" : "msg-bot"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <div className="msg-content">
                      {m.role === "model" && m.id === streamingId ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", height: "24px" }}>
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--chat-accent)" }} 
                          />
                        </div>
                      ) : (
                        <MarkdownRenderer content={m.content} />
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={bottomRef} style={{ height: "20px" }} />
              </>
            )}
          </div>

          {/* INPUT BAR */}
          <div className="chat-input-wrapper">
            <form className="chat-input-container" onSubmit={(e) => sendMessage(e)}>
              <button type="button" style={{ border: "none", background: "none", color: "var(--chat-text-secondary)", display: "flex", cursor: "pointer", padding: "4px" }}>
                <Paperclip size={20} />
              </button>
              
              <input
                type="text"
                className="chat-input-field"
                placeholder="Ask AuraOS anything."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              
              <button type="submit" className="chat-send-btn" disabled={!input.trim() || loading}>
                <ArrowUp size={18} strokeWidth={2.5} />
              </button>
            </form>
          </div>
        </main>

      </div>
    </div>
  );
}