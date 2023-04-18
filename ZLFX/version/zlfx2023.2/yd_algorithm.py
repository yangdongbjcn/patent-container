# coding: utf-8

from pandas import Series, DataFrame
import re # getANN1 用到
import numpy as np # getSetSemicolon 用到

class YdAlgorithm(object):
    """ """
    def getItemFunc(self, type):
      t_func = self.getItem
      if (type == 'year'):
        t_func = self.getYear
      if (type == 'ipc1'):
        t_func = self.getIPC1
      if (type == 'ipc3'):
        t_func = self.getIPC3
      if (type == 'ipc4'):
        t_func = self.getIPC4
      if (type == 'nation'):
        t_func = self.getNation
      if (type == 'ann1'):
        # Patentics标准化申请人第一个
        t_func = self.getANN1
      if (type == 'ann1_incopat'):
        # INCOPAT标准化申请人第一个
        t_func = self.getANN1_incopat
      if (type == 'set_semicolon'):
        # INCOPAT标准化申请人第一个
        t_func = self.getSetSemicolon
      return t_func
    
    def getTableFunc(self, type):
      if (type == 'histogram'):
        t_func = self.getHistogram
      return t_func
      
    def getItem(self, item):
      return item

    def getYear(self, item):
      item_str = str(item)
      return item_str[0:4]

    def getIPC1(self, item):
      item_str = str(item)
      return item_str[0:1]

    def getIPC3(self, item):
      item_str = str(item)
      return item_str[0:3]
    
    def getIPC4(self, item):
      item_str = str(item)
      return item_str[0:4]
    
    def getNation(self, item):
      item_str = str(item)
      return item_str[0:2]
    
    def getANN1(self, item):
      fields = re.split('\|',item) # re.match re.search re.split
      t_field = fields[0].strip()
      return t_field

    def getANN1_incopat(self, item):
      t_field = ''
      if isinstance(item, str):  # item非字符串时replace会报错
        item = item.replace('[', '')
        item = item.replace(']', '')
        item = item.replace(' ', '')
        fields = re.split(';',item) # re.match re.search re.split
        t_field = fields[0].strip()
      return t_field
    
    def getSetSemicolon(self, item):
      fields = []
      if isinstance(item, str):  # item非字符串时replace会报错
        item = item.replace(' ', '')
        fields = re.split(';',item) # re.match re.search re.split
      return fields

    def getHistogram(self, table, *a, **kw):
       key = a[0]
       new_key = a[1]
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

    def getNewTableOfSetField(self, table, key, func_arg):
       col = table[key]
       new_list = []
       for item in col:
           # 每一个集合数据拆分后，再拼接为长数组
           t_list = func_arg(item)
           new_list = np.append(new_list,t_list)
       # 将拼接后的长数组，以DataFrame的形式返回，便于后续Container处理
       new_table = DataFrame(new_list,columns=[key])
       return new_table