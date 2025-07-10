import React from "react";

const mockCategories = [
  { id: "1", name: "ケーブル" },
  { id: "2", name: "パソコン" },
  { id: "3", name: "プロジェクター" },
  { id: "4", name: "工具" },
];

const CategoryView: React.FC = () => {
  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      <h2 style={{ textAlign: "center" }}>カテゴリ一覧</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {mockCategories.map((cat) => (
          <li key={cat.id} style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryView; 