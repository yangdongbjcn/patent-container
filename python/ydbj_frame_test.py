# coding: utf-8

from ydbj_frame import *
from ydbj_sheet import *
from ydbj_algorithm import *

def func_get_year(item):
    return item[0:4]

def func_get_original_country(item):
   return item[0:2]

class FrameTest(object):
    """ """

    def getYearHistogram(self, table, key):
       table = YdbjAlgorithm().addColProperty(table, key, func_get_year)
       new_key = key + '_property'
       histo_table = YdbjAlgorithm().getHistogram(table, new_key)
       dict = {new_key: 'year', new_key + '_histogram': 'histogram'}
       histo_table.rename(columns=dict, inplace=True)
       return histo_table

    def getApplicantHistogram(self, table, key):
       histo_table = YdbjAlgorithm().getHistogram(table, key)
       dict = {key: 'applicant', key + '_histogram': 'histogram'}
       histo_table.rename(columns=dict, inplace=True)
       return histo_table

    def getOriginalCountryHistogram(self, table, key):
       table = YdbjAlgorithm().addColProperty(table, key, func_get_original_country)
       new_key = key + '_property'
       histo_table = YdbjAlgorithm().getHistogram(table, new_key)
       dict = {new_key: 'original country', new_key + '_histogram': 'histogram'}
       histo_table.rename(columns=dict, inplace=True)
       return histo_table

if __name__ == '__main__':
    print('running ydbj_patent.__main__')

    print('testi ng FrameTest')

    frame = Frame()
    frame.table = YdbjSheet().loadSheet(u'ti.xls', start_row = 1)

    new_table = FrameTest().getYearHistogram(frame.table, u'申请日期')
    print(new_table)

    new_table = FrameTest().getYearHistogram(frame.table, u'优先权日')
    print(new_table)

    new_table = FrameTest().getApplicantHistogram(frame.table, u'终属母公司')
    print(new_table)

    new_table = FrameTest().getOriginalCountryHistogram(frame.table, u'优先权国家/地区 - DWPI')
    print(new_table)

    print('over')