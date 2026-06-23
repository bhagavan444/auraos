import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Privacy.css";

const EASE = [0.16, 1, 0.3, 1];

export default function Privacy() {
  const whyRef = useRef(null);
  const flowRef = useRef(null);
  const layerRef = useRef(null);
  
  // Chapter 2 Scroll Sequence (Why Privacy Matters)
  const { scrollYProgress: whyScroll } = useScroll({ target: whyRef, offset: ["start start", "end end"] });
  const w1O = useTransform(whyScroll, [0, 0.15, 0.25], [0, 1, 0]);
  const w2O = useTransform(whyScroll, [0.25, 0.4, 0.5], [0, 1, 0]);
  const w3O = useTransform(whyScroll, [0.5, 0.65, 0.75], [0, 1, 0]);
  const w4O = useTransform(whyScroll, [0.75, 0.9, 1], [0, 1, 1]);

  // Chapter 4 Flowing Abstraction
  const { scrollYProgress: flowScroll } = useScroll({ target: flowRef, offset: ["start end", "end start"] });
  // Words flow toward the orb from different angles.
  const fX1 = useTransform(flowScroll, [0.2, 0.6], [-400, -120]);
  const fY1 = useTransform(flowScroll, [0.2, 0.6], [-200, -80]);
  
  const fX2 = useTransform(flowScroll, [0.2, 0.6], [400, 120]);
  const fY2 = useTransform(flowScroll, [0.2, 0.6], [-150, -60]);

  const fX3 = useTransform(flowScroll, [0.2, 0.6], [-300, -100]);
  const fY3 = useTransform(flowScroll, [0.2, 0.6], [200, 80]);

  const fX4 = useTransform(flowScroll, [0.2, 0.6], [350, 100]);
  const fY4 = useTransform(flowScroll, [0.2, 0.6], [250, 100]);

  const fX5 = useTransform(flowScroll, [0.2, 0.6], [0, 0]);
  const fY5 = useTransform(flowScroll, [0.2, 0.6], [-300, -120]);

  const fOp = useTransform(flowScroll, [0.2, 0.4, 0.8], [0, 1, 1]);

  // Chapter 8 Transparency Layers
  const { scrollYProgress: layerScroll } = useScroll({ target: layerRef, offset: ["start center", "end center"] });
  const lY1 = useTransform(layerScroll, [0, 1], [-50, 50]);
  const lY2 = useTransform(layerScroll, [0, 1], [0, 0]);
  const lY3 = useTransform(layerScroll, [0, 1], [50, -50]);

  return (
    <div className="privacy-page">
      
      {/* CHAPTER 1: Hero */}
      <section className="privacy-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <div className="privacy-label">PRIVACY</div>
          <h1 className="privacy-headline-massive">Built around intelligence.<br/>Built around trust.</h1>
          <p className="privacy-subtitle" style={{ maxWidth: "800px", margin: "24px auto 0" }}>
            AuraOS is designed to understand your information without compromising your control.
          </p>
          
          <motion.div 
            className="privacy-orb"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* CHAPTER 2: Why Privacy Matters */}
      <section className="privacy-sticky-container" ref={whyRef} style={{ height: "400vh" }}>
        <div className="privacy-sticky-content">
          <motion.h2 className="privacy-headline-massive" style={{ position: "absolute", opacity: w1O }}>Understanding requires context.</motion.h2>
          <motion.h2 className="privacy-headline-massive" style={{ position: "absolute", opacity: w2O }}>Context requires memory.</motion.h2>
          <motion.h2 className="privacy-headline-massive" style={{ position: "absolute", opacity: w3O }}>Memory requires trust.</motion.h2>
          <motion.h2 className="privacy-headline-massive" style={{ position: "absolute", opacity: w4O }}>Trust requires privacy.</motion.h2>
        </div>
      </section>

      {/* CHAPTER 3: Your Information */}
      <section className="privacy-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <h2 className="privacy-headline-massive" style={{ color: "#1d1d1f" }}>Your information belongs to you.</h2>
          <motion.h2 
            className="privacy-headline-massive" 
            style={{ marginTop: "40px", color: "#6e6e73" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.5 }}
          >
            Not to AuraOS.
          </motion.h2>
          <motion.h2 
            className="privacy-headline-massive" 
            style={{ marginTop: "40px", color: "#6e6e73" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 3, duration: 1.5 }}
          >
            Not to advertisers.
          </motion.h2>
          <motion.h2 
            className="privacy-headline-massive" 
            style={{ marginTop: "40px", color: "#6e6e73" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 4.5, duration: 1.5 }}
          >
            Not to third parties.
          </motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 4: Privacy By Design */}
      <section className="privacy-section" ref={flowRef}>
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
          style={{ width: "100%" }}
        >
          <h2 className="privacy-headline-massive">Privacy is foundational.</h2>
          <h2 className="privacy-headline-massive" style={{ color: "#6e6e73", marginTop: "16px" }}>Not optional.</h2>

          <div className="privacy-flow-container">
            <motion.div className="privacy-orb" style={{ position: "absolute", top: "50%", left: "50%", x: "-50%", y: "-50%", margin: 0, width: "120px", height: "120px" }} />
            
            <motion.div className="privacy-flow-word" style={{ x: fX1, y: fY1, opacity: fOp }}>Conversations</motion.div>
            <motion.div className="privacy-flow-word" style={{ x: fX2, y: fY2, opacity: fOp }}>Documents</motion.div>
            <motion.div className="privacy-flow-word" style={{ x: fX3, y: fY3, opacity: fOp }}>Projects</motion.div>
            <motion.div className="privacy-flow-word" style={{ x: fX4, y: fY4, opacity: fOp }}>Research</motion.div>
            <motion.div className="privacy-flow-word" style={{ x: fX5, y: fY5, opacity: fOp }}>Memories</motion.div>
          </div>
        </motion.div>
      </section>

      {/* CHAPTER 5: Control */}
      <section className="privacy-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <h2 className="privacy-headline-large" style={{ color: "#1d1d1f" }}>You decide what AuraOS remembers.</h2>
          <motion.h2 
            className="privacy-headline-large" 
            style={{ marginTop: "40px", color: "#6e6e73" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 1.5 }}
          >
            You decide what AuraOS forgets.
          </motion.h2>
          <motion.h2 
            className="privacy-headline-large" 
            style={{ marginTop: "40px", color: "#6e6e73" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2, duration: 1.5 }}
          >
            You decide what AuraOS understands.
          </motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 6: Identity (Updated to narrative progression) */}
      <section className="privacy-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <h2 className="privacy-headline-massive">Intelligence begins<br/>with identity.</h2>
          
          <div style={{ marginTop: "80px" }}>
            <motion.h2 className="privacy-headline-large" style={{ color: "#6e6e73" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 1.5 }}>Identity creates continuity.</motion.h2>
            <motion.h2 className="privacy-headline-large" style={{ color: "#6e6e73", marginTop: "24px" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.5 }}>Continuity creates understanding.</motion.h2>
            <motion.h2 className="privacy-headline-large" style={{ color: "#1d1d1f", marginTop: "40px" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2, duration: 1.5 }}>Understanding remains personal.</motion.h2>
          </div>
        </motion.div>
      </section>

      {/* CHAPTER 7: Personal Intelligence Needs Personal Privacy */}
      <section className="privacy-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <h2 className="privacy-headline-massive">The more personal<br/>intelligence becomes,</h2>
          <h2 className="privacy-headline-massive" style={{ marginTop: "40px", color: "#6e6e73" }}>the more personal<br/>privacy must become.</h2>
        </motion.div>
      </section>

      {/* CHAPTER 8: Transparency */}
      <section className="privacy-section" ref={layerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: EASE }}
          style={{ width: "100%" }}
        >
          <h2 className="privacy-headline-massive">No hidden intelligence.</h2>
          <p className="privacy-subtitle" style={{ maxWidth: "800px", margin: "24px auto 0" }}>
            AuraOS is designed to make memory, knowledge, and context understandable and controllable.
          </p>
 
          <div className="privacy-layer-container">
            <motion.div className="privacy-layer-word" style={{ y: lY1, zIndex: 3 }}>Memory</motion.div>
            <motion.div className="privacy-layer-word" style={{ y: lY2, zIndex: 2 }}>Knowledge</motion.div>
            <motion.div className="privacy-layer-word" style={{ y: lY3, zIndex: 1 }}>Context</motion.div>
          </div>
        </motion.div>
      </section>

      {/* CHAPTER 9: Privacy Should Disappear */}
      <section className="privacy-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <h2 className="privacy-headline-massive" style={{ color: "#6e6e73" }}>The more AuraOS understands,</h2>
          <motion.h2 
            className="privacy-headline-massive" 
            style={{ marginTop: "24px", color: "#6e6e73" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.5 }}
          >
            the less you should have to worry.
          </motion.h2>
          <motion.h2 
            className="privacy-headline-massive" 
            style={{ marginTop: "60px", color: "#1d1d1f" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 3, duration: 1.5 }}
          >
            Privacy should disappear<br/>into the experience.
          </motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 10: Security Without Complexity */}
      <section className="privacy-section" style={{ minHeight: "80vh" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <h2 className="privacy-headline-massive">Security should feel invisible.</h2>
          <h2 className="privacy-headline-large" style={{ color: "#6e6e73", marginTop: "40px" }}>Not complicated.</h2>
          <h2 className="privacy-headline-large" style={{ color: "#6e6e73", marginTop: "24px" }}>Not intimidating.</h2>
          <h2 className="privacy-headline-large" style={{ color: "#1d1d1f", marginTop: "24px" }}>Simply trusted.</h2>
        </motion.div>
      </section>

      {/* CHAPTER 11: Philosophy */}
      <section className="privacy-section" style={{ minHeight: "80vh" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <h2 className="privacy-headline-massive" style={{ color: "#6e6e73" }}>Technology should earn trust.</h2>
          <motion.h2 
            className="privacy-headline-massive" 
            style={{ marginTop: "40px", color: "#1d1d1f" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.5 }}
          >
            Not request it.
          </motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 12: Missing Emotional Human Moment (New) */}
      <section className="privacy-section" style={{ minHeight: "80vh" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <h2 className="privacy-headline-large">People should not have to choose</h2>
          <h2 className="privacy-headline-large" style={{ color: "#6e6e73", marginTop: "24px" }}>between intelligence</h2>
          <h2 className="privacy-headline-large" style={{ color: "#6e6e73", marginTop: "24px" }}>and privacy.</h2>
        </motion.div>
      </section>

      {/* CHAPTER 13: Future of Privacy */}
      <section className="privacy-section" style={{ minHeight: "80vh" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <h2 className="privacy-headline-large" style={{ color: "#6e6e73" }}>The future of AI needs privacy.</h2>
          <h2 className="privacy-headline-large" style={{ color: "#6e6e73", marginTop: "40px" }}>The future of intelligence needs ownership.</h2>
          <h2 className="privacy-headline-massive" style={{ color: "#1d1d1f", marginTop: "60px" }}>The future of understanding needs trust.</h2>
        </motion.div>
      </section>

      {/* CHAPTER 14: Final Reveal */}
      <section className="privacy-section" style={{ minHeight: "90vh" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: EASE }}
        >
          <h2 className="privacy-headline-large" style={{ color: "#6e6e73" }}>Understanding requires trust.</h2>
          <h2 className="privacy-headline-large" style={{ color: "#6e6e73", marginTop: "24px" }}>Trust requires privacy.</h2>
          
          <div style={{ marginTop: "80px", marginBottom: "80px" }}>
            <h1 className="privacy-headline-massive" style={{ letterSpacing: "-0.05em" }}>AuraOS</h1>
            <h1 className="privacy-headline-massive" style={{ letterSpacing: "-0.05em", color: "#6e6e73", marginTop: "16px" }}>Private by design.</h1>
            <h1 className="privacy-headline-massive" style={{ letterSpacing: "-0.05em", color: "#6e6e73", marginTop: "16px" }}>Intelligent by nature.</h1>
          </div>
          
          <Link to="/chat" className="privacy-btn">
            Launch AuraOS
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
