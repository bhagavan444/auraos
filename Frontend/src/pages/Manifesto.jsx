import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Manifesto.css";

const EASE = [0.16, 1, 0.3, 1];

export default function Manifesto() {
  return (
    <div className="manifesto-page">
      
      {/* CHAPTER 1: Hero */}
      <section className="manifesto-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <div className="manifesto-label">MANIFESTO</div>
          <h1 className="manifesto-headline-massive">Technology should<br/>adapt to people.</h1>
          
          <motion.div 
            className="manifesto-orb"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* CHAPTER 2: The Problem */}
      <section className="manifesto-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="manifesto-headline-massive" style={{ color: "#6e6e73" }}>The world has more<br/>information than ever.</h2>
          <motion.h2 className="manifesto-headline-massive" style={{ marginTop: "80px", color: "#1d1d1f" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.5 }}>Understanding has<br/>never been harder.</motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 3: The Information Age */}
      <section className="manifesto-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="manifesto-headline-large" style={{ color: "#6e6e73" }}>We built systems to store information.</h2>
          <motion.h2 className="manifesto-headline-large" style={{ marginTop: "40px", color: "#6e6e73" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 1.5 }}>We built systems to search information.</motion.h2>
          <motion.h2 className="manifesto-headline-large" style={{ marginTop: "40px", color: "#6e6e73" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2, duration: 1.5 }}>We built systems to generate information.</motion.h2>
          <motion.h2 className="manifesto-headline-massive" style={{ marginTop: "80px", color: "#1d1d1f" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 3.5, duration: 1.5 }}>But understanding remains rare.</motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 4: The Human Problem */}
      <section className="manifesto-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="manifesto-headline-large" style={{ color: "#6e6e73" }}>People should not have to repeat themselves.</h2>
          <motion.h2 className="manifesto-headline-large" style={{ marginTop: "40px", color: "#6e6e73" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 1.5 }}>People should not lose context.</motion.h2>
          <motion.h2 className="manifesto-headline-massive" style={{ marginTop: "80px", color: "#1d1d1f" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.5, duration: 1.5 }}>People should not start<br/>over every day.</motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 5: Intelligence Should Adapt */}
      <section className="manifesto-section">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="manifesto-headline-massive" style={{ color: "#6e6e73" }}>People were never supposed<br/>to adapt to intelligence.</h2>
          <motion.h2 className="manifesto-headline-massive" style={{ marginTop: "80px", color: "#1d1d1f" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.5 }}>Intelligence was supposed<br/>to adapt to people.</motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 6: Context */}
      <section className="manifesto-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="manifesto-headline-massive">Context changes everything.</h2>
          <h2 className="manifesto-subtitle" style={{ marginTop: "24px" }}>The same question means different things to different people.</h2>
          <h2 className="manifesto-subtitle" style={{ marginTop: "12px", color: "#1d1d1f" }}>Understanding requires context.</h2>
        </motion.div>
      </section>

      {/* CHAPTER 7: Memory */}
      <section className="manifesto-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="manifesto-headline-massive" style={{ color: "#6e6e73" }}>Memory is not storage.</h2>
          <motion.h2 className="manifesto-headline-massive" style={{ marginTop: "40px", color: "#1d1d1f" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.5 }}>Memory is continuity.</motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 8: Intelligence */}
      <section className="manifesto-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="manifesto-headline-massive" style={{ color: "#6e6e73" }}>Intelligence is not answers.</h2>
          <motion.h2 className="manifesto-headline-massive" style={{ marginTop: "40px", color: "#1d1d1f" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.5 }}>Intelligence is understanding over time.</motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 9: The Future */}
      <section className="manifesto-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="manifesto-headline-large" style={{ color: "#6e6e73" }}>Less searching.</h2>
          <motion.h2 className="manifesto-headline-large" style={{ marginTop: "24px", color: "#6e6e73" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 1.5 }}>Less prompting.</motion.h2>
          <motion.h2 className="manifesto-headline-large" style={{ marginTop: "24px", color: "#6e6e73" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2, duration: 1.5 }}>Less repetition.</motion.h2>
          <motion.h2 className="manifesto-headline-massive" style={{ marginTop: "80px", color: "#1d1d1f" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 3.5, duration: 1.5 }}>More understanding.</motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 10: The Bridge to AuraOS (New) */}
      <section className="manifesto-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="manifesto-headline-massive" style={{ color: "#6e6e73" }}>AuraOS began with a simple belief.</h2>
          <motion.h2 className="manifesto-headline-massive" style={{ marginTop: "40px", color: "#1d1d1f" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.5 }}>Understanding should accumulate.</motion.h2>
          <motion.h2 className="manifesto-headline-massive" style={{ marginTop: "40px", color: "#1d1d1f" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 3, duration: 1.5 }}>Not reset.</motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 11: A New Layer */}
      <section className="manifesto-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="manifesto-headline-large" style={{ color: "#6e6e73" }}>The next computing layer will not be software.</h2>
          <motion.h2 className="manifesto-headline-massive" style={{ marginTop: "40px", color: "#1d1d1f" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1.5 }}>The next computing layer<br/>will be intelligence.</motion.h2>
        </motion.div>
      </section>

      {/* CHAPTER 12: Final Reveal */}
      <section className="manifesto-section" style={{ minHeight: "120vh" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: EASE }}>
          <h2 className="manifesto-headline-massive" style={{ color: "#6e6e73" }}>Artificial Intelligence<br/>helped us find answers.</h2>
          <motion.h2 className="manifesto-headline-massive" style={{ marginTop: "40px", color: "#1d1d1f" }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2, duration: 1.5 }}>Personal Intelligence<br/>will help us understand.</motion.h2>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 5, duration: 1.5, ease: EASE }} style={{ marginTop: "120px" }}>
          <div className="manifesto-orb" style={{ width: "240px", height: "240px", margin: "0 auto 40px" }} />
          <h1 className="manifesto-headline-massive" style={{ letterSpacing: "-0.05em" }}>AuraOS</h1>
          <h2 className="manifesto-headline-large" style={{ marginTop: "24px", color: "#6e6e73" }}>The beginning of that future.</h2>
          
          <div style={{ marginTop: "80px" }}>
            <Link to="/chat" className="manifesto-btn">
              Launch AuraOS
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
