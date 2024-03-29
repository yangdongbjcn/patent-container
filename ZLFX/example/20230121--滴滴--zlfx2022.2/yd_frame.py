# coding: utf-8

from yd_algorithm import *

import pandas
from pandas import DataFrame

from datetime import datetime

class Yd_frame(object):
    """ """
    def __init__(self, table = DataFrame(), name = ''):
        self.name = name
        self.table = table

    # row
    def getRowNum(self):
        return self.table.iloc[:, 0].size
    def getRows(self, i):
        # i=10, i=0:10
        return self.table.iloc[i, :]
    def addRows(self, table):
        self.table = self.table.append(table, ignore_index = True)   # 避免多次添加索引
        # self.table = pandas.concat(self.table, table, ignore_index = True)

    # col
    def renameKeys(self, dict):
        self.table.rename(columns=dict, inplace=True)
    def setIndex(self, key):
        self.table.set_index(key, inplace=True)
    def resetIndex(self):
        self.table.reset_index(inplace=True)
    def getColNum(self):
        return self.table.columns.size
    def getCol(self, key):
        return self.table[key]
    def getCols(self, keys):
        return self.table.loc[:, keys]
    def setCol(self, key, value):
        self.table[key] = value
    def addCol(self, key, value):
        self.setCol(key, value)
    def mergeCol(self, table, suffixes = ('_x', '_y')):
       self.table = pandas.merge(self.table, table, left_index = True, right_index = True, suffixes = suffixes)
       return

    # time
