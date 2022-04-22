# coding: utf-8

from pandas import Series, DataFrame

class YdAlgorithm(object):
    """ """

    def getHistogram(self, table, key, new_key):
       # new_key = key + '_histogram'
       groupby_object = self.getGrouped(table, key)
       df_label_num = groupby_object.size()
       dict = {'size': new_key}
       df_label_num.rename(columns=dict, inplace=True)
       return df_label_num

    def getGrouped(self, table, key):
       groupby_object = table.groupby(by=key, as_index=False)
       return groupby_object

    def getGroupProperty(self, table, key, new_key, func_arg):
       # 20211220 YDBK untested
       # new_key = key + '_property'
       groupby_object = self.getGrouped(table, key)
       key_col = []
       new_key_col = []
       for name, group in groupby_object:
           key_col.append(name)
           new_key_col.append(func_arg(group))
       new_table = DataFrame([key_col, new_key_col], columns=[key, new_key])
       return new_table

    def addGroupId(self, table, key, new_key):
       # 20211220 YDBK untested
       # new_key = key + '_group'
       groupby_object = self.getGrouped(table, key)
       ngroup = groupby_object.ngroup()
       table[new_key] = ngroup
       return table

    def addColProperty(self, table, key, new_key, func_arg):
       # new_key = key + '_property'
       col = table[key]
       new_list = []
       for item in col:
           new_list.append(func_arg(item))
       table[new_key] = new_list
       return table

