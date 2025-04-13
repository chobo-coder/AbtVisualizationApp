import { useState } from "react";

const backendBaseUrl = "http://localhost:8000";

export default function PlotViewer() {
  const [input, setInput] = useState("RUN");     // 입력 필드 값
  const [category, setCategory] = useState("sales"); // 실제 fetch에 쓰일 값
  const [files, setFiles] = useState([]);

  const fetchFiles = (categoryToFetch) => {
    const url = `${backendBaseUrl}/api/list-images?category=${categoryToFetch}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []);
        console.log("✅ 가져온 파일:", data.files);
      })
      .catch((err) => {
        console.error("❌ fetch 에러:", err);
        setFiles([]);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmed = input.trim();
      if (trimmed !== "") {
        setCategory(trimmed);   // UI용 상태도 바꾸고
        fetchFiles(trimmed);    // fetch 요청 실행
      }
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📂 카테고리 이미지 목록</h2>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="예: sales, errors, traffic"
        style={{ padding: "0.5rem", marginBottom: "1rem" }}
      />

      <div>
        {files.length === 0 ? (
          <p>⚠️ 이미지가 없습니다.</p>
        ) : (
          files.map((filename) => (
            <div key={filename} style={{ marginBottom: "1rem" }}>
              <img
                src={`${backendBaseUrl}/images/plots/${category}/${filename}`}
                alt={filename}
                width="600"
                style={{ border: "1px solid #ccc", borderRadius: "8px" }}
              />
              <p style={{ fontSize: "0.8rem" }}>
                <code>{filename}</code>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
