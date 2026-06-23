import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import "./Knowledge.css";
import auraosKnowledgeDocUI from "../assets/auraos_knowledge_document_ui.png";

const EASE = [0.16, 1, 0.3, 1];

export default function Knowledge() {
  return (
    <div className="knowledge-page">
      
      {/* 1. Hero */}
      <section className="knowledge-hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
          <h1 className="knowledge-hero-headline">Knowledge.</h1>
          <p className="knowledge-subheadline">The difference between finding data and understanding it.</p>
        </motion.div>
      </section>

      {/* 2. The Problem Statement */}
      <section className="knowledge-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="knowledge-statement">You don't need another search bar.</h2>
          <h2 className="knowledge-statement-secondary" style={{ marginTop: "24px" }}>You need a synthesis engine.</h2>
        </motion.div>
      </section>

      {/* 3. The Foundational Conceptual Funnel */}
      <section className="knowledge-funnel-sequence">
        <motion.div className="knowledge-funnel-item" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="knowledge-section-headline" style={{ color: "#6e6e73" }}>Files</h2>
          <ArrowDown className="knowledge-funnel-arrow" size={32} />
        </motion.div>
        
        <motion.div className="knowledge-funnel-item" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="knowledge-section-headline" style={{ color: "#6e6e73" }}>Documents</h2>
          <ArrowDown className="knowledge-funnel-arrow" size={32} />
        </motion.div>

        <motion.div className="knowledge-funnel-item" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="knowledge-section-headline" style={{ color: "#6e6e73" }}>Information</h2>
          <ArrowDown className="knowledge-funnel-arrow" size={32} />
        </motion.div>

        <motion.div className="knowledge-funnel-item" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="knowledge-section-headline" style={{ color: "#6e6e73" }}>Knowledge</h2>
          <ArrowDown className="knowledge-funnel-arrow" size={32} />
        </motion.div>

        <motion.div className="knowledge-funnel-item" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="knowledge-section-headline" style={{ color: "#1d1d1f" }}>Understanding.</h2>
        </motion.div>
      </section>

      {/* 4. Narrative Context (Replaces Feature List) */}
      <section className="knowledge-chapter-left">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "24px" }}>Everything you've created.</h3>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "24px" }}>Everything you've learned.</h3>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "60px" }}>Everything you've collected.</h3>
          <h2 className="knowledge-statement">One understanding layer.</h2>
        </motion.div>
      </section>

      {/* 5. Premium UI Mockup Reveal */}
      <section className="knowledge-chapter" style={{ minHeight: "120vh" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="knowledge-screenshot-container">
            <img src={auraosKnowledgeDocUI} alt="Document Intelligence UI" className="knowledge-screenshot-img" />
          </div>
        </motion.div>
      </section>

      {/* 6. Converging Concepts */}
      <section className="knowledge-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "16px" }}>Career</h3>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "16px" }}>Research</h3>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "16px" }}>Projects</h3>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "16px" }}>Goals</h3>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "60px" }}>Skills</h3>
          <ArrowDown className="knowledge-funnel-arrow" size={32} style={{ marginBottom: "60px", margin: "0 auto 60px" }} />
          <h2 className="knowledge-statement">Understanding.</h2>
        </motion.div>
      </section>

      {/* 7. Positioning Statement */}
      <section className="knowledge-dark-section">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="knowledge-statement" style={{ marginBottom: "24px", color: "#86868b" }}>You don't search.</h2>
          <h2 className="knowledge-statement" style={{ marginBottom: "80px", color: "#86868b" }}>You ask.</h2>
          <h2 className="knowledge-statement">AuraOS already knows where to look.</h2>
        </motion.div>
      </section>

      {/* 8. Extended 100vh Workflow Sequence */}
      <section className="knowledge-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="knowledge-statement">Upload a document.</h2>
        </motion.div>
      </section>

      <section className="knowledge-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="knowledge-statement">Ask a question.</h2>
        </motion.div>
      </section>

      <section className="knowledge-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="knowledge-statement">Receive understanding.</h2>
        </motion.div>
      </section>

      <section className="knowledge-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="knowledge-statement">Continue the conversation.</h2>
        </motion.div>
      </section>

      {/* 9. The "One Big Apple Moment" */}
      <section className="knowledge-chapter-left">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "24px" }}>Resume.</h3>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "24px" }}>Research Notes.</h3>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "24px" }}>Projects.</h3>
          <h3 className="knowledge-statement-secondary" style={{ marginBottom: "60px" }}>Conversations.</h3>
          <h2 className="knowledge-statement">AuraOS sees one story.</h2>
        </motion.div>
      </section>

      {/* 10. Manifesto Copy */}
      <section className="knowledge-chapter">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="knowledge-statement" style={{ marginBottom: "24px", color: "#6e6e73" }}>Knowledge is not information.</h2>
          <h2 className="knowledge-statement">Knowledge is connected understanding.</h2>
        </motion.div>
      </section>

      {/* 11. Grand Finale */}
      <section className="knowledge-dark-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="knowledge-statement" style={{ marginBottom: "80px" }}>Knowledge becomes understanding.</h2>
          <Link to="/chat" className="knowledge-btn-primary">Launch AuraOS</Link>
        </motion.div>
      </section>

    </div>
  );
}
