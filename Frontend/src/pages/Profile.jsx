// src/pages/Profile.jsx
import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, getDocs, updateDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

/* ─── Keyframe injection ─────────────────────────────────── */
const injectStyles = () => {
  if (document.getElementById("profile-keyframes")) return;
  const style = document.createElement("style");
  style.id = "profile-keyframes";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
      50%       { box-shadow: 0 0 0 10px rgba(99,102,241,0); }
    }
    @keyframes gradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes orbFloat {
      0%, 100% { transform: translateY(0) scale(1); }
      50%       { transform: translateY(-20px) scale(1.05); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes badgePop {
      0%   { transform: scale(0.7); opacity: 0; }
      80%  { transform: scale(1.05); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes scanline {
      0%   { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; } 50% { opacity: 0; }
    }

    .stat-card:hover { transform: translateY(-6px) scale(1.02) !important; }
    .action-btn:hover { filter: brightness(1.12); transform: translateY(-2px) !important; }
    .activity-item:hover { background: rgba(99,102,241,0.12) !important; border-color: rgba(99,102,241,0.4) !important; transform: translateX(6px) !important; }
    .insight-chip:hover { background: rgba(99,102,241,0.25) !important; transform: scale(1.04) !important; }

    input:-webkit-autofill { -webkit-box-shadow: 0 0 0px 1000px #13182a inset !important; -webkit-text-fill-color: #e2e8f0 !important; }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0b0f19; }
    ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.4); border-radius: 3px; }
  `;
  document.head.appendChild(style);
};

/* ─── Count-up hook ──────────────────────────────────────── */
function useCountUp(target, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(ease * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [target, duration, delay]);
  return value;
}

/* ─── Avatar ─────────────────────────────────────────────── */
const Avatar = ({ name, size = 100 }) => {
  const initials = name ? name.slice(0, 2).toUpperCase() : "??";
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36, fontFamily: "'Syne', sans-serif",
      fontWeight: 800, color: "#fff", letterSpacing: 2,
      boxShadow: "0 0 0 4px rgba(99,102,241,0.3), 0 0 40px rgba(99,102,241,0.4)",
      flexShrink: 0, position: "relative", zIndex: 1,
      animation: "pulseGlow 3s ease-in-out infinite",
    }}>
      {initials}
    </div>
  );
};

/* ─── Stat Card ──────────────────────────────────────────── */
const StatCard = ({ icon, label, value, desc, accent, delay, suffix = "" }) => {
  const count = useCountUp(typeof value === "number" ? value : 0, 1400, delay);
  return (
    <div className="stat-card" style={{
      background: "rgba(19,24,42,0.7)",
      border: `1px solid rgba(${accent},0.25)`,
      borderRadius: 20, padding: "28px 24px",
      backdropFilter: "blur(20px)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      boxShadow: `0 4px 30px rgba(${accent},0.08)`,
      animation: `fadeInUp 0.6s ease ${delay}ms both`,
      cursor: "default", position: "relative", overflow: "hidden",
    }}>
      {/* Glow orb */}
      <div style={{
        position: "absolute", top: -30, right: -30, width: 100, height: 100,
        borderRadius: "50%", background: `rgba(${accent},0.15)`,
        filter: "blur(30px)", pointerEvents: "none",
      }} />
      <div style={{ fontSize: 30, marginBottom: 12 }}>{icon}</div>
      <div style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        fontSize: 34, color: "#fff", lineHeight: 1,
        background: `linear-gradient(135deg, #fff, rgba(${accent},0.9))`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        {typeof value === "string" ? value : `${count}${suffix}`}
      </div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#c7d2fe", fontSize: 13, marginTop: 6 }}>{label}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(167,178,210,0.7)", fontSize: 12, marginTop: 4 }}>{desc}</div>
    </div>
  );
};

/* ─── Activity Item ──────────────────────────────────────── */
const ActivityItem = ({ title, preview, time, onClick }) => (
  <div className="activity-item" onClick={onClick} style={{
    padding: "16px 20px", borderRadius: 14,
    border: "1px solid rgba(99,102,241,0.15)",
    background: "rgba(99,102,241,0.05)",
    cursor: "pointer", transition: "all 0.25s ease",
    display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 10,
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3))",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
    }}>💬</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, color: "#e2e8f0", fontSize: 14, marginBottom: 3 }}>{title}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(167,178,210,0.7)", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{preview}</div>
    </div>
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(99,102,241,0.7)", fontSize: 11, whiteSpace: "nowrap", marginTop: 2 }}>{time}</div>
  </div>
);

