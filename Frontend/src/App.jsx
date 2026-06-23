import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Plans from "./pages/Plans"; // ✅ Import the Plans page
import Architecture from "./pages/Architecture";
import Intelligence from "./pages/Intelligence";
import Memory from "./pages/Memory";
import Knowledge from "./pages/Knowledge";
import Privacy from "./pages/Privacy";
import Research from "./pages/Research";
import Roadmap from "./pages/Roadmap";
import Demo from "./pages/Demo";
import Manifesto from "./pages/Manifesto";
import Footer from "./pages/footer";
import { auth } from "./firebase"; // Import Firebase auth for logout

function AppContent() {
  const location = useLocation();
  const hideNavigation = ["/chat", "/login"].includes(location.pathname);

  const handleLogout = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("user");
    }).catch((error) => {
      console.error("Logout failed:", error);
    });
  };

  return (
    <>
      {!hideNavigation && <Navbar handleLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login handleLogin={() => {}} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/intelligence" element={<Intelligence />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/research" element={<Research />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/manifesto" element={<Manifesto />} />
      </Routes>
      {!hideNavigation && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;