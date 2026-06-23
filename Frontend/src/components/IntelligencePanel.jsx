import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntelligencePanel({ contextRemembered }) {
  // We can derive dummy/live stats based on contextRemembered or global state
  // For the sake of the WWDC demo, we'll assume vector search and RAG are active.
  const hasContext = contextRemembered && contextRemembered.length > 0;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        width: "320px",
        flexShrink: 0,
        background: "var(--bg-surface)",
        borderLeft: "1px solid var(--border)",
        backdropFilter: "blur(40px)",
        padding: "32px 24px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <div>
        <h3 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "16px", fontWeight: "600" }}>
          System Status
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <StatusRow label="Vector Search" active={true} />
          <StatusRow label="RAG Engine" active={true} />
          <StatusRow label="Memory Active" active={hasContext} />
        </div>
      </div>

      {hasContext && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <h3 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "16px", fontWeight: "600" }}>
              Knowledge Retrieved
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Dummy data for the presentation, could be derived from contextRemembered */}
              <DocCard name="Resume.pdf" score="98%" />
              <DocCard name="Projects_Overview.pdf" score="87%" />
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {hasContext && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <h3 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "16px", fontWeight: "600" }}>
              Memory Used
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <Badge text="Career Goals" />
              <Badge text="Portfolio Context" />
              <Badge text="Past Projects" />
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* When no context is active, show ambient state */}
      {!hasContext && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", opacity: 0.5 }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
            </svg>
          </div>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)", textAlign: "center", lineHeight: "1.5" }}>Waiting for knowledge context...</span>
        </div>
      )}
    </motion.aside>
  );
}

function StatusRow({ label, active }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "rgba(255, 255, 255, 0.03)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
      <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "11px", color: active ? "var(--accent-blue-hover)" : "var(--text-muted)", fontWeight: "500" }}>{active ? "ACTIVE" : "STANDBY"}</span>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: active ? "var(--accent-blue-hover)" : "var(--text-muted)", boxShadow: active ? "0 0 8px var(--accent-blue-hover)" : "none" }} />
      </div>
    </div>
  );
}

function DocCard({ name, score }) {
  return (
    <div style={{ padding: "12px", background: "rgba(255, 255, 255, 0.03)", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue-hover)" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: "500", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{name}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Vector Match</span>
        <span style={{ fontSize: "12px", color: "var(--accent-blue-hover)", fontWeight: "600" }}>{score}</span>
      </div>
    </div>
  );
}

function Badge({ text }) {
  return (
    <div style={{ padding: "4px 10px", background: "rgba(0, 102, 204, 0.15)", border: "1px solid rgba(0, 102, 204, 0.3)", borderRadius: "100px", fontSize: "12px", color: "#66b3ff", fontWeight: "500" }}>
      {text}
    </div>
  );
}