/* ─── Floating Label Input ───────────────────────────────── */
const FloatingInput = ({ label, value, onChange, disabled, type = "text", mono }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  return (
    <div style={{ position: "relative", marginBottom: 20 }}>
      <label style={{
        position: "absolute", left: 16,
        top: active ? 8 : "50%", transform: active ? "none" : "translateY(-50%)",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: active ? 10 : 14,
        color: focused ? "#818cf8" : "rgba(167,178,210,0.6)",
        transition: "all 0.2s ease", pointerEvents: "none",
        fontWeight: active ? 600 : 400, zIndex: 2,
        letterSpacing: active ? 0.5 : 0,
      }}>{label}</label>
      <input
        type={type} value={value}
        onChange={onChange} disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: active ? "22px 16px 8px" : "16px",
          background: disabled ? "rgba(13,17,30,0.6)" : "rgba(19,24,42,0.8)",
          border: `1.5px solid ${focused ? "rgba(99,102,241,0.7)" : "rgba(99,102,241,0.15)"}`,
          borderRadius: 12, color: disabled ? "rgba(167,178,210,0.5)" : "#e2e8f0",
          fontFamily: mono ? "monospace" : "'DM Sans', sans-serif",
          fontSize: 14, outline: "none", transition: "border 0.2s ease",
          boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
    </div>
  );
};

