# -*- coding:utf-8 -*-
from __future__ import unicode_literals


from PATENT2ECONOMY_IPC2NIC import *
from PATENT2ECONOMY_NIC2CUSTOMS import *


from yd_container import *
from yd_excel import *
node_rawdata = Yd_container('master')
# 如果您下载了专利数据库导出的电子表格文件，【第一行】必须是字段名，例如申请日、公开日等等
t_data_name = u'走出去申请人'
t_patent_folder = u'data//' + t_data_name + '//'
t_result_folder = u'data//分析结果//'
t_filename = t_result_folder + t_data_name
t_fileext = '.xlsx'
node_rawdata.addFolderNode(t_patent_folder)

IPC2NIC_Path = u'data//' + "IPC2NIC//"

import sys
sys.path.append(t_patent_folder)
sys.path.append(IPC2NIC_Path)
sys.path.append(IPC2NIC_Path)

if __name__ == '__main__':  # 以下为主程序

    key = u'公开（公告）号'
    feature_type = 'nation'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = node_rawdata.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    excel_names = ['2015.xls','2014.xls','2013.xls']
    #excel_names = ['2016.xls']
    for excel_name in excel_names:
        excel_file = t_patent_folder + excel_name
        print "读取文件", excel_file
        p_list = PatentExcelRead(excel_file)

        ipc1_list = ClassList_Index(p_list,range(len(p_list)),'ipc1')
        [nic1_list, name1_list, nic_name_string_list] = IPC2NIC(ipc1_list, IPC2NIC_Path)

        apn_list = ClassList_Index(p_list,range(len(p_list)),'apn')
        title_list = ClassList_Index(p_list,range(len(p_list)),'title')
        ipc_class_list = ClassList_Index(p_list,range(len(p_list)),'ipc_class')

        customs_list = NIC2Customs(nic1_list, IPC2NIC_Path)

        sheet_col_data = [apn_list, title_list, ipc_class_list, ipc1_list, nic1_list, name1_list, customs_list]

        #ExcelSaveSheets(sheet_names, sheet_col_data)
        ExcelSave(excel_file, sheet_col_data)


