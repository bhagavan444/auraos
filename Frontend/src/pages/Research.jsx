import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Research.css";
import auraosHomeOrb from "../assets/auraos_home_orb.png";

const EASE = [0.16, 1, 0.3, 1];

export default function Research() {
  const stickyRef = useRef(null);

  const { scrollYProgress: stickyProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"]
  });

  // Sticky Questions Sequence (Reduced to the core 3)
  const q1Op = useTransform(stickyProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const q1Y = useTransform(stickyProgress, [0, 0.3], [0, -50]);

  const q2Op = useTransform(stickyProgress, [0.35, 0.55, 0.65], [0, 1, 0]);
  const q2Y = useTransform(stickyProgress, [0.35, 0.55, 0.65], [50, 0, -50]);

  const q3Op = useTransform(stickyProgress, [0.7, 0.9, 1], [0, 1, 1]);
  const q3Y = useTransform(stickyProgress, [0.7, 0.9, 1], [50, 0, 0]);

  return (
    <div className="research-page">
      
      {/* 1. Hero */}
      <section className="research-hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
          <h1 className="research-hero-headline">Exploring the future<br/>of intelligence.</h1>
          <p className="research-subheadline">The foundations of artificial cognition.</p>
        </motion.div>
      </section>

      {/* 2. Focused 400vh Sticky Questions */}
      <div ref={stickyRef} className="research-sticky-container">
        <div className="research-sticky-content">
          <motion.h1 className="research-massive-word" style={{ opacity: q1Op, y: q1Y }}>Can intelligence remember?</motion.h1>
          <motion.h1 className="research-massive-word" style={{ opacity: q2Op, y: q2Y }}>Can intelligence understand?</motion.h1>
          <motion.h1 className="research-massive-word" style={{ opacity: q3Op, y: q3Y }}>Can intelligence evolve?</motion.h1>
        </div>
      </div>

      {/* 3. Bold Statement */}
      <section className="research-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="research-statement">Without memory,</h2>
          <h2 className="research-statement" style={{ marginTop: "24px", color: "#86868b" }}>understanding disappears.</h2>
        </motion.div>
      </section>

      {/* 4. Rhythmic Sequences (Smoothed Bridge) */}
      <section className="research-chapter-left">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="research-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Understanding context.</h2>
          <h2 className="research-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Understanding intent.</h2>
          <h2 className="research-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Understanding decisions.</h2>
          <h2 className="research-statement">Understanding people.</h2>
        </motion.div>
      </section>

      {/* 5. Pure Conviction Statement (Expanded Buildup) */}
      <section className="research-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="research-statement-secondary" style={{ marginBottom: "24px" }}>The future of intelligence will not be universal.</h2>
          <h2 className="research-statement">It will be personal.</h2>
        </motion.div>
      </section>

      {/* 6. Narrative Progression (Replaces Vocabulary List) */}
      <section className="research-chapter-left">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="research-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Memory leads to understanding.</h2>
          <h2 className="research-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Understanding enables learning.</h2>
          <h2 className="research-statement">Learning creates intelligence.</h2>
        </motion.div>
      </section>

      {/* 7. Preserved Best Chapter */}
      <section className="research-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="research-statement-secondary" style={{ marginBottom: "24px" }}>Great products answer problems.</h2>
          <h2 className="research-statement">Research discovers new possibilities.</h2>
        </motion.div>
      </section>

      {/* 8. Genuine Research Uncertainty (New) */}
      <section className="research-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="research-statement-secondary" style={{ marginBottom: "24px", color: "#86868b" }}>We don't have every answer.</h2>
          <h2 className="research-statement">That's why research matters.</h2>
        </motion.div>
      </section>

      {/* 9. Signature Research Convergence (Maximized size, no arrows) */}
      <section className="research-convergence-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ textAlign: "center", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <div style={{ marginBottom: "80px" }}>
            <h3 className="research-statement-secondary" style={{ marginBottom: "24px", color: "rgba(255,255,255,0.4)" }}>Documents</h3>
            <h3 className="research-statement-secondary" style={{ marginBottom: "24px", color: "rgba(255,255,255,0.4)" }}>Research</h3>
            <h3 className="research-statement-secondary" style={{ marginBottom: "24px", color: "rgba(255,255,255,0.4)" }}>Projects</h3>
            <h3 className="research-statement-secondary" style={{ marginBottom: "24px", color: "rgba(255,255,255,0.4)" }}>Ideas</h3>
            <h3 className="research-statement-secondary" style={{ marginBottom: "24px", color: "rgba(255,255,255,0.4)" }}>Notes</h3>
            <h3 className="research-statement-secondary" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "80px" }}>Learning</h3>
          </div>

          {/* MONUMENTAL FINAL WORD */}
          <h1 className="research-convergence-title">UNDERSTANDING</h1>

        </motion.div>
      </section>

      {/* 10. The Monumental Finale */}
      <section className="research-finale-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <motion.img 
            src={auraosHomeOrb} 
            alt="AuraOS Orb" 
            style={{ width: "240px", height: "240px", borderRadius: "50%", marginBottom: "60px" }}
            animate={{ 
              scale: [1, 1.03, 1],
              y: [0, -8, 0]
            }}
            transition={{ 
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <h2 className="research-statement-secondary" style={{ marginBottom: "24px", color: "#86868b" }}>The future is not more information.</h2>
          <h2 className="research-statement" style={{ marginBottom: "24px" }}>The future is understanding.</h2>
          <h2 className="research-statement-secondary" style={{ color: "#86868b" }}>The next chapter of intelligence hasn't been written yet.</h2>
          
          <Link to="/chat" className="research-btn-primary">Launch AuraOS</Link>

        </motion.div>
      </section>

    </div>
  );
}
