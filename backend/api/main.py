from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()  # ✅ 먼저 선언되어야 함
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 정적 이미지 서빙
base_dir = os.path.dirname(__file__)
output_dir = os.path.abspath(os.path.join(base_dir, "..", "output"))
app.mount("/images", StaticFiles(directory=output_dir), name="images")

# ✅ 이 아래부터 라우터 등록
@app.get("/")
def root():
    return {"message": "Hello FastAPI"}

@app.get("/api/list-images")
def list_images(category: str):
    folder_path = os.path.join(output_dir, "plots", category)
    print(folder_path)


    if not os.path.isdir(folder_path):
        return JSONResponse(content={"files": []}, status_code=200)

    files = [f for f in os.listdir(folder_path) if f.endswith(".png")]
    files.sort()

    print({"files": files})
    return {"files": files}
