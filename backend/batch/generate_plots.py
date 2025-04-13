# batch/generate_plots.py
#%%
import matplotlib.pyplot as plt
import pandas as pd
import os
from datetime import datetime
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__),'..','function')))
import plotter
import parser 

#%%

if __name__ == "__main__":
    df = parser.get_example_dataframe()
    # run별 그룹화하여 각 그래프 생성
    grouped = df.groupby("run")
    for run, group in grouped:
        plotter.generate_plot(run,group["value"].tolist(),overwrite =True)



# %%
