import React, { useState, useEffect, useRef, useCallback } from "react";

const T = {
  bg: "#0a0a0f",
  surface: "#12121a",
  surfaceAlt: "#1a1a24",
  border: "#2a2a38",
  borderStrong: "#4a4a66",
  ink: "#f0f0ff",
  inkSoft: "#a0a0cc",
  inkMuted: "#7777aa",
  indigo: "#6366f1",
  indigoHover: "#4f52e0",
  indigoLight: "#312e81",
  indigoMid: "#818cf8",
  emerald: "#10b981",
  amber: "#f59e0b",
  red: "#ef4444",
  purple: "#a855f7",
};

const PROMO_CODES = { SAVE20: 0.2, HALFOFF: 0.5, LAUNCH: 0.3 };

const PLANS = [
  {
    id: "free",
    tier: "Basic Node",
    monthly: 0,
    yearly: 0,
    badge: null,
    icon: "○",
    tagline: "Entry-level reasoning. Perfect for exploration.",
    power: 25,
    speed: 40,
    intelligence: 35,
    context: "4K",
    features: [
      "Unlimited basic chats",
      "Standard response speed",
      "Basic encryption",
      "Mobile access",
    ],
    locked: ["Advanced models", "Chat history", "Document Q&A", "API access"],
    cta: "Initialize Free Mode",
    ctaVariant: "ghost",
  },
  {
    id: "pro",
    tier: "AI Core Engine",
    monthly: 12,
    yearly: 120,
    badge: "Most Intelligent",
    icon: "◆",
    tagline: "Professional-grade cognition for creators & builders.",
    power: 75,
    speed: 85,
    intelligence: 80,
    context: "32K",
    features: [
      "Gemini Pro models",
      "Persistent memory",
      "PDF & document analysis",
      "Code + math reasoning",
      "Priority processing",
      "Multi-device sync",
    ],
    locked: ["Team workspace", "128K context", "Advanced API"],
    cta: "Activate AI Core",
    ctaVariant: "primary",
  },
  {
    id: "plus",
    tier: "Neural Intelligence System",
    monthly: 24,
    yearly: 240,
    badge: "Full Cognition",
    icon: "◈",
    tagline: "Maximum intelligence. For teams and AI-native organizations.",
    power: 98,
    speed: 98,
    intelligence: 95,
    context: "128K",
    features: [
      "Gemini Ultra + custom routing",
      "Everything in AI Core",
      "Team workspaces & roles",
      "Full API + SDKs",
      "Advanced analytics",
      "128K context window",
      "Export to all formats",
    ],
    locked: [],
    cta: "Upgrade Neural System",
    ctaVariant: "outline",
  },
];

const COMPARE = [
  { label: "Response Speed", free: "Standard", pro: "Fast", plus: "Ultra" },
  { label: "AI Model Tier", free: "Base", pro: "Gemini Pro", plus: "Gemini Ultra" },
  { label: "Context Window", free: "4K", pro: "32K", plus: "128K" },
  { label: "Document Q&A", free: false, pro: true, plus: true },
  { label: "Chat History", free: false, pro: true, plus: true },
  { label: "API Access", free: false, pro: false, plus: true },
  { label: "Team Collaboration", free: false, pro: false, plus: true },
  { label: "Analytics Dashboard", free: false, pro: false, plus: true },
];

const TESTIMONIALS = [
  { name: "Ananya R.", role: "Data Scientist @ Infosys", initials: "AR", text: "The difference in reasoning depth between Basic Node and AI Core is night and day." },
  { name: "Rohit K.", role: "CTO @ Razorpay", initials: "RK", text: "Neural Intelligence System literally feels like having a co-founder who never sleeps." },
  { name: "Maya S.", role: "Product @ Zomato", initials: "MS", text: "Our entire team upgraded. The speed and context understanding is unreal." },
];

