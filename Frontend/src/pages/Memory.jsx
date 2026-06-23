import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Memory.css";

const EASE = [0.16, 1, 0.3, 1];

export default function Memory() {
  const problemRef = useRef(null);
  const { scrollYProgress: problemProgress } = useScroll({
    target: problemRef,
    offset: ["start start", "end end"]
  });

  // 400vh Sticky Scroll Sequences
  const text1Opacity = useTransform(problemProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const text1Y = useTransform(problemProgress, [0, 0.25], [0, -50]);

  const text2Opacity = useTransform(problemProgress, [0.25, 0.4, 0.5], [0, 1, 0]);
  const text2Y = useTransform(problemProgress, [0.25, 0.4, 0.5], [50, 0, -50]);

  const text3Opacity = useTransform(problemProgress, [0.5, 0.65, 0.75], [0, 1, 0]);
  const text3Y = useTransform(problemProgress, [0.5, 0.65, 0.75], [50, 0, -50]);

  const text4Opacity = useTransform(problemProgress, [0.75, 0.9, 1], [0, 1, 1]);
  const text4Y = useTransform(problemProgress, [0.75, 0.9, 1], [50, 0, 0]);

  return (
    <div className="memory-page">
      
      {/* 1. Hero */}
      <section className="memory-hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
          <h1 className="memory-hero-headline">Memory.</h1>
          <p className="memory-subheadline">Intelligence without continuity is just search.</p>
        </motion.div>
      </section>

      {/* 2. 400vh Sticky Problem Scroll */}
      <div ref={problemRef} className="memory-sticky-container">
        <div className="memory-sticky-content">
          <motion.div style={{ opacity: text1Opacity, y: text1Y, position: "absolute" }}>
            <h2 className="memory-statement">Every day, you start over.</h2>
          </motion.div>
          <motion.div style={{ opacity: text2Opacity, y: text2Y, position: "absolute" }}>
            <h2 className="memory-statement">Blank slates.</h2>
            <h2 className="memory-statement-secondary">No context. No history.</h2>
          </motion.div>
          <motion.div style={{ opacity: text3Opacity, y: text3Y, position: "absolute" }}>
            <h2 className="memory-statement">You repeat yourself.</h2>
          </motion.div>
          <motion.div style={{ opacity: text4Opacity, y: text4Y, position: "absolute" }}>
            <h2 className="memory-statement">Intelligence shouldn't have amnesia.</h2>
          </motion.div>
        </div>
      </div>

      {/* 3. The 100vh Pillars */}
      <section className="memory-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="memory-section-headline">AuraOS remembers.</h2>
        </motion.div>
      </section>

      <section className="memory-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="memory-section-headline">AuraOS connects.</h2>
        </motion.div>
      </section>

      <section className="memory-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="memory-section-headline">AuraOS continues.</h2>
        </motion.div>
      </section>

      {/* 4. Narrative Context (Replaces Feature List) */}
      <section className="memory-chapter-left">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="memory-statement" style={{ marginBottom: "60px" }}>What matters to you.</h2>
          <h3 className="memory-statement-secondary" style={{ marginBottom: "24px" }}>The projects you're building.</h3>
          <h3 className="memory-statement-secondary" style={{ marginBottom: "24px" }}>The ideas you're exploring.</h3>
          <h3 className="memory-statement-secondary" style={{ marginBottom: "24px" }}>The decisions you've already made.</h3>
          <h3 className="memory-statement-secondary">The context you shouldn't lose.</h3>
        </motion.div>
      </section>

      {/* 5. The "Wow" Centerpiece (Day 1 / 10 / 100) */}
      <section className="memory-day-sequence">
        <motion.div className="memory-day-item" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <div className="memory-day-label">Day 1</div>
          <h2 className="memory-section-headline">AuraOS learns.</h2>
        </motion.div>

        <motion.div className="memory-day-item" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <div className="memory-day-label">Day 10</div>
          <h2 className="memory-section-headline">AuraOS remembers.</h2>
        </motion.div>

        <motion.div className="memory-day-item" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <div className="memory-day-label">Day 100</div>
          <h2 className="memory-section-headline">AuraOS understands.</h2>
        </motion.div>
      </section>

      {/* 6. Daily Flow Emotion */}
      <section className="memory-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ width: "100%", textAlign: "left" }}>
          <h3 className="memory-statement-secondary" style={{ marginBottom: "16px", color: "#1d1d1f" }}>Morning.</h3>
          <h2 className="memory-statement" style={{ marginBottom: "80px", color: "#6e6e73" }}>AuraOS remembers what you learned.</h2>

          <h3 className="memory-statement-secondary" style={{ marginBottom: "16px", color: "#1d1d1f" }}>Afternoon.</h3>
          <h2 className="memory-statement" style={{ marginBottom: "80px", color: "#6e6e73" }}>AuraOS remembers what mattered.</h2>

          <h3 className="memory-statement-secondary" style={{ marginBottom: "16px", color: "#1d1d1f" }}>Evening.</h3>
          <h2 className="memory-statement" style={{ color: "#6e6e73" }}>AuraOS remembers where you left off.</h2>
        </motion.div>
      </section>

      {/* 7. AuraOS Specific Examples */}
      <section className="memory-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h3 className="memory-statement-secondary" style={{ marginBottom: "24px" }}>You discussed a research paper last week.</h3>
          <h3 className="memory-statement-secondary" style={{ marginBottom: "24px" }}>You updated your architecture yesterday.</h3>
          <h3 className="memory-statement-secondary" style={{ marginBottom: "80px" }}>You refined your roadmap this morning.</h3>
          <h2 className="memory-statement">AuraOS remembers all of it.</h2>
        </motion.div>
      </section>

      {/* 8. Finale */}
      <section className="memory-finale-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="memory-statement" style={{ marginBottom: "24px" }}>Memory is not storage.</h2>
          <h2 className="memory-statement" style={{ marginBottom: "80px" }}>Memory is continuity.</h2>
          
          <h3 className="memory-statement-secondary" style={{ marginBottom: "16px" }}>AuraOS remembers</h3>
          <h3 className="memory-statement-secondary">so you don't have to start over.</h3>

          <Link to="/chat" className="memory-btn-primary">Launch AuraOS</Link>
        </motion.div>
      </section>

    </div>
  );
}
