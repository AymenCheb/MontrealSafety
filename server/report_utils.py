import pandas as pd
import numpy as np
import os

default_dataset = os.path.join('data', 'january.csv')


def get_crimes_by_date(df, start, end):
    eligible = df.loc[(df['DATE'] >= start)
                      & (df['DATE'] <= end)]
    return eligible


def get_crimes_by_field(df, column, values):
    return df[df[column].isin(values)]


def get_reports(quarts=None, categories=None, start="2015-01-01", end="2023-02-01"):
    result = get_crimes_by_date(pd.read_csv(default_dataset), start, end)
    if quarts is not None:
        result = get_crimes_by_field(result, "QUART", quarts)
    if categories is not None:
        result = get_crimes_by_field(result, "CATEGORIE", categories)

    return np.array(result.apply(lambda x: x.to_json(), axis=1)).tolist()