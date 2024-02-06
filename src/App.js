import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState(""); // 이미지 설명 상태
  const [imageURL, setImage] = useState(""); // 이미지 URL 상태

  // 이미지 생성 요청을 서버로 보내는 함수
  const createImg = async () => {
    try {
      // 서버의 '/create' 엔드포인트로 POST 요청을 보냄
      const response = await axios.post("http://localhost:8080/create", {
        prompt,
      });

      // 응답에서 이미지 URL을 추출하여 상태 업데이트
      setImage(response.data);
    } catch (error) {
      console.error("Error during image creation:", error.message);
    }
  };

  // 입력 값이 변경될 때 호출되는 함수
  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="form">
        <h1>당신의 예술 작품을 만드세요!</h1>
        {imageURL && <img src={imageURL} alt="prompt" />} {/* 이미지 표시 */}
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="이미지 설명을 입력하세요"
          />
          <button type="submit" className="btn btn-primary" onClick={createImg}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
