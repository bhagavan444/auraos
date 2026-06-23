import React from 'react';

export default function StatusCard({ dashboardStats }) {
  return (
    <div style={{
      background: "var(--bg-elevated)",
      margin: "12px 16px",
      padding: "12px",
      borderRadius: "var(--r-md)",
      border: "1px solid var(--border)",
      fontSize: "12px",
      color: "var(--text-secondary)"
    }}>
      <div style={{ fontWeight: 600, marginBottom: "8px", color: "var(--text-primary)" }}>
        AuraOS Status
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span>Active Chats</span>
        <span style={{ fontWeight: 600 }}>{dashboardStats.chat_count || 0}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span>Memories</span>
        <span style={{ fontWeight: 600 }}>{dashboardStats.memory_count || 0}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Knowledge Docs</span>
        <span style={{ fontWeight: 600 }}>{dashboardStats.knowledge_count || 0}</span>
      </div>
    </div>
  );
}