const SECURITY = [
  { icon: "⬡", title: "AES-256 + Zero-Knowledge", desc: "End-to-end encryption. Your data never leaves your control." },
  { icon: "◻", title: "Ephemeral Processing", desc: "Files auto-deleted after 24h unless saved." },
  { icon: "◇", title: "SOC 2 Type II + GDPR", desc: "Independently audited security." },
  { icon: "○", title: "99.99% Uptime SLA", desc: "Global redundant inference clusters." },
];

function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);

    const nodes = Array.from({ length: 45 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 2.2 + 1.2,
    }));

    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(10,10,15,0.6)";
      ctx.fillRect(0, 0, W, H);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 140) {
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - d / 140)})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.fillStyle = "#818cf8";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

function PowerBar({ value, label, color = "#6366f1" }) {
  const percent = Math.min(value, 100);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4, color: "#a0a0cc" }}>
        <span>{label}</span>
        <span style={{ fontFamily: "monospace" }}>{percent}%</span>
      </div>
      <div style={{ height: 6, background: "#1f1f2e", borderRadius: 999, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${percent}%`,
            background: `linear-gradient(90deg, ${color}, #a5b4fc)`,
            borderRadius: 999,
            transition: "width 0.8s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </div>
    </div>
  );
}

function PricingCard({ plan, billing, discount, onSubscribe, isRecommended }) {
  const isFeatured = plan.id === "pro";
  const isEnterprise = plan.id === "plus";
  const basePrice = billing === "monthly" ? plan.monthly : plan.yearly / 12;
  const price = Math.round(basePrice * (1 - discount));
  const isYearly = billing === "yearly" && plan.monthly > 0;
  const savePct = isYearly ? Math.round((1 - plan.yearly / (plan.monthly * 12)) * 100) : 0;

  return (
    <div
      className={`plan-card ${isFeatured ? "featured" : ""}`}
      style={{
        background: T.surface,
        border: isFeatured
          ? `2.5px solid ${T.indigo}`
          : isEnterprise
          ? `2px solid ${T.purple}`
          : `1px solid ${T.border}`,
        borderRadius: 24,
        padding: "40px 32px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: isFeatured ? "0 0 60px rgba(99,102,241,0.25)" : "0 10px 30px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
      }}
    >
      {/* Energy glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isFeatured
            ? "radial-gradient(circle at 50% 20%, rgba(99,102,241,0.15), transparent 70%)"
            : "transparent",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {plan.badge && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: isFeatured ? T.indigo : T.purple,
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 14px",
            borderRadius: 20,
            letterSpacing: "0.5px",
          }}
        >
          {plan.badge}
        </div>
      )}

      {isRecommended && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#10b981",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            padding: "2px 18px",
            borderRadius: 20,
            boxShadow: "0 4px 15px rgba(16,185,129,0.4)",
          }}
        >
          RECOMMENDED FOR YOU
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ fontSize: 32, color: isFeatured ? T.indigo : T.purple }}>{plan.icon}</div>
        <h3 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", color: T.ink }}>
          {plan.tier}
        </h3>
      </div>

      <p style={{ color: T.inkSoft, lineHeight: 1.6, marginBottom: 32, minHeight: 48 }}>{plan.tagline}</p>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: 58, fontWeight: 800, color: T.ink, letterSpacing: "-0.04em" }}>
            {plan.monthly === 0 ? "Free" : `$${price}`}
          </span>
          {plan.monthly > 0 && (
            <span style={{ marginLeft: 8, color: T.inkMuted, fontSize: 16 }}>/{billing === "yearly" ? "yr" : "mo"}</span>
          )}
        </div>
        {isYearly && <p style={{ color: T.emerald, fontSize: 14, marginTop: 4 }}>Save {savePct}% • Billed yearly</p>}
      </div>

      {/* Power metrics */}
      <div style={{ marginBottom: 32 }}>
        <PowerBar value={plan.power} label="Power Level" color={T.indigo} />
        <PowerBar value={plan.speed} label="Inference Speed" color="#34d399" />
        <PowerBar value={plan.intelligence} label="Cognitive Depth" color="#a855f7" />
        <div style={{ marginTop: 14, fontSize: 13, color: T.inkSoft }}>
          Context Window: <span style={{ color: T.ink, fontFamily: "monospace" }}>{plan.context}</span>
        </div>
      </div>

      <ul style={{ listStyle: "none", marginBottom: 40, flex: 1 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: "flex", gap: 12, marginBottom: 14, fontSize: 14.5, color: T.ink }}>
            <span style={{ color: T.emerald, fontSize: 18 }}>◉</span> {f}
          </li>
        ))}
        {plan.locked.map((f, i) => (
          <li key={i} style={{ display: "flex", gap: 12, marginBottom: 14, fontSize: 14.5, color: T.inkMuted, opacity: 0.6 }}>
            <span style={{ color: "#666", fontSize: 18 }}>○</span> <span style={{ textDecoration: "line-through" }}>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSubscribe(plan.id)}
        style={{
          width: "100%",
          padding: "16px",
          fontSize: 15,
          fontWeight: 700,
          borderRadius: 14,
          border: plan.ctaVariant === "outline" ? `2px solid ${T.purple}` : "none",
          background: plan.ctaVariant === "primary" ? T.indigo : plan.ctaVariant === "outline" ? "transparent" : T.surfaceAlt,
          color: plan.ctaVariant === "primary" ? "#fff" : T.ink,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          if (plan.ctaVariant === "primary") e.target.style.background = T.indigoHover;
        }}
        onMouseOut={(e) => {
          if (plan.ctaVariant === "primary") e.target.style.background = T.indigo;
        }}
      >
        {plan.cta}
      </button>
    </div>
  );
}

