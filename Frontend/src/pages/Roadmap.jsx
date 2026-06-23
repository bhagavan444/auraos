import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Roadmap.css";
import auraosHomeOrb from "../assets/auraos_home_orb.png";

const EASE = [0.16, 1, 0.3, 1];

export default function Roadmap() {
  const stickyRef = useRef(null);

  const { scrollYProgress: stickyProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"]
  });

  // Sticky Words 400vh Sequence: Remembers -> Learns -> Adapts -> Improves
  const w1Op = useTransform(stickyProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const w2Op = useTransform(stickyProgress, [0.2, 0.35, 0.5], [0, 1, 0]);
  const w3Op = useTransform(stickyProgress, [0.45, 0.6, 0.75], [0, 1, 0]);
  const w4Op = useTransform(stickyProgress, [0.7, 0.85, 1], [0, 1, 1]);

  // Premium, subtle scale transition
  const scaleTransform = useTransform(stickyProgress, [0, 1], [0.95, 1.05]);

  return (
    <div className="roadmap-page">
      
      {/* 1. Hero */}
      <section className="roadmap-hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
          <h1 className="roadmap-hero-headline">The next era<br/>of intelligence.</h1>
          <p className="roadmap-subheadline">The inevitability of personal intelligence.</p>
        </motion.div>
      </section>

      {/* 2. Apple Vision (Chapter 2) */}
      <section className="roadmap-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement">AuraOS is not a feature.</h2>
          <h2 className="roadmap-statement" style={{ marginTop: "24px", color: "#86868b" }}>It is a destination.</h2>
        </motion.div>
      </section>

      {/* 3. Cinematic "Today" Sequence (Chapter 3) */}
      <section className="roadmap-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement" style={{ color: "#86868b" }}>Today, AuraOS remembers.</h2>
        </motion.div>
      </section>

      <section className="roadmap-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement" style={{ color: "#86868b" }}>Today, AuraOS understands.</h2>
        </motion.div>
      </section>

      <section className="roadmap-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement" style={{ color: "#86868b" }}>Today, AuraOS reasons.</h2>
        </motion.div>
      </section>

      <section className="roadmap-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement">Today, AuraOS adapts.</h2>
        </motion.div>
      </section>

      {/* 4. Fullscreen Evolution (Chapter 4) */}
      <section className="roadmap-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement" style={{ color: "#86868b" }}>First came answers.</h2>
        </motion.div>
      </section>

      <section className="roadmap-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement" style={{ color: "#86868b" }}>Then memory.</h2>
        </motion.div>
      </section>

      <section className="roadmap-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement" style={{ color: "#86868b" }}>Then understanding.</h2>
        </motion.div>
      </section>

      <section className="roadmap-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement">Next comes intelligence.</h2>
        </motion.div>
      </section>

      {/* 5. 400vh Sticky Word Sequence (Chapter 5) */}
      <div ref={stickyRef} className="roadmap-sticky-container">
        <div className="roadmap-sticky-content">
          <motion.h1 className="roadmap-massive-word" style={{ opacity: w1Op, scale: scaleTransform }}>Remembers.</motion.h1>
          <motion.h1 className="roadmap-massive-word" style={{ opacity: w2Op, scale: scaleTransform }}>Learns.</motion.h1>
          <motion.h1 className="roadmap-massive-word" style={{ opacity: w3Op, scale: scaleTransform }}>Adapts.</motion.h1>
          <motion.h1 className="roadmap-massive-word" style={{ opacity: w4Op, scale: scaleTransform }}>Improves.</motion.h1>
        </div>
      </div>

      {/* 6. Compressed Personal Chapter (No Arrows) */}
      <section className="roadmap-stack-sequence">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ textAlign: "center" }}>
          <h3 className="roadmap-statement-secondary" style={{ marginBottom: "24px" }}>Memory.</h3>
          <h3 className="roadmap-statement-secondary" style={{ marginBottom: "24px" }}>Knowledge.</h3>
          <h3 className="roadmap-statement-secondary" style={{ marginBottom: "120px" }}>Understanding.</h3>
          <h2 className="roadmap-statement">Intelligence.</h2>
        </motion.div>
      </section>

      {/* 7. Human Outcomes */}
      <section className="roadmap-chapter-left">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Understands goals.</h2>
          <h2 className="roadmap-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Learns preferences.</h2>
          <h2 className="roadmap-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Remembers decisions.</h2>
          <h2 className="roadmap-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Adapts workflows.</h2>
          <h2 className="roadmap-statement">Works alongside you.</h2>
        </motion.div>
      </section>

      {/* 8. Chapter 8 */}
      <section className="roadmap-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement-secondary" style={{ marginBottom: "24px" }}>Intelligence should not live inside a chat window.</h2>
          <h2 className="roadmap-statement">It should exist everywhere.</h2>
        </motion.div>
      </section>

      {/* 9. The Massive WWDC Moment (New) */}
      <section className="roadmap-wwdc-moment">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h1 className="roadmap-wwdc-statement">Understanding should be built into everything.</h1>
        </motion.div>
      </section>

      {/* 10. Convergence (Removed Automation) */}
      <section className="roadmap-convergence-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ textAlign: "center", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <div style={{ marginBottom: "80px" }}>
            <h3 className="roadmap-statement-secondary" style={{ marginBottom: "16px", color: "rgba(255,255,255,0.4)" }}>Memory</h3>
            <h3 className="roadmap-statement-secondary" style={{ marginBottom: "16px", color: "rgba(255,255,255,0.4)" }}>Knowledge</h3>
            <h3 className="roadmap-statement-secondary" style={{ marginBottom: "16px", color: "rgba(255,255,255,0.4)" }}>Reasoning</h3>
            <h3 className="roadmap-statement-secondary" style={{ marginBottom: "16px", color: "rgba(255,255,255,0.4)" }}>Context</h3>
            <h3 className="roadmap-statement-secondary" style={{ marginBottom: "16px", color: "rgba(255,255,255,0.4)" }}>Learning</h3>
            <h3 className="roadmap-statement-secondary" style={{ color: "rgba(255,255,255,0.4)" }}>Intent</h3>
          </div>

          <h1 className="roadmap-convergence-title">AuraOS<br/>Intelligence</h1>

        </motion.div>
      </section>

      {/* 11. The Missing "Why" */}
      <section className="roadmap-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement-secondary" style={{ marginBottom: "24px" }}>Technology adapts to people.</h2>
          <h2 className="roadmap-statement">Not people adapting to technology.</h2>
        </motion.div>
      </section>

      {/* 12. Final Destination Statement (New) */}
      <section className="roadmap-destination-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="roadmap-statement" style={{ marginBottom: "40px" }}>A personal intelligence operating system.</h2>
          <h2 className="roadmap-statement-secondary" style={{ color: "#86868b", marginBottom: "16px" }}>For every conversation.</h2>
          <h2 className="roadmap-statement-secondary" style={{ color: "#86868b", marginBottom: "16px" }}>For every document.</h2>
          <h2 className="roadmap-statement-secondary" style={{ color: "#86868b" }}>For every decision.</h2>
        </motion.div>
      </section>

      {/* 13. Monumental Finale */}
      <section className="roadmap-finale-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <motion.img 
            src={auraosHomeOrb} 
            alt="AuraOS Orb" 
            style={{ width: "160px", height: "160px", borderRadius: "50%", marginBottom: "60px" }}
            animate={{ 
              scale: [1, 1.03, 1],
              y: [0, -8, 0]
            }}
            transition={{ 
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <h2 className="roadmap-statement" style={{ marginBottom: "24px" }}>A new era of intelligence.</h2>
          <h2 className="roadmap-statement-secondary" style={{ color: "#86868b" }}>Built around people.</h2>
          
          <Link to="/chat" className="roadmap-btn-primary">Launch AuraOS</Link>

        </motion.div>
      </section>

    </div>
  );
}
