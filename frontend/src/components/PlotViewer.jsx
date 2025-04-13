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
        console.log(" 가져온 파일:", data.files);
      })
      .catch((err) => {
        console.error(" fetch 에러:", err);
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
      <h2 style={{ fontSize: "12px" }}>{category} 시각화 뷰어</h2>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="예: sales, errors, traffic"
        style={{ padding: "0.5rem", marginBottom: "1rem" }}
      />

      <div
        style={{
          maxHeight: "600px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
          background: "#fafafa"
        }}
      >
        {files.length === 0 ? (
          <p> 이미지가 없습니다.</p>
        ) : (
          files.map((filename) => (
            <div key={filename} style={{ marginBottom: "1rem" }}>
              <img
                src={`${backendBaseUrl}/images/plots/${category}/${filename}`}
                alt={filename}
                style={{
                  display: "block",
                  width: "100vw",        // 👉 전체 뷰포트 너비
                  height: "auto",        // 👉 세로 비율 유지
                  margin: 0,
                  padding: 0,
                  border: "none",        // (선택) 테두리 제거
                  borderRadius: 0        // (선택) 둥근 모서리 제거
                }}
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
