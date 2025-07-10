import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  if (!user) return <p>ユーザー情報がありません</p>;
  return (
    <div style={{ marginTop: 24 }}>
      <h3>ユーザー情報</h3>
      <p>ID: {user.id}</p>
      <p>メール: {user.email}</p>
      <button onClick={signOut}>サインアウト</button>
    </div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 360, margin: "40px auto", padding: 24, textAlign: "center" }}>
      <h2>ようこそ！</h2>
      <p>これは仮のホーム画面です。</p>
      <button style={{ margin: "16px 0", padding: "10px 20px", fontWeight: "bold" }} onClick={() => navigate("/categories")}>カテゴリ一覧を見る</button>
      <UserProfile />
    </div>
  );
};

export default Home; 