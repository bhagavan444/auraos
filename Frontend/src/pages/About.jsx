import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./About.css";

import remembersImg from "../assets/auraos_memory_ui.png";
import understandsImg from "../assets/auraos_knowledge_ui.png";
import reasonsImg from "../assets/auraos_reasoning_ui.png";

const EASE = [0.16, 1, 0.3, 1];

function RevealBlock({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={`about-text-block ${className}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "About | AuraOS";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-page">
      
      {/* ────────────────────────────
          SECTION 1 — HERO
          ──────────────────────────── */}
      <section className="about-section s-about-hero" style={{ minHeight: "100vh" }}>
        <RevealBlock>
          <p className="about-label" style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em", color: "var(--gray-tertiary)", textTransform: "uppercase", marginBottom: "24px" }}>
            About AuraOS
          </p>
          <h1 className="about-title-large" style={{ marginBottom: "32px" }}>
            A personal<br />intelligence system.
          </h1>
          <p className="about-copy-small" style={{ fontSize: "28px", lineHeight: 1.4, color: "var(--gray-secondary)", maxWidth: "100%" }}>
            Built to remember.<br />
            Designed to understand.<br />
            Created to reason.
          </p>
        </RevealBlock>
      </section>

      {/* ────────────────────────────
          SECTION 2 — THE PROBLEM
          ──────────────────────────── */}
      <section className="about-section" style={{ minHeight: "100vh", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <motion.h2 
            className="about-title-medium" 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: EASE }}
            style={{ color: "var(--gray-tertiary)" }}
          >
            Most AI responds.
          </motion.h2>
          <motion.h2 
            className="about-title-medium" 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: 0.3, ease: EASE }}
            style={{ color: "var(--gray-tertiary)" }}
          >
            Most AI forgets.
          </motion.h2>
          <motion.h2 
            className="about-title-medium" 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, delay: 0.6, ease: EASE }}
            style={{ color: "var(--gray-tertiary)", marginBottom: "48px" }}
          >
            Most AI starts over.
          </motion.h2>
          <motion.h2 
            className="about-title-medium" 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, delay: 1.2, ease: EASE }}
            style={{ color: "var(--charcoal)" }}
          >
            People don't.
          </motion.h2>
        </div>
      </section>

      {/* ────────────────────────────
          SECTION 3 — THE BRIDGE
          ──────────────────────────── */}
      <section className="about-section" style={{ padding: "160px 24px" }}>
        <RevealBlock>
          <h2 className="about-title-medium" style={{ color: "var(--gray-tertiary)" }}>
            Every conversation.
          </h2>
          <h2 className="about-title-medium" style={{ color: "var(--gray-tertiary)", marginTop: "16px" }}>
            Every document.
          </h2>
          <h2 className="about-title-medium" style={{ color: "var(--gray-tertiary)", marginTop: "16px", marginBottom: "48px" }}>
            Every decision.
          </h2>
          <h2 className="about-title-medium" style={{ color: "var(--charcoal)", marginBottom: "16px" }}>
            Creates context.
          </h2>
          <h2 className="about-title-medium" style={{ color: "var(--charcoal)" }}>
            Context becomes understanding.
          </h2>
        </RevealBlock>
      </section>

      {/* ────────────────────────────
          SECTION 4 — MEMORY
          ──────────────────────────── */}
      <section className="about-section" style={{ padding: "120px 24px" }}>
        <RevealBlock>
          <h2 className="about-title-large">Remembers.</h2>
          <p className="about-copy-small" style={{ marginBottom: "80px", maxWidth: "600px" }}>
            AuraOS remembers what matters.<br /><br />
            Not just conversations.<br />
            Context.<br />
            Patterns.<br />
            Decisions.<br />
            Knowledge.
          </p>
          <img src={remembersImg} alt="AuraOS Memory" className="product-screenshot" />
        </RevealBlock>
      </section>

      {/* ────────────────────────────
          SECTION 5 — KNOWLEDGE / UNDERSTANDING
          ──────────────────────────── */}
      <section className="about-section" style={{ padding: "120px 24px" }}>
        <RevealBlock>
          <h2 className="about-title-large">Understands.</h2>
          <p className="about-copy-small" style={{ marginBottom: "80px", maxWidth: "600px" }}>
            Information alone has no meaning.<br /><br />
            Understanding emerges when<br />
            knowledge connects.
          </p>
          <img src={understandsImg} alt="AuraOS Knowledge" className="product-screenshot" />
        </RevealBlock>
      </section>

      {/* ────────────────────────────
          SECTION 6 — REASONING
          ──────────────────────────── */}
      <section className="about-section" style={{ padding: "120px 24px" }}>
        <RevealBlock>
          <h2 className="about-title-large">Reasons.</h2>
          <p className="about-copy-small" style={{ marginBottom: "80px", maxWidth: "500px" }}>
            Search finds information.<br /><br />
            Reasoning finds meaning.
          </p>
          <img src={reasonsImg} alt="AuraOS Reasoning" className="product-screenshot" />
        </RevealBlock>
      </section>

      {/* ────────────────────────────
          SECTION 7 — VISUAL STORY (CONVERGENCE)
          ──────────────────────────── */}
      <section className="about-section" style={{ padding: "240px 24px", backgroundColor: "#fff", textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "120px" }}>
          {["Memory.", "Knowledge.", "Understanding.", "Intelligence."].map((word, index) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <h1 className="about-title-large" style={{ fontSize: "clamp(48px, 8vw, 120px)", color: index === 3 ? "var(--charcoal)" : "var(--gray-tertiary)", letterSpacing: "-0.03em" }}>
                {word}
              </h1>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────
          SECTION 8 — THE MONUMENTAL MOMENT
          ──────────────────────────── */}
      <section className="about-section" style={{ minHeight: "100vh", justifyContent: "center", textAlign: "center", padding: "24px" }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h1 className="about-title-large" style={{ color: "var(--gray-tertiary)", marginBottom: "40px", fontSize: "clamp(40px, 6vw, 80px)" }}>
            The future is not<br />more software.
          </h1>
          <h1 className="about-title-large" style={{ color: "var(--charcoal)", fontSize: "clamp(40px, 6vw, 80px)" }}>
            The future is intelligence<br />that grows with you.
          </h1>
        </motion.div>
      </section>

      {/* ────────────────────────────
          SECTION 9 — FOUNDER
          ──────────────────────────── */}
      <section className="about-section" style={{ padding: "120px 24px", minHeight: "50vh" }}>
        <RevealBlock>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", textAlign: "center" }}>
            <h2 className="about-title-medium" style={{ color: "var(--charcoal)", maxWidth: "800px" }}>
              Built by an engineer exploring the future of personal intelligence.
            </h2>
            <div style={{ marginTop: "24px" }}>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--gray-secondary)" }}>Siva Satya Sai Bhagavan</p>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--gray-tertiary)", marginTop: "4px" }}>AI & Intelligent Systems</p>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ────────────────────────────
          SECTION 10 — FINAL REVEAL
          ──────────────────────────── */}
      <section className="about-section" style={{ minHeight: "100vh", backgroundColor: "var(--gray-light)", borderTop: "1px solid var(--gray-border)" }}>
        <RevealBlock>
          <h2 className="about-title-medium" style={{ color: "var(--gray-tertiary)" }}>
            You don't need another chatbot.
          </h2>
          <h2 className="about-title-medium" style={{ color: "var(--gray-tertiary)", marginTop: "40px" }}>
            You need something that remembers.
          </h2>
          <h2 className="about-title-medium" style={{ color: "var(--gray-tertiary)", marginTop: "16px" }}>
            Something that understands.
          </h2>
          <h2 className="about-title-medium" style={{ color: "var(--charcoal)", marginTop: "16px", marginBottom: "120px" }}>
            Something that grows.
          </h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          >
            <h1 className="about-title-large" style={{ fontSize: "clamp(64px, 12vw, 180px)", marginBottom: "64px", letterSpacing: "-0.05em" }}>
              AuraOS
            </h1>
            
            <button 
              className="final-cta-btn"
              style={{ fontSize: "18px", padding: "18px 48px" }}
              onClick={() => navigate("/chat")}
            >
              Launch AuraOS
            </button>
          </motion.div>
        </RevealBlock>
      </section>

    </main>
  );
}