function AIUpgradeModal({ planId, billing, onClose }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("initializing");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 18 + 8;
        if (next >= 100) {
          setStatus("complete");
          clearInterval(interval);
          setTimeout(onClose, 1400);
          return 100;
        }
        return Math.min(next, 99);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onClose]);

  const plan = PLANS.find((p) => p.id === planId);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(10,10,15,0.92)",
      backdropFilter: "blur(12px)",
      zIndex: 10000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: T.surface,
        border: `1px solid ${T.indigo}`,
        borderRadius: 24,
        width: "100%",
        maxWidth: 460,
        padding: 48,
        textAlign: "center",
        boxShadow: "0 40px 100px rgba(99,102,241,0.3)",
      }}>
        <div style={{ fontSize: 42, marginBottom: 20 }}>🧠</div>
        <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Upgrading Neural Core...</h3>
        <p style={{ color: T.inkSoft, marginBottom: 32 }}>
          Initializing {plan?.tier} intelligence
        </p>

        <div style={{ height: 8, background: "#1f1f2e", borderRadius: 999, marginBottom: 16, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #6366f1, #a5b4fc)",
              transition: "width 0.1s linear",
            }}
          />
        </div>

        <div style={{ fontFamily: "monospace", fontSize: 14, color: T.indigoMid }}>
          {status === "complete" ? "UPGRADE COMPLETE ✓ Neural pathways synchronized" : `${Math.floor(progress)}% • Quantum sync in progress`}
        </div>

        {status === "complete" && (
          <div style={{ marginTop: 30, color: T.emerald, fontWeight: 600 }}>
            Welcome to a more intelligent version of you.
          </div>
        )}
      </div>
    </div>
  );
}

