import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import auraosLogo from "../assets/auraos_logo.png";
import "./Navbar.css";

const TOP_LINKS = [
  { id: "overview", label: "Overview", path: "/" },
  { id: "intelligence", label: "Intelligence", path: "/intelligence" },
  { id: "platform", label: "Platform", path: "/architecture" },
  { id: "resources", label: "Resources", path: "/research" },
  { id: "chat", label: "Chat", path: "/chat" }
];

const MEGA_MENUS = {
  intelligence: [
    {
      title: "Core Intelligence",
      links: [
        { label: "Memory", path: "/memory" },
        { label: "Knowledge", path: "/knowledge" },
        { label: "Reasoning", path: "/intelligence" },
        { label: "Context", path: "/intelligence" }
      ]
    }
  ],
  platform: [
    {
      title: "Ecosystem",
      links: [
        { label: "Architecture", path: "/architecture" },
        { label: "Demo", path: "/demo" },
        { label: "Roadmap", path: "/roadmap" }
      ]
    }
  ],
  resources: [
    {
      title: "Explore",
      links: [
        { label: "Research", path: "/research" },
        { label: "Privacy", path: "/privacy" },
        { label: "Manifesto", path: "/manifesto" }
      ]
    },
    {
      title: "Company",
      sublinks: [
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" }
      ]
    }
  ]
};

export default function Navbar({ handleLogout }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setActiveMenu(null);
    window.addEventListener("scroll", handleScroll);
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleChatNavigation = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/chat');
    } else {
      alert("Please login to access AuraOS Chat.");
      navigate('/login');
    }
  };

  return (
    <>
      <nav className="navbar-container" onMouseLeave={() => setActiveMenu(null)}>
        <div className="navbar-content">
          
          <div className="navbar-logo-container">
            <Link to="/">
              <motion.img 
                src={auraosLogo} 
                alt="AuraOS" 
                className="navbar-logo" 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
            </Link>
          </div>

          <div className="navbar-links">
            {TOP_LINKS.map((link) => (
              <div 
                key={link.id} 
                className="navbar-item"
                onMouseEnter={() => setActiveMenu(MEGA_MENUS[link.id] ? link.id : null)}
              >
                <Link 
                  to={link.path} 
                  className="nav-link"
                  onClick={(e) => {
                    if (link.id === "chat") {
                      handleChatNavigation(e);
                    }
                  }}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="navbar-actions">
            <Search className="nav-icon" />
            
            <div className="profile-dropdown-container">
              {user ? (
                <img 
                  src={user.photoURL || "https://ui-avatars.com/api/?name=" + (user.displayName || "User") + "&background=random"} 
                  alt="Profile" 
                  className="nav-profile-img" 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                />
              ) : (
                <User className="nav-icon" onClick={() => navigate('/login')} />
              )}
              
              <AnimatePresence>
                {showProfileDropdown && user && (
                  <motion.div 
                    className="profile-dropdown"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button className="logout-btn" onClick={() => {
                      setShowProfileDropdown(false);
                      if (handleLogout) handleLogout();
                    }}>
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#" className="navbar-cta-pill" onClick={handleChatNavigation}>Launch AuraOS</a>
            <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} color="#1d1d1f" /> : <Menu size={20} color="#1d1d1f" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mega Menu */}
      <AnimatePresence>
        {activeMenu && MEGA_MENUS[activeMenu] && (
          <motion.div
            className="mega-menu-overlay"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="mega-menu-content">
              {MEGA_MENUS[activeMenu].map((col, idx) => (
                <div key={idx} className="mega-menu-col">
                  <div className="mega-menu-title">{col.title}</div>
                  {col.links && col.links.map((link, i) => (
                    <Link key={i} to={link.path} className="mega-menu-link" onClick={() => setActiveMenu(null)}>{link.label}</Link>
                  ))}
                  {col.sublinks && col.sublinks.map((link, i) => (
                    <Link key={i} to={link.path} className="mega-menu-sublink" onClick={() => setActiveMenu(null)}>{link.label}</Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {TOP_LINKS.map(link => (
              <Link key={link.id} to={link.path} className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <a href="#" className="mobile-nav-link" style={{ color: '#0066cc' }} onClick={(e) => {
              setIsMobileMenuOpen(false);
              handleChatNavigation(e);
            }}>
              Launch AuraOS
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}