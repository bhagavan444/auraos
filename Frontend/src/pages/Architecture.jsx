import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import "./Architecture.css";
import auraosHomeOrb from "../assets/auraos_home_orb.png";

const EASE = [0.16, 1, 0.3, 1];

export default function Architecture() {
  const stickyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"]
  });

  // 300vh Sequence Timeline: 
  // 0.0 - 0.5: INTELLIGENCE massive word fades in and scales
  // 0.5 - 1.0: Sub-statement "designed as a system." fades in

  const intelOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 1, 1]);
  const intelScale = useTransform(scrollYProgress, [0, 0.6], [0.9, 1]);
  const subOpacity = useTransform(scrollYProgress, [0.5, 0.8, 1], [0, 1, 1]);

  return (
    <div className="architecture-page">
      
      {/* 1. Hero */}
      <section className="architecture-hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
          <h1 className="architecture-hero-headline">Understanding.</h1>
          <p className="architecture-subheadline">Designed into every layer.</p>
        </motion.div>
      </section>

      {/* 2. The 300vh Signature Sticky Sequence */}
      <div ref={stickyRef} className="architecture-sticky-container">
        <div className="architecture-sticky-content">
          <motion.h1 
            className="architecture-massive-word" 
            style={{ opacity: intelOpacity, scale: intelScale }}
          >
            INTELLIGENCE
          </motion.h1>
          <motion.h2 
            className="architecture-sticky-sub" 
            style={{ opacity: subOpacity }}
          >
            designed as a system.
          </motion.h2>
        </div>
      </div>

      {/* 3. Narrative System Flow (Replaces Engineering Diagram) */}
      <section className="architecture-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="architecture-statement">A question begins.</h2>
        </motion.div>
      </section>

      <section className="architecture-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="architecture-statement" style={{ color: "#86868b" }}>Memory provides context.</h2>
        </motion.div>
      </section>

      <section className="architecture-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="architecture-statement" style={{ color: "#86868b" }}>Knowledge provides meaning.</h2>
        </motion.div>
      </section>

      <section className="architecture-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="architecture-statement" style={{ color: "#86868b" }}>Reasoning provides direction.</h2>
        </motion.div>
      </section>

      <section className="architecture-chapter">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="architecture-statement">Understanding emerges.</h2>
        </motion.div>
      </section>

      {/* 4. Frozen Orbit Section (Calm Breathing) */}
      <section className="architecture-orbit-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="architecture-section-headline" style={{ color: "#ffffff", marginBottom: "40px" }}>The Core.</h2>
          
          <div className="architecture-orbit-container">
            {/* Frozen Path Rings */}
            <div className="architecture-orbit-ring ring-1"></div>
            <div className="architecture-orbit-ring ring-2"></div>
            <div className="architecture-orbit-ring ring-3"></div>
            <div className="architecture-orbit-ring ring-4"></div>

            {/* Stationary Labels */}
            <div className="architecture-orbit-label label-memory">Memory</div>
            <div className="architecture-orbit-label label-knowledge">Knowledge</div>
            <div className="architecture-orbit-label label-reasoning">Reasoning</div>
            <div className="architecture-orbit-label label-context">Context</div>

            {/* Breathing Orb */}
            <motion.img 
              src={auraosHomeOrb} 
              alt="AuraOS Core" 
              className="architecture-orbit-orb"
              animate={{ 
                scale: [1, 1.03, 1],
                y: [0, -8, 0]
              }}
              transition={{ 
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* 5. Simplified Equation (Narrative Stack) */}
      <section className="architecture-stack-sequence">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ textAlign: "center" }}>
          <h3 className="architecture-statement-secondary" style={{ marginBottom: "24px" }}>Memory</h3>
          <h3 className="architecture-statement-secondary" style={{ marginBottom: "24px" }}>Knowledge</h3>
          <h3 className="architecture-statement-secondary" style={{ marginBottom: "24px" }}>Reasoning</h3>
          <h3 className="architecture-statement-secondary" style={{ marginBottom: "60px" }}>Context</h3>
          <ArrowDown className="architecture-funnel-arrow" size={32} style={{ marginBottom: "60px", color: "#86868b", display: "inline-block" }} />
          <h2 className="architecture-statement">AuraOS</h2>
        </motion.div>
      </section>

      {/* 6. Clean Infrastructure Statement (Replaces SaaS list) */}
      <section className="architecture-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="architecture-statement-secondary">Built on a modern intelligence architecture.</h2>
        </motion.div>
      </section>

      {/* 7. Monumental Finale */}
      <section className="architecture-finale-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <motion.img 
            src={auraosHomeOrb} 
            alt="AuraOS Orb" 
            className="architecture-finale-orb"
            animate={{ 
              scale: [1, 1.03, 1],
              y: [0, -4, 0]
            }}
            transition={{ 
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <h2 className="architecture-statement" style={{ color: "#ffffff", marginBottom: "24px" }}>Understanding, by design.</h2>
          
          <Link to="/chat" className="architecture-btn-primary">Launch AuraOS</Link>

        </motion.div>
      </section>

    </div>
  );
}
