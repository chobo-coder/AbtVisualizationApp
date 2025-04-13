import pandas as pd
def get_example_dataframe() -> pd.DataFrame:
    """
    make example DataFrame
    """
    data = {
        "run": ["sales", "sales", "sales", "traffic", "traffic", "errors", "errors", "errors"],
        "index": [0, 1, 2, 0, 1, 0, 1, 2],
        "value": [100, 150, 130, 300, 340, 5, 3, 6]
    }
    return pd.DataFrame(data)