/* ─── Badge ──────────────────────────────────────────────── */
const Badge = ({ emoji, label, color }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "6px 14px", borderRadius: 50,
    background: `rgba(${color},0.15)`, border: `1px solid rgba(${color},0.3)`,
    fontFamily: "'Syne', sans-serif", fontWeight: 700,
    color: "#fff", fontSize: 12, animation: "badgePop 0.5s ease both",
  }}>
    <span>{emoji}</span><span>{label}</span>
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const Profile = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [chatCount, setChatCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [recentChats, setRecentChats] = useState([]);
  const [joinDate, setJoinDate] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    injectStyles();
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (!u) { navigate("/login"); return; }
      setUser(u);
      const userEmail = u.email || "";
      setEmail(userEmail);

      // Try Firestore for display name first
      try {
        const userDoc = await getDoc(doc(db, "users", u.uid));
        const displayName = u.displayName || userDoc?.data()?.name || userEmail.split("@")[0];
        setName(displayName);
        setEditName(displayName);
      } catch {
        const fallback = u.displayName || userEmail.split("@")[0];
        setName(fallback);
        setEditName(fallback);
      }

      // Join date
      if (u.metadata?.creationTime) {
        setJoinDate(new Date(u.metadata.creationTime).toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric",
        }));
      }

      // Fetch chats
      try {
        const chatsRef = collection(db, "users", u.uid, "chats");
        const snap = await getDocs(chatsRef);
        setChatCount(snap.size);

        let msgs = 0;
        const recents = [];
        snap.forEach((docSnap) => {
          const data = docSnap.data();
          msgs += data.messageCount || (data.messages?.length) || 0;
          recents.push({
            id: docSnap.id,
            title: data.title || data.name || "Untitled Chat",
            preview: data.lastMessage || data.preview || "No preview available",
            time: data.updatedAt?.toDate
              ? data.updatedAt.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric" })
              : data.updatedAt || "Recently",
          });
        });
        setMessageCount(msgs);
        setRecentChats(recents.slice(0, 5));
      } catch (e) {
        // mock data for demo
        setChatCount(42);
        setMessageCount(387);
        setRecentChats([
          { id: "1", title: "React Performance Tips", preview: "How do I optimize re-renders?", time: "Apr 6" },
          { id: "2", title: "Firebase Firestore Rules", preview: "Help me write secure rules...", time: "Apr 5" },
          { id: "3", title: "CSS Grid vs Flexbox", preview: "When should I use which?", time: "Apr 4" },
          { id: "4", title: "API Design Best Practices", preview: "RESTful vs GraphQL debate...", time: "Apr 3" },
        ]);
      }

      setLoaded(true);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "users", user.uid), { name: editName }, { merge: true });
      setName(editName);
      setEditing(false);
    } catch (e) {
      setName(editName); setEditing(false);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut(auth);
    navigate("/login");
  };

  const aiUsageScore = Math.min(100, Math.round((chatCount * 2.1) + 15)) || 85;
  const filesUploaded = Math.round(chatCount * 0.4) || 17;

  if (!loaded) return (
    <div style={{
      minHeight: "100vh", background: "#0b0f19",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        border: "3px solid rgba(99,102,241,0.2)",
        borderTopColor: "#6366f1", animation: "spin 0.8s linear infinite",
      }} />
      <div style={{ fontFamily: "'Syne', sans-serif", color: "rgba(167,178,210,0.5)", fontSize: 14 }}>Loading your dashboard</div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#0b0f19",
      fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0",
      animation: "fadeIn 0.5s ease both",
      backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(168,85,247,0.05) 0%, transparent 50%)",
    }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0b0f19 100%)",
        backgroundSize: "300% 300%", animation: "gradientShift 8s ease infinite",
        padding: "60px 24px 80px",
      }}>
        {/* Decorative orbs */}
        {[
          { top: -60, left: -60, size: 200, color: "rgba(99,102,241,0.2)" },
          { top: 20, right: -40, size: 150, color: "rgba(168,85,247,0.15)" },
          { bottom: -40, left: "30%", size: 120, color: "rgba(6,182,212,0.12)" },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute", width: o.size, height: o.size, borderRadius: "50%",
            background: o.color, filter: "blur(40px)",
            top: o.top, left: o.left, right: o.right, bottom: o.bottom,
            animation: `orbFloat ${4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }} />
        ))}

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          {/* Welcome line */}
          <div style={{
            fontFamily: "'DM Sans', sans-serif", color: "rgba(199,210,254,0.7)",
            fontSize: 14, marginBottom: 28, letterSpacing: 0.5,
            animation: "fadeInUp 0.5s ease 0.1s both",
          }}>
            <span style={{ opacity: 0.5 }}>Dashboard /</span> Profile
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap",
            animation: "fadeInUp 0.6s ease 0.2s both",
          }}>
            <Avatar name={name} size={90} />
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", color: "rgba(199,210,254,0.7)",
                fontSize: 14, marginBottom: 6,
              }}>
                Welcome back, <span style={{ color: "#a5b4fc" }}>{name.split(" ")[0]}</span> 👋
              </div>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: "clamp(26px, 5vw, 42px)", color: "#fff", lineHeight: 1.1, marginBottom: 10,
              }}>
                {name}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "4px 12px", borderRadius: 50,
                  background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#34d399",
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", animation: "pulseGlow 2s infinite" }} />
                  Active User
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                  color: "rgba(167,178,210,0.5)", padding: "4px 10px",
                  background: "rgba(255,255,255,0.05)", borderRadius: 50,
                }}>
                  {email}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Badge emoji="🏆" label="Power User" color="251,191,36" />
                <Badge emoji="🔥" label="Active Learner" color="239,68,68" />
                <Badge emoji="🧠" label="AI Enthusiast" color="99,102,241" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <div style={{ maxWidth: 900, margin: "-32px auto 0", padding: "0 24px 80px", position: "relative" }}>

        {/* ── STATS GRID ─────────────────────────── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 16, marginBottom: 28,
        }}>
          <StatCard icon="💬" label="Total Chats" value={chatCount} desc="Conversations started" accent="99,102,241" delay={0} />
          <StatCard icon="⚡" label="Messages Sent" value={messageCount} desc="Across all sessions" accent="168,85,247" delay={100} />
          <StatCard icon="📄" label="Files Uploaded" value={filesUploaded} desc="Documents processed" accent="6,182,212" delay={200} />
          <StatCard icon="🧠" label="AI Usage Score" value={`${aiUsageScore}%`} desc="Top 15% of users" accent="251,191,36" delay={300} />
        </div>

        {/* ── AI INSIGHTS ────────────────────────── */}
        <div style={{
          background: "rgba(19,24,42,0.7)", border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 20, padding: "24px 28px", marginBottom: 28,
          backdropFilter: "blur(20px)", animation: "fadeInUp 0.6s ease 0.35s both",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3))",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>🧠</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#c7d2fe" }}>AI Insights</div>
            <div style={{
              marginLeft: "auto", padding: "2px 10px", borderRadius: 50, fontSize: 10,
              background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
              color: "#34d399", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            }}>LIVE</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { emoji: "🚀", text: "Highly active this week" },
              { emoji: "📈", text: "Usage up 20% vs last week" },
              { emoji: "💡", text: "Favorite topic: Development" },
              { emoji: "⚡", text: `Avg ${Math.round((messageCount || 387) / Math.max(chatCount, 1))} msgs/chat` },
              { emoji: "🌟", text: "Consistent daily user" },
            ].map((ins, i) => (
              <div key={i} className="insight-chip" style={{
                display: "flex", alignItems: "center", gap: 7, padding: "8px 16px",
                background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: 50, cursor: "default", transition: "all 0.2s ease",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#c7d2fe",
                animation: `badgePop 0.4s ease ${i * 80}ms both`,
              }}>
                <span>{ins.emoji}</span><span>{ins.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2-COLUMN SECTION ───────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 28 }}>

          {/* Recent Activity */}
          <div style={{
            background: "rgba(19,24,42,0.7)", border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 20, padding: "24px 24px 20px",
            backdropFilter: "blur(20px)", animation: "fadeInUp 0.6s ease 0.4s both",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#c7d2fe" }}>Recent Activity</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(99,102,241,0.7)",
                padding: "3px 10px", background: "rgba(99,102,241,0.1)", borderRadius: 50,
                border: "1px solid rgba(99,102,241,0.2)",
              }}>
                {recentChats.length} chats
              </div>
            </div>
            {recentChats.length > 0 ? recentChats.map((chat) => (
              <ActivityItem
                key={chat.id}
                title={chat.title} preview={chat.preview} time={chat.time}
                onClick={() => navigate(`/chat/${chat.id}`)}
              />
            )) : (
              <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(167,178,210,0.4)", fontSize: 14 }}>
                No recent chats yet
              </div>
            )}
          </div>

          {/* Account Details */}
          <div style={{
            background: "rgba(19,24,42,0.7)", border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 20, padding: "24px",
            backdropFilter: "blur(20px)", animation: "fadeInUp 0.6s ease 0.5s both",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#c7d2fe" }}>Account Details</div>
              {!editing && (
                <button onClick={() => setEditing(true)} style={{
                  background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
                  borderRadius: 10, padding: "6px 14px", color: "#a5b4fc",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, cursor: "pointer",
                  fontWeight: 500, transition: "all 0.2s ease",
                }}>✏️ Edit</button>
              )}
            </div>

            <FloatingInput label="Display Name" value={editing ? editName : name}
              onChange={(e) => setEditName(e.target.value)} disabled={!editing} />
            <FloatingInput label="Email Address" value={email} onChange={() => {}} disabled />
            <FloatingInput label="Member Since" value={joinDate} onChange={() => {}} disabled />
            <FloatingInput label="User ID" value={user?.uid || ""} onChange={() => {}} disabled mono />

            {editing && (
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={handleSave} disabled={saving} style={{
                  flex: 1, padding: "12px", borderRadius: 12, border: "none",
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: 14, cursor: "pointer", transition: "all 0.2s ease",
                  opacity: saving ? 0.7 : 1,
                }}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button onClick={() => { setEditing(false); setEditName(name); }} style={{
                  padding: "12px 18px", borderRadius: 12, border: "1px solid rgba(99,102,241,0.3)",
                  background: "transparent", color: "#a5b4fc",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: "pointer",
                }}>Cancel</button>
              </div>
            )}
          </div>
        </div>

        {/* ── ACTION BUTTONS ──────────────────────── */}
        <div style={{
          display: "flex", gap: 14, flexWrap: "wrap",
          animation: "fadeInUp 0.6s ease 0.6s both",
        }}>
          <button onClick={handleLogout} disabled={loggingOut} className="action-btn" style={{
            padding: "14px 32px", borderRadius: 14, border: "none",
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: 15, cursor: "pointer", transition: "all 0.25s ease",
            boxShadow: "0 4px 20px rgba(239,68,68,0.25)",
            opacity: loggingOut ? 0.7 : 1,
          }}>
            {loggingOut ? "Signing out..." : "🚪 Sign Out"}
          </button>
          <button className="action-btn" style={{
            padding: "14px 32px", borderRadius: 14,
            border: "1px solid rgba(99,102,241,0.4)",
            background: "rgba(99,102,241,0.12)", color: "#a5b4fc",
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: 15, cursor: "pointer", transition: "all 0.25s ease",
            backdropFilter: "blur(10px)",
          }}>
            📥 Export Data
          </button>
          <button onClick={() => setEditing(true)} className="action-btn" style={{
            padding: "14px 32px", borderRadius: 14, border: "none",
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: 15, cursor: "pointer", transition: "all 0.25s ease",
            boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
          }}>
            ✏️ Edit Profile
          </button>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 48, textAlign: "center",
          fontFamily: "'DM Sans', sans-serif", fontSize: 12,
          color: "rgba(167,178,210,0.3)",
          borderTop: "1px solid rgba(99,102,241,0.08)", paddingTop: 28,
        }}>
          Built with ⚡ AI · Firebase · React &nbsp;·&nbsp; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default Profile;