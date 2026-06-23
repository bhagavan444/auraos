import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Demo.css";
import auraosDemoWorkspaceUI from "../assets/auraos_demo_workspace_ui.png";
import auraosHomeOrb from "../assets/auraos_home_orb.png";

const EASE = [0.16, 1, 0.3, 1];

export default function Demo() {
  const journeyRef = useRef(null);
  const stickyRef = useRef(null);

  const { scrollYProgress: journeyProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: stickyProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"]
  });

  // Journey 500vh Sequence: Upload -> Reads -> Remembers -> Connects -> Understands -> Meaning emerges
  const text1Op = useTransform(journeyProgress, [0, 0.1, 0.18], [1, 1, 0]);
  const text1Y = useTransform(journeyProgress, [0, 0.1, 0.18], [0, 0, -50]);

  const text2Op = useTransform(journeyProgress, [0.2, 0.25, 0.38], [0, 1, 0]);
  const text2Y = useTransform(journeyProgress, [0.2, 0.25, 0.38], [50, 0, -50]);

  const text3Op = useTransform(journeyProgress, [0.4, 0.45, 0.58], [0, 1, 0]);
  const text3Y = useTransform(journeyProgress, [0.4, 0.45, 0.58], [50, 0, -50]);

  const text4Op = useTransform(journeyProgress, [0.6, 0.65, 0.78], [0, 1, 0]);
  const text4Y = useTransform(journeyProgress, [0.6, 0.65, 0.78], [50, 0, -50]);

  const text5Op = useTransform(journeyProgress, [0.8, 0.85, 1], [0, 1, 1]);
  const text5Y = useTransform(journeyProgress, [0.8, 0.85, 1], [50, 0, 0]);

  // Sticky Words 500vh Sequence: Learns -> Remembers -> Understands -> Reasons -> Adapts
  const w1Op = useTransform(stickyProgress, [0, 0.1, 0.18], [1, 1, 0]);
  const w2Op = useTransform(stickyProgress, [0.2, 0.3, 0.38], [0, 1, 0]);
  const w3Op = useTransform(stickyProgress, [0.4, 0.5, 0.58], [0, 1, 0]);
  const w4Op = useTransform(stickyProgress, [0.6, 0.7, 0.78], [0, 1, 0]);
  const w5Op = useTransform(stickyProgress, [0.8, 0.9, 1], [0, 1, 1]);

  // Subdued subtle scaling for sticky sequence (0.95 -> 1.05)
  const scaleTransform = useTransform(stickyProgress, [0, 1], [0.95, 1.05]);

  return (
    <div className="demo-page">
      
      {/* 1. Hero */}
      <section className="demo-hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
          <h1 className="demo-hero-headline">Experience understanding.</h1>
          <p className="demo-subheadline">The personal intelligence system.</p>
        </motion.div>
      </section>

      {/* 2. The 500vh Cinematic Product Story (Moved before the UI reveal) */}
      <div ref={journeyRef} className="demo-journey-container">
        <div className="demo-journey-content">
          <motion.div style={{ opacity: text1Op, y: text1Y, position: "absolute" }}>
            <h2 className="demo-statement">Upload document.</h2>
          </motion.div>
          <motion.div style={{ opacity: text2Op, y: text2Y, position: "absolute" }}>
            <h2 className="demo-statement">AuraOS reads.</h2>
          </motion.div>
          <motion.div style={{ opacity: text3Op, y: text3Y, position: "absolute" }}>
            <h2 className="demo-statement">AuraOS remembers.</h2>
          </motion.div>
          <motion.div style={{ opacity: text4Op, y: text4Y, position: "absolute" }}>
            <h2 className="demo-statement">AuraOS connects.</h2>
          </motion.div>
          <motion.div style={{ opacity: text5Op, y: text5Y, position: "absolute" }}>
            <h2 className="demo-statement">AuraOS understands.</h2>
            <h2 className="demo-statement-secondary" style={{ marginTop: "24px", color: "#86868b" }}>Meaning emerges.</h2>
          </motion.div>
        </div>
      </div>

      {/* 3. Transition Statement */}
      <section className="demo-chapter">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="demo-statement-secondary" style={{ color: "#86868b" }}>Here's what that looks like.</h2>
        </motion.div>
      </section>

      {/* 4. Massive Workspace Reveal (Moved after anticipation) */}
      <section className="demo-workspace-showcase">
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div className="demo-screenshot-container">
            <img src={auraosDemoWorkspaceUI} alt="AuraOS Workspace UI" className="demo-screenshot-img" />
          </div>
        </motion.div>
      </section>

      {/* 5. Concrete Real-World Interaction Sequence */}
      <section className="demo-real-flow-section">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h2 className="demo-statement-secondary" style={{ marginBottom: "24px", color: "#86868b" }}>User uploads resume.</h2>
          <h2 className="demo-statement-secondary" style={{ marginBottom: "24px", color: "#86868b" }}>AuraOS analyzes skills.</h2>
          <h2 className="demo-statement-secondary" style={{ marginBottom: "24px", color: "#86868b" }}>AuraOS identifies gaps.</h2>
          <h2 className="demo-statement">AuraOS recommends next steps.</h2>
        </motion.div>
      </section>

      {/* 6. Memory Retention Chapter (Preserved) */}
      <section className="demo-chapter-left">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: EASE }}>
          <h3 className="demo-statement-secondary" style={{ marginBottom: "24px" }}>Yesterday.</h3>
          <h3 className="demo-statement-secondary" style={{ marginBottom: "24px" }}>Last month.</h3>
          <h3 className="demo-statement-secondary" style={{ marginBottom: "60px" }}>Last year.</h3>
          <h2 className="demo-statement">AuraOS continues the same understanding.</h2>
        </motion.div>
      </section>

      {/* 7. The 500vh Sticky Word Sequence */}
      <div ref={stickyRef} className="demo-sticky-container">
        <div className="demo-sticky-content">
          <motion.h1 className="demo-massive-word" style={{ opacity: w1Op, scale: scaleTransform }}>Learns.</motion.h1>
          <motion.h1 className="demo-massive-word" style={{ opacity: w2Op, scale: scaleTransform }}>Remembers.</motion.h1>
          <motion.h1 className="demo-massive-word" style={{ opacity: w3Op, scale: scaleTransform }}>Understands.</motion.h1>
          <motion.h1 className="demo-massive-word" style={{ opacity: w4Op, scale: scaleTransform }}>Reasons.</motion.h1>
          <motion.h1 className="demo-massive-word" style={{ opacity: w5Op, scale: scaleTransform }}>Adapts.</motion.h1>
        </div>
      </div>

      {/* 8. Monumental Finale */}
      <section className="demo-finale-section">
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
          
          <h2 className="demo-statement" style={{ color: "#ffffff", marginBottom: "24px" }}>Experience understanding.</h2>
          <h2 className="demo-statement-secondary" style={{ color: "#86868b" }}>Experience AuraOS.</h2>
          
          <div className="demo-buttons-container">
            <Link to="/chat" className="demo-btn-primary">Launch AuraOS</Link>
            <Link to="/chat" className="demo-btn-secondary">Watch Demo</Link>
          </div>

        </motion.div>
      </section>

    </div>
  );
}