function ChatSimulation() {
  const [activeTier, setActiveTier] = useState("pro");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  const query = "Explain quantum entanglement like I'm a 12-year-old, then show me a real-world application in 2026.";

  const responses = {
    free: "Quantum what? It's when tiny things are connected... I think. Sorry, I can't go deeper without better models.",
    pro: "Imagine two magic dice that always show the same number no matter how far apart they are. That's entanglement! In 2026, it's used in ultra-secure quantum networks for banking.",
    plus: "Think of two particles that share a single quantum state. Change one and the other reacts instantly, even across galaxies. In 2026, this powers quantum-encrypted 6G networks and instant global AI synchronization.",
  };

  const simulateResponse = () => {
    setIsThinking(true);
    setMessages([{ from: "user", text: query }]);

    setTimeout(() => {
      setIsThinking(false);
      setMessages([
        { from: "user", text: query },
        { from: "bot", text: responses[activeTier] || responses.pro, tier: activeTier },
      ]);
    }, activeTier === "free" ? 800 : activeTier === "pro" ? 420 : 180);
  };

  return (
    <div style={{ maxWidth: 920, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 24 }}>
        {PLANS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveTier(p.id)}
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              border: activeTier === p.id ? `2px solid ${T.indigo}` : `1px solid ${T.border}`,
              background: activeTier === p.id ? T.indigoLight : "transparent",
              color: activeTier === p.id ? "#fff" : T.inkSoft,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {p.tier}
          </button>
        ))}
      </div>

      <div style={{ background: T.surfaceAlt, borderRadius: 20, padding: 32, border: `1px solid ${T.border}` }}>
        <div style={{ marginBottom: 20, fontSize: 13, color: T.inkMuted, fontFamily: "monospace" }}>
          QUERY → {query}
        </div>

        <div style={{ minHeight: 220 }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                marginBottom: 16,
                padding: "16px 20px",
                borderRadius: 16,
                background: msg.from === "user" ? T.indigoLight : T.surface,
                color: msg.from === "user" ? T.ink : T.ink,
                maxWidth: "85%",
                marginLeft: msg.from === "user" ? "auto" : 0,
              }}
            >
              {msg.text}
            </div>
          ))}

          {isThinking && (
            <div style={{ display: "flex", gap: 6, padding: "14px 20px", background: T.surface, borderRadius: 16, width: "fit-content" }}>
              <div style={{ animation: "typingDot 1.2s infinite", background: T.indigo, width: 6, height: 6, borderRadius: "50%" }} />
              <div style={{ animation: "typingDot 1.2s infinite 0.2s", background: T.indigo, width: 6, height: 6, borderRadius: "50%" }} />
              <div style={{ animation: "typingDot 1.2s infinite 0.4s", background: T.indigo, width: 6, height: 6, borderRadius: "50%" }} />
            </div>
          )}
        </div>

        <button
          onClick={simulateResponse}
          style={{
            marginTop: 20,
            padding: "14px 32px",
            background: T.indigo,
            color: "#fff",
            border: "none",
            borderRadius: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Run Simulation →
        </button>
      </div>
    </div>
  );
}

