import pandas as pd

default_dataset = "server/data/december_2022_crimes.csv"


def get_crimes_by_date(df, start, end):
    eligible = df.loc[(df['DATE'] >= start)
                      & (df['DATE'] <= end)]
    return eligible


def get_crimes_by_field(df, column, values):
    eligible = df[df[column].isin(values)]
    return eligible.apply(lambda x: x.to_json(), axis=1)


def get_reports(quarts = None, categories= None, start="2023-02-01", end="2015-01-01"):
    result = get_crimes_by_date(pd.read_csv(default_dataset), start, end)
    if quarts is not None:
        result = get_crimes_by_field(result, "QUART", quarts)
    if categories is not None:
        result = get_crimes_by_date(result, "CATEGORIE", categories)
    return result
