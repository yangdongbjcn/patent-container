# coding: utf-8

from yd_container import *

from yd_excel import *

if __name__ == '__main__':

    master_node = Yd_container('master')

    t_filename = u'data//虚拟现实//20220507--CNAPP-TI=虚拟现实'
    t_fileext = '.csv'
    master_node.frame.table = Yd_excel().loadSheet(t_filename + t_fileext, start_row=0)

    key = u'公开号'
    feature_type = 'nation'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = master_node.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'申请日'
    feature_type = 'year'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = master_node.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'公开日'
    feature_type = 'year'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = master_node.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)
    
    key = u'授权公告日'
    feature_type = 'year'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = master_node.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'国际分类'
    feature_type = 'ipc4'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = master_node.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'权利要求数'
    feature_type = 'item'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = master_node.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)

    key = u'标准化申请人'
    feature_type = 'ann1'
    statistics_type = 'histogram'
    t_filename_new = t_filename + '--' + key + '--' + feature_type + '--' + statistics_type + t_fileext
    print(t_filename_new)
    t_table_new = master_node.analysisPatent(feature_type, key, statistics_type)
    Yd_excel().saveSheet(t_filename_new, t_table_new)
