import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Intelligence.css";
import auraosIntelligenceShowcase from "../assets/auraos_intelligence_showcase.png";
import auraosHomeOrb from "../assets/auraos_home_orb.png";

const EASE = [0.16, 1, 0.3, 1];

export default function Intelligence() {
  const stickyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"]
  });

  // 300vh Sequence Timeline: 
  // 0.0 - 0.2: Memory fades in and out
  // 0.2 - 0.4: Knowledge fades in and out
  // 0.4 - 0.6: Reasoning fades in and out
  // 0.6 - 0.8: Context fades in and out
  // 0.8 - 1.0: INTELLIGENCE massive reveal

  const memOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 0]);
  const knowOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
  const reasOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const contOpacity = useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 1, 0]);
  
  const intelOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const intelScale = useTransform(scrollYProgress, [0.8, 1], [0.9, 1]);

  return (
    <div className="intelligence-page">
      
      {/* 1. Hero */}
      <section className="intelligence-hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
          <h1 className="intelligence-hero-headline">Intelligence.</h1>
          <p className="intelligence-subheadline">The leap from software to cognition.</p>
        </motion.div>
      </section>

      {/* 2. Expanded Timeline Sequence */}
      <section className="intelligence-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="intelligence-statement" style={{ color: "#86868b" }}>Software.</h2>
        </motion.div>
      </section>

      <section className="intelligence-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="intelligence-statement" style={{ color: "#86868b" }}>Then the internet.</h2>
        </motion.div>
      </section>

      <section className="intelligence-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="intelligence-statement" style={{ color: "#86868b" }}>Then mobile.</h2>
        </motion.div>
      </section>

      <section className="intelligence-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="intelligence-statement" style={{ color: "#86868b" }}>Then AI.</h2>
        </motion.div>
      </section>

      <section className="intelligence-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="intelligence-statement">Now, intelligence.</h2>
        </motion.div>
      </section>

      {/* 3. The 300vh Signature Sticky Sequence */}
      <div ref={stickyRef} className="intelligence-sticky-container">
        <div className="intelligence-sticky-content">
          <motion.div className="intelligence-pill-layer" style={{ opacity: memOpacity, y: -20 }}>Memory</motion.div>
          <motion.div className="intelligence-pill-layer" style={{ opacity: knowOpacity, y: -20 }}>Knowledge</motion.div>
          <motion.div className="intelligence-pill-layer" style={{ opacity: reasOpacity, y: -20 }}>Reasoning</motion.div>
          <motion.div className="intelligence-pill-layer" style={{ opacity: contOpacity, y: -20 }}>Context</motion.div>
          
          <motion.h1 
            className="intelligence-massive-word" 
            style={{ opacity: intelOpacity, scale: intelScale }}
          >
            INTELLIGENCE
          </motion.h1>
        </div>
      </div>

      {/* 4. Equation Rewrite */}
      <section className="intelligence-chapter-left">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h3 className="intelligence-statement-secondary" style={{ marginBottom: "24px" }}>Memory.</h3>
          <h3 className="intelligence-statement-secondary" style={{ marginBottom: "24px" }}>Knowledge.</h3>
          <h3 className="intelligence-statement-secondary" style={{ marginBottom: "24px" }}>Reasoning.</h3>
          <h3 className="intelligence-statement-secondary" style={{ marginBottom: "60px" }}>Context.</h3>
          <h2 className="intelligence-statement">Together, they become intelligence.</h2>
        </motion.div>
      </section>

      {/* 5. Edge-to-Edge Showcase Reveal (Replaces SaaS Grid) */}
      <section className="intelligence-showcase-section">
        <motion.img 
          src={auraosIntelligenceShowcase} 
          alt="AuraOS Intelligence Showcase" 
          className="intelligence-showcase-img"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 1.8, ease: EASE }}
        />
      </section>

      {/* 6. Refined Repeated Headlines */}
      <section className="intelligence-chapter-left">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="intelligence-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Your work.</h2>
          <h2 className="intelligence-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Your goals.</h2>
          <h2 className="intelligence-statement" style={{ marginBottom: "40px", color: "#86868b" }}>Your ideas.</h2>
          <h2 className="intelligence-statement">Your future.</h2>
        </motion.div>
      </section>

      {/* 7. Monumental Finale */}
      <section className="intelligence-finale-section">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <motion.img 
            src={auraosHomeOrb} 
            alt="AuraOS Orb" 
            className="intelligence-finale-orb"
            animate={{ 
              scale: [1, 1.03, 1],
              y: [0, -8, 0]
            }}
            transition={{ 
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <h1 className="intelligence-finale-text">AuraOS</h1>
          
          <Link to="/chat" className="intelligence-btn-primary">Launch AuraOS</Link>

        </motion.div>
      </section>

    </div>
  );
}
