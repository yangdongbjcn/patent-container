# coding: utf-8

from yd_container import *

from yd_excel import *

if __name__ == '__main__':

    node_rawdata = Yd_container('master')

    # 如果您下载了专利数据库导出的电子表格文件，【第一行】必须是字段名，例如申请日、公开日等等

    t_data_name = u'通用自动驾驶'
    t_patent_folder = u'data//' + t_data_name + '//'
    t_result_folder = u'data//分析结果//'
    t_filename = t_result_folder + t_data_name
    t_fileext = '.xlsx'
    node_rawdata.addFolderNode(t_patent_folder)

    key = u'公开（公告）号'
    feature_type = 'nation'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = node_rawdata.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'申请日'
    feature_type = 'year'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = node_rawdata.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'标准化申请人'
    #feature_type = 'ann1' ##Patentics
    feature_type = 'ann1_incopat' ##Incopat
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = node_rawdata.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)
    
    key = u'IPC主分类'
    feature_type = 'ipc4'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = node_rawdata.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'当前法律状态'
    feature_type = 'item'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = node_rawdata.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'专利有效性'
    feature_type = 'item'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = node_rawdata.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'公开国别'
    feature_type = 'item'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = node_rawdata.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'国民经济分类'
    feature_type = 'set_semicolon'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = node_rawdata.analysisPatentSetField(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'新兴产业分类'
    feature_type = 'set_semicolon'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = node_rawdata.analysisPatentSetField(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)
