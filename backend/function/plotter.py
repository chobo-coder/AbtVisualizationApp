import matplotlib.pyplot as plt
import pandas as pd
import numpy as np 
import os
from datetime import datetime

def format_bytes(size: int) -> str:
    """
    바이트 단위를 사람이 읽기 쉬운 형식(KB, MB 등)으로 변환
    """
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size < 1024.0:
            return f"{size:.1f} {unit}"
        size /= 1024.0
    return f"{size:.1f} TB"

def clear_directory(base_dir: str):
    if not os.path.exists(base_dir):
        #print(f"️ directory does not exists: {base_dir}")
        return

    deleted_count = 0
    for filename in os.listdir(base_dir):
        file_path = os.path.join(base_dir, filename)

        if os.path.isfile(file_path):
            os.remove(file_path)
            print(f"remove: {file_path}")
            deleted_count += 1

    print(f"deletefile count: {deleted_count},({base_dir})")

def generate_plot(run: str, data: list[float],overwrite = False):
    print(data)
    """
    주어진 데이터로 PNG 그래프 생성 (output/plots/run 폴더에 저장)
    """
    # 경로 조립: output/plots/<run>/
    base_dir = os.path.join(os.path.dirname(__file__),"..",'output',"plots",run) 
    print(os.path.join(os.path.dirname(__file__)))
    if os.path.exists(base_dir):
        if overwrite:
            pass
        else:
            return None

    os.makedirs(base_dir, exist_ok=True)
    clear_directory(base_dir)
    # 파일명: <run>_scatterplot_<timestamp>.png
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{run}_scatterplot_{timestamp}.png"
    filepath = os.path.join(base_dir, filename)

    # 그래프 생성 및 저장
    plt.figure()
    plt.plot(data, marker="o")
    plt.title(f"run: {run}")
    plt.xlabel("Index")
    plt.ylabel("Value")
    plt.savefig(filepath)
    plt.close()

    size_bytes = os.path.getsize(filepath)
    readable_size = format_bytes(size_bytes)

    print(f" Saved plot: {filepath} ({readable_size})")
