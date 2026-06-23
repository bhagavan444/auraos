import { auth } from "../firebase";

const API_BASE = "http://localhost:5000/api";

const getAuthHeaders = async (additionalHeaders = {}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const token = await user.getIdToken();
  return {
    "Authorization": `Bearer ${token}`,
    ...additionalHeaders
  };
};

export const api = {
  system: {
    health: async () => {
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error("Health check failed");
      return res.json();
    },
    dashboard: async () => {
      const res = await fetch(`${API_BASE}/dashboard`, { headers: await getAuthHeaders() });
      if (!res.ok) throw new Error("Dashboard fetch failed");
      return res.json();
    }
  },
  
  chat: {
    list: async () => {
      const res = await fetch(`${API_BASE}/chats`, { headers: await getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch chats");
      return res.json();
    },
    get: async (id) => {
      const res = await fetch(`${API_BASE}/chats/${id}`, { headers: await getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to load chat");
      return res.json();
    },
    create: async () => {
      console.log("Creating chat...");
      const url = `${API_BASE}/chats`;
      console.log("Request URL:", url);
      const res = await fetch(url, {
        method: "POST",
        headers: await getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ message: "New chat" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create chat");
      }
      return res.json();
    },
    send: async (payload, isFormData = false) => {
      let options = { 
        method: "POST",
        headers: await getAuthHeaders(isFormData ? {} : { "Content-Type": "application/json" })
      };
      
      if (isFormData) {
        options.body = payload;
      } else {
        options.body = JSON.stringify(payload);
      }
      
      const res = await fetch(`${API_BASE}/chat`, options);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err.reply || err.error || err.message || `Server error (${res.status})`;
        throw new Error(msg);
      }
      return res.json();
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE}/chats/${id}`, { method: "DELETE", headers: await getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to delete chat");
      return res.json();
    },
    deleteAll: async () => {
      const res = await fetch(`${API_BASE}/chats`, { method: "DELETE", headers: await getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to clear chats");
      return res.json();
    },
    rename: async (id, title) => {
      const res = await fetch(`${API_BASE}/chats/${id}`, {
        method: "PUT",
        headers: await getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ title })
      });
      if (!res.ok) throw new Error("Failed to rename chat");
      return res.json();
    },
    search: async (query) => {
      const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`, { headers: await getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to search chats");
      return res.json();
    }
  },
  
  memory: {
    list: async () => {
      const res = await fetch(`${API_BASE}/memory/list`, { headers: await getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch memories");
      return res.json();
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE}/memory/delete/${id}`, { method: "DELETE", headers: await getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to delete memory");
      return res.json();
    }
  },
  
  knowledge: {
    list: async () => {
      const res = await fetch(`${API_BASE}/knowledge/list`, { headers: await getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to fetch knowledge vault");
      return res.json();
    },
    upload: async (file) => {
      const fd = new FormData();
      fd.append("file", file);
      
      const res = await fetch(`${API_BASE}/knowledge/upload`, {
        method: "POST",
        headers: await getAuthHeaders(),
        body: fd
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Upload failed");
      }
      return res.json();
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE}/knowledge/delete/${id}`, { method: "DELETE", headers: await getAuthHeaders() });
      if (!res.ok) throw new Error("Failed to delete document");
      return res.json();
    }
  }
};
