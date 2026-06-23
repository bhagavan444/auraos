import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../styles/Connect.css';
import auraosHomeOrb from '../assets/auraos_home_orb.png';

// ═══════════════════════════════════════════════════════════════════════════
// PRESERVED EMAILJS CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════
const EMAILJS_SERVICE_ID = "service_8pg8cek";
const EMAILJS_NOTIFICATION_TEMPLATE_ID = "template_8v4b864";
const EMAILJS_AUTOREPLY_TEMPLATE_ID = "template_bdwrdmc";
const EMAILJS_PUBLIC_KEY = "GOTwySQukEpQEuRa5";

const EASE = [0.16, 1, 0.3, 1];

function RevealBlock({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={`con-text-block ${className}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Connect() {
  
  // PRESERVED EMAILJS STATE
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    document.title = "Connect | AuraOS";
    window.scrollTo(0, 0);
  }, []);

  // PRESERVED EMAILJS LOGIC
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Not Provided',
      subject: formData.subject,
      message: formData.message,
      portfolio_link: window.location.origin,
      linkedin_link: "https://www.linkedin.com/in/gsssbhagavan/",
      github_link: "https://github.com/bhagavan444"
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NOTIFICATION_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const handleScrollToForm = (e) => {
    e.preventDefault();
    const formSection = document.getElementById('conversation-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sticky Scroll Magic for Section 2
  const stickyRef = useRef(null);
  const { scrollYProgress: stickyProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"]
  });

  const o1 = useTransform(stickyProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(stickyProgress, [0, 0.25], [0, -50]);

  const o2 = useTransform(stickyProgress, [0.25, 0.4, 0.5], [0, 1, 0]);
  const y2 = useTransform(stickyProgress, [0.25, 0.4, 0.5], [50, 0, -50]);

  const o3 = useTransform(stickyProgress, [0.5, 0.65, 0.75], [0, 1, 0]);
  const y3 = useTransform(stickyProgress, [0.5, 0.65, 0.75], [50, 0, -50]);

  const o4 = useTransform(stickyProgress, [0.75, 0.9, 1], [0, 1, 1]);
  const y4 = useTransform(stickyProgress, [0.75, 0.9, 1], [50, 0, 0]);

  return (
    <div className="con-page">

      {/* PRESERVED NOTIFICATIONS */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className="con-toast con-toast--success"
          >
            <div className="con-toast-title">Message Sent Successfully.</div>
            <div className="con-toast-desc">Thank you for reaching out.<br/>AuraOS has received your context.</div>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className="con-toast con-toast--error"
          >
            <div className="con-toast-title">Something went wrong.</div>
            <div className="con-toast-desc">Please verify your connection or try again later.</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ────────────────────────────
          SECTION 1 — HERO
          ──────────────────────────── */}
      <section className="con-section s-con-hero">
        <RevealBlock>
          <h1 className="con-title-large" style={{ marginBottom: "32px" }}>
            Every meaningful relationship begins with a conversation.
          </h1>
          <p className="con-copy-small" style={{ fontSize: "28px", color: "var(--gray-secondary)", maxWidth: "800px" }}>
            AuraOS is built around understanding people.<br />
            Understanding begins here.
          </p>
        </RevealBlock>
      </section>

      {/* ────────────────────────────
          SECTION 2 — WHY CONNECT (Sticky Sequence)
          ──────────────────────────── */}
      <div ref={stickyRef} className="con-sticky-container" style={{ height: "400vh" }}>
        <div className="con-sticky-content">
          <motion.h1 className="con-massive-word" style={{ opacity: o1, y: y1 }}>You bring experience.</motion.h1>
          <motion.h1 className="con-massive-word" style={{ opacity: o2, y: y2 }}>You bring ideas.</motion.h1>
          <motion.h1 className="con-massive-word" style={{ opacity: o3, y: y3 }}>You bring questions.</motion.h1>
          <motion.h1 className="con-massive-word" style={{ opacity: o4, y: y4 }}>AuraOS brings understanding.</motion.h1>
        </div>
      </div>

      {/* ────────────────────────────
          SECTION 3 — START A CONVERSATION
          ──────────────────────────── */}
      <section id="conversation-form-section" className="con-form-section">
        <RevealBlock>
          <h2 className="con-title-medium" style={{ color: "var(--charcoal)", marginBottom: "32px" }}>
            Tell AuraOS what you're building.
          </h2>
          <p className="con-copy-small" style={{ fontSize: "24px", color: "var(--gray-secondary)", maxWidth: "800px" }}>
            Projects. Research. Ideas. Careers. Questions.<br />
            Every conversation creates context.
          </p>

          <div className="con-glass-card">
            <form onSubmit={handleSubmit} className="con-form">
              
              <div className="con-form-row">
                <div className="con-form-group">
                  <label className="con-label">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="con-input" placeholder="Your Name" />
                </div>
                <div className="con-form-group">
                  <label className="con-label">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="con-input" placeholder="hello@example.com" />
                </div>
              </div>

              <div className="con-form-group">
                <label className="con-label">Company (Optional)</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} className="con-input" placeholder="Organization" />
              </div>

              <div className="con-form-group">
                <label className="con-label">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="con-input" placeholder="What is this regarding?" />
              </div>

              <div className="con-form-group">
                <label className="con-label">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required className="con-input con-textarea" placeholder="Share your context..." />
              </div>

              <div style={{ textAlign: "right" }}>
                <button type="submit" disabled={status === 'loading'} className="con-submit-btn">
                  {status === 'loading' ? 'Sending Context...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </RevealBlock>
      </section>

      {/* ────────────────────────────
          SECTION 4 — THE BUILDER
          ──────────────────────────── */}
      <section className="con-section con-builder-section">
        <RevealBlock>
          <h2 className="con-title-medium" style={{ color: "var(--charcoal)", maxWidth: "900px" }}>
            Built by an engineer exploring the future of personal intelligence.
          </h2>
          <p className="con-copy-small" style={{ fontSize: "24px", color: "var(--gray-secondary)", maxWidth: "800px", marginTop: "40px" }}>
            Interested in AI systems, software engineering, learning technologies, and products that help people grow.
          </p>
          
          <div className="con-utility-links">
            <a href="mailto:g.sivasatysaibhagavan@gmail.com" className="con-utility-link">Email <span>↗</span></a>
            <a href="https://www.linkedin.com/in/gsssbhagavan/" target="_blank" rel="noopener noreferrer" className="con-utility-link">LinkedIn <span>↗</span></a>
            <a href="https://github.com/bhagavan444" target="_blank" rel="noopener noreferrer" className="con-utility-link">GitHub <span>↗</span></a>
            <a href="/Siva_Bhagavan_Resume.pdf" target="_blank" rel="noopener noreferrer" className="con-utility-link">Resume <span>↗</span></a>
          </div>
        </RevealBlock>
      </section>

      {/* ────────────────────────────
          SECTION 5 — THE FUTURE (MONUMENTAL)
          ──────────────────────────── */}
      <section className="con-section con-future-section">
        <RevealBlock>
          <motion.h1 className="con-title-massive" style={{ color: "var(--gray-tertiary)" }}>
            The future is not<br />more software.
          </motion.h1>
          <motion.h1 className="con-title-massive" style={{ color: "var(--gray-tertiary)", marginTop: "40px" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 1.5 }}>
            The future is understanding.
          </motion.h1>
          <motion.h1 className="con-title-massive" style={{ color: "var(--charcoal)", marginTop: "40px" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.5, duration: 1.5 }}>
            The future is personal<br />intelligence.
          </motion.h1>
        </RevealBlock>
      </section>

      {/* ────────────────────────────
          SECTION 6 — THE FINALE
          ──────────────────────────── */}
      <section className="con-finale-section">
        <RevealBlock>
          <motion.img 
            src={auraosHomeOrb} 
            alt="AuraOS" 
            className="con-orb-glow"
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: ["0 0 80px rgba(255,255,255,0.1)", "0 0 120px rgba(255,255,255,0.3)", "0 0 80px rgba(255,255,255,0.1)"]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <h1 className="con-finale-title">
            Start the conversation.
          </h1>
          <p className="con-finale-sub">
            The next chapter of understanding begins with a single message.
          </p>
          
          <div className="con-finale-actions">
            <Link to="/chat" className="con-btn-primary">
              Launch AuraOS
            </Link>
            <a href="#conversation-form-section" onClick={handleScrollToForm} className="con-btn-secondary">
              Send Message
            </a>
          </div>
        </RevealBlock>
      </section>

    </div>
  );
}
