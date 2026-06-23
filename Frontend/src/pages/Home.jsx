import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";
import auraosLogo from "../assets/auraos_logo.png";
import auraosHomeOrb from "../assets/auraos_home_orb.png";
import auraosMemoryUI from "../assets/auraos_memory_ui.png";
import auraosKnowledgeUI from "../assets/auraos_knowledge_ui.png";
import auraosReasoningUI from "../assets/auraos_reasoning_ui.png";

const EASE = [0.16, 1, 0.3, 1];

export default function Home() {
  return (
    <div className="home-page">
      
      {/* 1. Hero Section */}
      <section className="home-hero-section">
        <div className="home-hero-content">
          
          <div className="home-hero-text">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
              <div className="home-eyebrow">Introducing AuraOS</div>
              <h1 className="home-hero-headline">The Personal Intelligence<br/>Operating System.</h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: EASE }}>
              <p className="home-subheadline">
                AuraOS remembers, understands, and reasons across everything you do.
              </p>
              <div className="home-hero-buttons">
                <Link to="/chat" className="home-btn-primary">Launch AuraOS</Link>
                <Link to="/demo" className="home-btn-secondary">Watch Introduction</Link>
              </div>
            </motion.div>
          </div>

          <div className="home-hero-visual">
            <motion.img 
              src={auraosHomeOrb}
              alt="AuraOS Orb"
              className="home-hero-orb"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.03, 1],
                y: [0, -8, 0]
              }}
              transition={{ 
                opacity: { duration: 1.5, delay: 0.2, ease: EASE },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </div>

        </div>
      </section>

      {/* 2. Philosophy (Signature Apple Moment) */}
      <section className="home-philosophy-section">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="home-philosophy-headline" style={{ color: "#86868b" }}>Most AI answers questions.</h2>
          <h2 className="home-philosophy-headline" style={{ marginTop: "40px" }}>AuraOS builds understanding.</h2>
        </motion.div>
      </section>

      {/* 3. Product Reveal */}
      <section className="home-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="home-section-headline" style={{ color: "#6e6e73" }}>One Intelligence Layer.</h2>
          <h2 className="home-section-headline">For everything.</h2>
        </motion.div>
      </section>

      {/* 3. Remembers */}
      <section className="home-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 className="home-section-headline">It Remembers.</h2>
          <p className="home-subheadline" style={{ marginTop: "24px", marginBottom: "60px" }}>Perfect continuity across every conversation.</p>
          <div className="home-screenshot-container">
            <img src={auraosMemoryUI} alt="Memory Engine Interface" className="home-screenshot-img" />
          </div>
        </motion.div>
      </section>

      {/* 4. Understands */}
      <section className="home-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 className="home-section-headline">It Understands.</h2>
          <p className="home-subheadline" style={{ marginTop: "24px", marginBottom: "60px" }}>Synthesizes documents, files, and links instantly.</p>
          <div className="home-screenshot-container">
            <img src={auraosKnowledgeUI} alt="Knowledge Engine Interface" className="home-screenshot-img" />
          </div>
        </motion.div>
      </section>

      {/* 5. Reasons */}
      <section className="home-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 className="home-section-headline">It Reasons.</h2>
          <p className="home-subheadline" style={{ marginTop: "24px", marginBottom: "60px" }}>Connects ideas to help you make better decisions.</p>
          <div className="home-screenshot-container">
            <img src={auraosReasoningUI} alt="Reasoning Matrix Interface" className="home-screenshot-img" />
          </div>
        </motion.div>
      </section>

      {/* 6. Final Reveal */}
      <section className="home-final-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <motion.img 
            src={auraosHomeOrb} 
            alt="AuraOS Orb" 
            className="home-hero-orb" 
            style={{ width: "160px", height: "160px", margin: "0 auto 40px" }}
            animate={{ 
              scale: [1, 1.03, 1],
              y: [0, -4, 0]
            }}
            transition={{ 
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <h2 className="home-section-headline">The Future of<br/>Personal Intelligence.</h2>
          <div className="home-hero-buttons" style={{ marginTop: "60px" }}>
            <Link to="/chat" className="home-btn-primary" style={{ padding: "20px 48px", fontSize: "18px" }}>Launch AuraOS</Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}