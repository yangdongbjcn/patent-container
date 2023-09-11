#encoding=utf-8
import xlrd

class c_dict:
    def __init__(self, col_name, col_value):
        self.key_value = {}
        for i in range(len(col_name)):
            self.key_value[col_name[i]] = col_value[i]
    def get_key_value(self, key_name):
        return self.key_value[key_name]

def NIC2Customs_Read(file_name):

    xls_read = xlrd.open_workbook(file_name)        #打开EXCEL
    xls_table = xls_read.sheets()[0]                #打开表
    table_nrows = xls_table.nrows
    table_ncols = xls_table.ncols

    col_name = ['nic2','nic2_name','customs']

    p_list = []
    for i in range(table_nrows):
        t0 = "%03d" % xls_table.cell(i, 0).value
        t1 = xls_table.cell(i, 1).value
        t2 = "%02d" % xls_table.cell(i, 2).value
        col_value = [t0,t1,t2]
        t_dict = c_dict(col_name, col_value)
        p_list.append(t_dict)
    return p_list

def ClassList_Index(class_list, idx, key_name):
    value = []
    for i in range(len(idx)):
        t_idx = idx[i]
        value.append(class_list[t_idx].get_key_value(key_name))
    return value