export default function IntelligentAIBOTPlans() {
  const rootRef = useRef(null);
  const [billing, setBilling] = useState("monthly");
  const [discount, setDiscount] = useState(0);
  const [promo, setPromo] = useState("");
  const [modalPlan, setModalPlan] = useState(null);
  const [recommended] = useState("pro");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
      
      .aibot-root { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
      .plan-card { cursor: pointer; }
      
      @keyframes typingDot {
        0%, 100% { transform: scale(0.4); opacity: 0.4; }
        50% { transform: scale(1); opacity: 1; }
      }
      
      .scanline {
        position: absolute;
        top: -100%;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(transparent, rgba(165,180,252,0.6), transparent);
        animation: scan 4s linear infinite;
      }
      
      @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }
    `;
    document.head.appendChild(style);
  }, []);

  const applyPromo = () => {
    const code = promo.toUpperCase().trim();
    if (PROMO_CODES[code]) setDiscount(PROMO_CODES[code]);
  };

  const handleSubscribe = (planId) => {
    if (planId === "free") {
      alert("Free mode initialized. Welcome to Basic Node!");
      return;
    }
    setModalPlan(planId);
  };

  return (
    <div ref={rootRef} className="aibot-root" style={{ background: T.bg, color: T.ink, minHeight: "100vh", overflow: "hidden" }}>
      {/* HERO - AI UPGRADE CENTER */}
      <section style={{ padding: "100px 20px 80px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
          <NetworkCanvas />
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(16,185,129,0.1)",
            border: "1px solid #10b981",
            borderRadius: 40,
            padding: "8px 22px",
            marginBottom: 24,
            fontSize: 14,
          }}>
            <span style={{ color: "#10b981" }}>●</span>
            AI SYSTEM ONLINE • <span style={{ fontFamily: "monospace" }}>&lt;80ms</span> • Gemini Ultra Cluster
          </div>

          <h1 style={{ fontSize: "clamp(48px, 8vw, 92px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: 20 }}>
            Upgrade Your<br />
            <span style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Intelligence
            </span>
          </h1>

          <p style={{ fontSize: 20, maxWidth: 620, margin: "0 auto 48px", color: T.inkSoft }}>
            Select your AI cognition tier.<br />From basic reasoning to full neural intelligence.
          </p>
        </div>
      </section>

      {/* BILLING + PROMO */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 60px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", background: T.surface, borderRadius: 16, padding: 6, border: `1px solid ${T.border}` }}>
          {["monthly", "yearly"].map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              style={{
                padding: "12px 32px",
                borderRadius: 12,
                fontWeight: 600,
                background: billing === b ? T.indigo : "transparent",
                color: billing === b ? "#fff" : T.inkSoft,
              }}
            >
              {b === "yearly" ? "Yearly (Save 20%)" : "Monthly"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <input
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Promo code (SAVE20)"
            style={{ padding: "14px 20px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, width: 260, color: T.ink }}
          />
          <button onClick={applyPromo} style={{ padding: "14px 28px", background: T.indigo, color: "#fff", border: "none", borderRadius: 12, fontWeight: 600 }}>
            Apply
          </button>
        </div>
      </div>

      {/* PLANS */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billing={billing}
              discount={discount}
              onSubscribe={handleSubscribe}
              isRecommended={plan.id === recommended}
            />
          ))}
        </div>
      </div>

      {/* AI SIMULATION */}
      <section style={{ background: T.surfaceAlt, padding: "100px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, letterSpacing: 2, color: T.indigoMid, marginBottom: 12 }}>AI SIMULATION MODE</div>
          <h2 style={{ fontSize: 42, fontWeight: 700, marginBottom: 16 }}>Experience the Intelligence Difference</h2>
          <p style={{ color: T.inkSoft, maxWidth: 580, margin: "0 auto 60px" }}>
            Same prompt. Different cognitive tiers. Watch how intelligence scales.
          </p>
          <ChatSimulation />
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "120px 20px", textAlign: "center", background: T.bg }}>
        <h2 style={{ fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 800, marginBottom: 24 }}>
          Ready to upgrade your mind?
        </h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => handleSubscribe("free")}
            style={{ padding: "18px 42px", fontSize: 17, fontWeight: 700, borderRadius: 16, background: T.surface, border: `2px solid ${T.border}` }}
          >
            Initialize Free Mode
          </button>
          <button
            onClick={() => handleSubscribe("pro")}
            style={{ padding: "18px 42px", fontSize: 17, fontWeight: 700, borderRadius: 16, background: T.indigo, color: "#fff" }}
          >
            Activate AI Core Engine
          </button>
        </div>
        <p style={{ marginTop: 32, color: T.inkMuted }}>Trusted by 50,000+ AI-forward users worldwide</p>
      </section>

      {/* UPGRADE MODAL */}
      {modalPlan && <AIUpgradeModal planId={modalPlan} billing={billing} onClose={() => setModalPlan(null)} />}

      {/* Floating system status */}
      <div style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(18,18,26,0.95)",
        border: `1px solid ${T.border}`,
        borderRadius: 999,
        padding: "8px 24px",
        fontSize: 13,
        color: T.inkSoft,
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 100,
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}>
        <span style={{ color: T.emerald }}>● LIVE</span>
        Intelligent AIBOT OS v2.4 • Neural Fabric Active
      </div>
    </div>
  );
}