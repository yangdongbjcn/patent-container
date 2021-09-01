#encoding=utf-8

import os

import xlrd
import xlwt
from xlutils.copy import copy

from datetime import datetime

import pandas

class Yd_sheet(object):
    """"""
    def loadSheet(self, file_name, start_row = 0):
        file_ext = self.getFileExt(file_name)
        table = None
        if (file_ext in [u'csv']):
          table = pandas.read_csv(file_name, header = start_row, encoding='utf-8')
          # convert_float is false, to deal with #NUM! in excel file
        elif (file_ext in [u'xls', u'xlsx']):
          table = pandas.read_excel(file_name, header = start_row)
        return table

    def saveSheet(self, file_name, table):
        file_ext = self.getFileExt(file_name)
        if (file_ext in [u'csv']):
            table.to_csv(file_name)
        elif (file_ext in [u'xls', u'xlsx']):
            table.to_excel(file_name)

    def saveSheet2(self, file_name, table):
        key_cols = table.keys()
        value_cols = table.values
        sheet_new = Yd_sheet()
        sheet_new.openFile(file_name = file_name)
        sheet_new.addSheet()
        sheet_new.writeRow(key_cols)
        sheet_new.writeMatrix(value_cols)
        sheet_new.closeFile()

    def getFileExt(self, file_name):
        file_ext = os.path.splitext(file_name)[1]
        file_ext = file_ext.replace('.', '')
        file_ext = file_ext.lower()
        return file_ext

    def openFile(self, file_name):
        self.file_name = file_name
        if not (os.path.isfile(file_name)):
            xls_write = xlwt.Workbook()
            xls_read = None
        else:
            xls_read = xlrd.open_workbook(file_name)
            xls_write = copy(xls_read)
            xls_read = xls_read
        self.xls_read = xls_read
        self.xls_write = xls_write

    def addSheet(self, sheet_name = ''):
        if (sheet_name == ''):
            sheet_name = datetime.now().strftime('%Y%m%d-%Hh%Mm%Ss')
        self.sheet_write = self.xls_write.add_sheet(sheet_name, cell_overwrite_ok=True)
        self.row_num = 0

    def openSheet(self, sheet_name):
        self.sheet_name = sheet_name
        xls_read = self.xls_read
        xls_write = self.xls_write
        if (xls_read is None):
            sheet_write = xls_write.add_sheet(sheet_name, cell_overwrite_ok=True)
        else:
            # sheet_read = xls_read.sheet_by_name(sheet_name)
            sheet_index = xls_read.sheet_names().index(sheet_name)
            sheet_write = xls_write.get_sheet(sheet_index)
        self.sheet_write = sheet_write
        self.row_num = self.getRowNum()

    def writeRow(self, sheet_col_data):
        for j in range(0, len(sheet_col_data)):
            self.sheet_write.write(self.row_num, j, sheet_col_data[j])
        self.row_num = self.row_num + 1

    def writeMatrix(self, sheet_col_data):
        row_num = self.row_num
        for i in range(0,len(sheet_col_data)):
            col_data = sheet_col_data[i]
            for j in range(0,len(col_data)):
                self.writeCell(i + row_num, j, col_data[j])
        if (len(sheet_col_data) > 1):
            row_num = row_num + len(sheet_col_data[0])
        self.row_num = row_num

    def writeCell(self, row, col, value):
        try:
            self.sheet_write.write(row, col, value)
        except:
            self.sheet_write.write(row, col, float(value))

    def getRowNum(self):
        xls_read = self.xls_read
        sheet_name = self.sheet_name
        if (xls_read is None):
            row_num = 0
        else:
            sheet_read = xls_read.sheet_by_name(sheet_name)
            row_num = sheet_read.nrows
        return row_num

    def closeFile(self):
        self.xls_write.save(self.file_name)