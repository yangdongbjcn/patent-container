# coding: utf-8

from pandas import Series, DataFrame

class YdbjAlgorithm(object):
    """ """

    def getHistogram(self, table, key):
       grouped = self.getGrouped(table, key)
       new_series = grouped.size()
       new_key = key + '_histogram'
       new_table = DataFrame(new_series, columns=[new_key])
       new_table.reset_index(inplace=True)
       dict = {'index': key}
       new_table.rename(columns=dict, inplace=True)
       return new_table

    def getGrouped(self, table, key):
       grouped = table.groupby(by=key, as_index=False)
       return grouped

    def getGroupProperty(self, table, key, func_arg):
       grouped = self.getGrouped(table, key)
       new_obj = {}
       for name, group in grouped:
           new_obj[name] = func_arg(group)
       new_series = Series(new_obj)
       new_key = key + '_property'
       new_table = DataFrame(new_series, columns=[new_key])
       new_table.reset_index(inplace=True)
       dict = {'index': key}
       new_table.rename(columns=dict, inplace=True)
       return new_table

    def addGroupId(self, table, key):
       grouped = self.getGrouped(table, key)
       ngroup = grouped.ngroup()
       new_key = key + '_group'
       table[new_key] = ngroup
       return table

    def addColProperty(self, table, key, func_arg):
       # grouped = self.getGrouped(table, key)
       col = table[key]
       new_list = []
       for item in col:
           new_list.append(func_arg(item))
       new_key = key + '_property'
       table[new_key] = new_list
       return table

