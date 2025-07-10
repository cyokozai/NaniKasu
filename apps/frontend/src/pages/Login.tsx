import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../lib/supabase'

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // ダミー認証: そのままホームへ遷移
    navigate("/home");
  };

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
  }

  return (
    <div style={{ maxWidth: 360, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      <h2 style={{ textAlign: "center" }}>ログイン</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 16 }}>
          <label>メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: 10, background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, fontWeight: "bold" }}>
          ログイン
        </button>
      </form>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <span>アカウントをお持ちでない方は </span>
        <a href="/signup" style={{ color: "#1976d2" }}>サインアップ</a>
      </div>
      <button onClick={() => handleOAuthLogin('google')}>Googleでサインイン</button>
      <button onClick={() => handleOAuthLogin('github')}>GitHubでサインイン</button>
    </div>
  );
};

export default Login; 