import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // ダミー認証: そのままホームへ遷移
    navigate("/home");
  };

  return (
    <div style={{ maxWidth: 360, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      <h2 style={{ textAlign: "center" }}>サインアップ</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit" style={{ width: "100%", padding: 10, background: "#388e3c", color: "#fff", border: "none", borderRadius: 4, fontWeight: "bold" }}>
          サインアップ
        </button>
      </form>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <span>すでにアカウントをお持ちの方は </span>
        <a href="/login" style={{ color: "#1976d2" }}>ログイン</a>
      </div>
    </div>
  );
};

export default Signup; 