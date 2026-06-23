import React, { useEffect, useState } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import auraosLogo from "../assets/auraos_logo.png";
import "./AuraOSHome.css"; // Reuse Apple design tokens

const Login = ({ handleLogin }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [termsChecked, setTermsChecked] = useState(false);
  
  const navigate = useNavigate();

  // Auth state watcher
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && storedUser) localStorage.removeItem("user");
      else if (user && storedUser) { setIsAlreadyLoggedIn(true); navigate("/chat"); }
    });
    return () => unsubscribe();
  }, [navigate]);

  const isValidGmail = (e) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(e);
  const isStrongPassword = (p) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(p);

  const resetMessages = () => { setErrorMsg(""); setSuccessMsg(""); };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("Use a valid Gmail address");
    if (!isStrongPassword(password)) return setErrorMsg("Password needs upper, lower, digit & symbol.");
    if (!termsChecked) return setErrorMsg("Please accept the Privacy Policy.");
    
    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      try { await sendEmailVerification(cred.user); } catch (e) { console.warn(e); }
      const formattedUser = { name: cred.user.displayName || email.split("@")[0], email: cred.user.email, uid: cred.user.uid, photo: cred.user.photoURL || null };
      if (rememberMe) localStorage.setItem("user", JSON.stringify(formattedUser));
      setSuccessMsg("Signup successful! Verification email sent.");
      handleLogin && handleLogin();
      navigate("/chat");
    } catch (error) {
      setErrorMsg("Signup failed: " + (error.message || "Unknown"));
    } finally { setLoading(false); }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("Use a valid Gmail address");
    try {
      setLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const formattedUser = { name: cred.user.displayName || email.split("@")[0], email: cred.user.email, uid: cred.user.uid, photo: cred.user.photoURL || null };
      if (rememberMe) localStorage.setItem("user", JSON.stringify(formattedUser));
      else localStorage.removeItem("user");
      handleLogin && handleLogin();
      navigate("/chat");
    } catch (error) {
      setErrorMsg("Authentication failed. Check credentials.");
    } finally { setLoading(false); }
  };

  const handleSocialLogin = async (provider, providerName) => {
    resetMessages();
    if (loading) return;
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const formattedUser = { name: user.displayName || user.email?.split("@")[0], email: user.email, uid: user.uid, photo: user.photoURL };
      if (rememberMe) localStorage.setItem("user", JSON.stringify(formattedUser));
      handleLogin && handleLogin();
      navigate("/chat");
    } catch (error) {
      setErrorMsg(`${providerName} login failed. Try again.`);
    } finally { setLoading(false); }
  };

  const handleForgotPassword = async () => {
    resetMessages();
    if (!isValidGmail(email)) return setErrorMsg("Enter a valid Gmail first.");
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("Password reset link sent to your inbox.");
    } catch (error) {
      setErrorMsg("Reset failed: " + (error.message || "Unknown"));
    } finally { setLoading(false); }
  };

  if (isAlreadyLoggedIn) return null;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--gray-light)",
      fontFamily: "var(--font)"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 420,
        backgroundColor: "var(--white)",
        padding: "48px 40px",
        borderRadius: "24px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        textAlign: "center"
      }}>
        <Link to="/">
            <img src={auraosLogo} alt="AuraOS" style={{ width: 48, height: 48, marginBottom: 20 }} />
        </Link>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--charcoal)", marginBottom: 8, letterSpacing: "-0.015em" }}>
          {mode === "login" ? "Sign in to AuraOS" : "Create your Aura ID"}
        </h1>
        <p style={{ fontSize: 15, color: "var(--gray-mid)", marginBottom: 32 }}>
          {mode === "login" ? "Welcome back. Please enter your details." : "Enter your details to register."}
        </p>

        {errorMsg && (
          <div style={{ padding: "12px", borderRadius: "10px", backgroundColor: "#fef2f2", color: "#dc2626", fontSize: 13, marginBottom: 20 }}>
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div style={{ padding: "12px", borderRadius: "10px", backgroundColor: "#f0fdf4", color: "#16a34a", fontSize: 13, marginBottom: 20 }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={mode === "login" ? handleEmailLogin : handleEmailSignup} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          <div style={{ textAlign: "left" }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: 16,
                borderRadius: "12px",
                border: "1px solid var(--gray-border)",
                outline: "none",
                fontFamily: "var(--font)",
                color: "var(--charcoal)",
                backgroundColor: "var(--white)",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--blue)"}
              onBlur={(e) => e.target.style.borderColor = "var(--gray-border)"}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: 16,
                borderRadius: "12px",
                border: "1px solid var(--gray-border)",
                outline: "none",
                fontFamily: "var(--font)",
                color: "var(--charcoal)",
                backgroundColor: "var(--white)",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--blue)"}
              onBlur={(e) => e.target.style.borderColor = "var(--gray-border)"}
            />
          </div>

          {mode === "signup" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, textAlign: "left", marginTop: 4 }}>
              <input 
                type="checkbox" 
                id="terms" 
                checked={termsChecked} 
                onChange={e => setTermsChecked(e.target.checked)} 
                style={{ width: 16, height: 16, accentColor: "var(--blue)", cursor: "pointer" }}
              />
              <label htmlFor="terms" style={{ fontSize: 13, color: "var(--gray-mid)", cursor: "pointer", userSelect: "none" }}>
                I agree to the <Link to="/privacy" style={{ color: "var(--blue)", textDecoration: "none" }}>Privacy Policy</Link>
              </label>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, textAlign: "left", marginTop: mode === "login" ? 4 : 0 }}>
              <input 
                type="checkbox" 
                id="rememberMe" 
                checked={rememberMe} 
                onChange={e => setRememberMe(e.target.checked)} 
                style={{ width: 16, height: 16, accentColor: "var(--blue)", cursor: "pointer" }}
              />
              <label htmlFor="rememberMe" style={{ fontSize: 13, color: "var(--gray-mid)", cursor: "pointer", userSelect: "none" }}>
                Remember me
              </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", padding: "16px", marginTop: 8, fontSize: 16 }}
          >
            {loading ? "Please wait..." : (mode === "login" ? "Sign In" : "Register")}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "28px 0" }}>
          <div style={{ flex: 1, height: 1, backgroundColor: "var(--gray-border)" }}></div>
          <span style={{ fontSize: 13, color: "var(--gray-tertiary)", fontWeight: 500 }}>OR</span>
          <div style={{ flex: 1, height: 1, backgroundColor: "var(--gray-border)" }}></div>
        </div>

        <button 
          onClick={() => handleSocialLogin(googleProvider, "Google")}
          disabled={loading}
          className="btn-secondary"
          style={{ width: "100%", padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 16 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19.01 23.7449 15.92 23.7449 12.27Z"/>
            <path fill="#34A853" d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.1249 19.25 6.4749 17.14 5.5249 14.29H1.54492V17.38C3.51492 21.3 7.5649 24 12.2549 24Z"/>
            <path fill="#FBBC05" d="M5.5249 14.29C5.2749 13.57 5.1449 12.8 5.1449 12C5.1449 11.2 5.2749 10.43 5.5249 9.71V6.62H1.54492C0.724922 8.24 0.254902 10.06 0.254902 12C0.254902 13.94 0.724922 15.76 1.54492 17.38L5.5249 14.29Z"/>
            <path fill="#EA4335" d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.5649 0 3.51492 2.7 1.54492 6.62L5.5249 9.71C6.4749 6.86 9.1249 4.75 12.2549 4.75Z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, fontSize: 14 }}>
          <button 
            type="button" 
            onClick={handleForgotPassword}
            style={{ background: "none", border: "none", color: "var(--blue)", cursor: "pointer" }}
          >
            Forgot Password?
          </button>
          
          <button 
            type="button" 
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); resetMessages(); }}
            style={{ background: "none", border: "none", color: "var(--blue)", cursor: "pointer" }}
          >
            {mode === "login" ? "Create Aura ID" : "Back to Sign In"}
          </button>
        </div>

      </div>
      
      <div style={{ marginTop: 48, fontSize: 12, color: "var(--gray-tertiary)" }}>
        <Link to="/privacy" style={{ color: "inherit", textDecoration: "none", margin: "0 12px" }}>Privacy Policy</Link>
        |
        <Link to="/about" style={{ color: "inherit", textDecoration: "none", margin: "0 12px" }}>Terms of Use</Link>
      </div>
    </div>
  );
};

export default Login;