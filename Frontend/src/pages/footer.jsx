import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./footer.css";

const EASE = [0.16, 1, 0.3, 1];

export default function Footer() {
  return (
    <footer className="aura-footer-container">
      
      {/* WWDC Closing Sequence */}
      <section className="aura-footer-finale">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <div className="aura-footer-pillar">Memory.</div>
          <div className="aura-footer-pillar">Knowledge.</div>
          <div className="aura-footer-pillar">Reasoning.</div>
          <div className="aura-footer-pillar">Context.</div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 1, duration: 1.5, ease: EASE }}>
          <div className="aura-footer-unified">Unified.</div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.5, ease: EASE }}>
          <div className="aura-footer-philosophy">AuraOS is building the future of personal intelligence.</div>
        </motion.div>
      </section>

      <div className="aura-footer-divider" />

      {/* 5 Column Grid */}
      <div className="aura-footer-grid">
        <div className="aura-footer-column">
          <div className="aura-footer-heading">Explore</div>
          <Link to="/intelligence" className="aura-footer-link">Intelligence</Link>
          <Link to="/memory" className="aura-footer-link">Memory</Link>
          <Link to="/knowledge" className="aura-footer-link">Knowledge</Link>
          <Link to="/privacy" className="aura-footer-link">Privacy</Link>
          <Link to="/research" className="aura-footer-link">Research</Link>
        </div>
        <div className="aura-footer-column">
          <div className="aura-footer-heading">Platform</div>
          <Link to="/architecture" className="aura-footer-link">Architecture</Link>
          <Link to="/demo" className="aura-footer-link">Demo</Link>
          <Link to="/roadmap" className="aura-footer-link">Roadmap</Link>
          <Link to="/manifesto" className="aura-footer-link">Manifesto</Link>
        </div>
        <div className="aura-footer-column">
          <div className="aura-footer-heading">Experience</div>
          <Link to="/chat" className="aura-footer-link">Launch AuraOS</Link>
          <Link to="/about" className="aura-footer-link">About</Link>
          <Link to="/contact" className="aura-footer-link">Contact</Link>
          <Link to="/plans" className="aura-footer-link">Plans</Link>
        </div>
        <div className="aura-footer-column">
          <div className="aura-footer-heading">Resources</div>
          <a href="#" className="aura-footer-link">GitHub</a>
          <a href="#" className="aura-footer-link">LinkedIn</a>
          <a href="#" className="aura-footer-link">Portfolio</a>
          <a href="#" className="aura-footer-link">Documentation</a>
        </div>
        <div className="aura-footer-column">
          <div className="aura-footer-heading">Legal</div>
          <Link to="/privacy" className="aura-footer-link">Privacy Policy</Link>
          <a href="#" className="aura-footer-link">Terms of Service</a>
          <Link to="/contact" className="aura-footer-link">Contact Legal</Link>
        </div>
      </div>

      <div className="aura-footer-divider" style={{ margin: "0 auto" }} />

      {/* Bottom Bar */}
      <div className="aura-footer-bottom">
        <div className="aura-footer-bottom-left">
          <span>&copy; 2026 AuraOS.</span>
          <span>Personal Intelligence System.</span>
        </div>
        <div className="aura-footer-bottom-right">
          <span>Built for understanding.</span>
        </div>
      </div>

    </footer>
  );
}
