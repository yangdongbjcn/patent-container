# coding: utf-8

from yd_frame import *
from yd_sheet import *
from yd_algorithm import *

def func_get_year(item):
    return item[0:4]

def func_get_original_country(item):
   return item[0:2]

class Yd_frame_test(object):
    """ """

    def getYearHistogram(self, table, key):
       new_key = key + '_year'
       table = YdAlgorithm().addColProperty(table, key, new_key, func_get_year)
       new_key2 = new_key + '_histogram'
       histo_table = YdAlgorithm().getHistogram(table, new_key, new_key2)
       dict = {new_key: 'year', new_key + '_histogram': 'histogram'}
       histo_table.rename(columns=dict, inplace=True)
       return histo_table

    def getApplicantHistogram(self, table, key):
       new_key = key + '_histogram'
       histo_table = YdAlgorithm().getHistogram(table, key, new_key)
       dict = {key: 'applicant', key + '_histogram': 'histogram'}
       histo_table.rename(columns=dict, inplace=True)
       return histo_table

    def getOriginalCountryHistogram(self, table, key):
       new_key = key + '_nation'
       table = YdAlgorithm().addColProperty(table, key, new_key, func_get_original_country)
       new_key2 = new_key + '_histogram'
       histo_table = YdAlgorithm().getHistogram(table, new_key, new_key2)
       dict = {new_key: 'original country', new_key + '_histogram': 'histogram'}
       histo_table.rename(columns=dict, inplace=True)
       return histo_table

if __name__ == '__main__':

    print('testi ng FrameTest')

    frame = Yd_frame()
    frame.table = Yd_sheet().loadSheet(u'data//ti.xls', start_row = 1)

    new_table = Yd_frame_test().getYearHistogram(frame.table, u'申请日期')
    print(new_table)

    new_table = Yd_frame_test().getYearHistogram(frame.table, u'优先权日')
    print(new_table)

    new_table = Yd_frame_test().getApplicantHistogram(frame.table, u'终属母公司')
    print(new_table)

    new_table = Yd_frame_test().getOriginalCountryHistogram(frame.table, u'优先权国家/地区 - DWPI')
    print(new_table)

    print('over')