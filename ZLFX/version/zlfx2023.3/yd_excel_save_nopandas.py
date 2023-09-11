#encoding=utf-8
import os
import xlrd
import xlwt
from xlutils.copy import copy
import simplejson
from datetime import date, datetime

def ExcelSave(save_xls_name, sheet_col_data):

    time_string = datetime.now().strftime('%Y%m%d-%Hh%Mm%Ss')  # 新建一个工作表，以当前日期时间命名

    if not (os.path.isfile(save_xls_name)):
        xls_write_copy=xlwt.Workbook()
    else:
        xls_write = xlrd.open_workbook(save_xls_name)  # 读权限，打开一个工作簿
        xls_write_copy = copy(xls_write)  # 读权限打开的工作簿不能直接写入

    sheet_new = xls_write_copy.add_sheet(time_string,cell_overwrite_ok=True) #创建sheet

    for i in range(0,len(sheet_col_data)):
        col_data = sheet_col_data[i]
        for j in range(0,len(col_data)):
            sheet_new.write(j, i, col_data[j])

    xls_write_copy.save(save_xls_name)  # 保存


    print(u"A new sheet "+time_string+u" is added to file "+save_xls_name)
    return True

def ExcelSaveSheets(sheet_names, sheet_col_data):
    f = xlwt.Workbook() #创建工作簿

    for i in range(0,len(sheet_names)):
        sheet_name = sheet_names[i]
        sheet_new = f.add_sheet(sheet_name,cell_overwrite_ok=True) #创建sheet
        col_data = sheet_col_data[i]
        for j in range(0,len(col_data)):
            sheet_new.write(j, 0, col_data[j])

    time_string = datetime.now().strftime('%Y%m%d-%Hh%Mm%Ss')   #新建一个工作表，以当前日期时间命名
    save_xls_name = time_string + '.xls'
    f.save(save_xls_name) #保存文件

    print(u"A file "+save_xls_name+u" is created.")
    return True
