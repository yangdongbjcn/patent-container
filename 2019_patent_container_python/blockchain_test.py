# coding: utf-8

from yd_container import *

from yd_sheet import *

def func_get_year(item):
    item_str = str(item)
    return item_str[0:4]

if __name__ == '__main__':

    master = Container('master')
    master.nameSync()
    slave = Container('slave')
    slave.connectSync('master')

    frame = Frame()

    frame.table = YdSheet().loadSheet(u'data//blockchain//20200628--BlockChain--Patentics--SimpleFamily.csv', start_row=0)

    key = u'申请日'
    new_key = key + u'_year'
    frame.table = YdAlgorithm().addColProperty(frame.table, key, new_key, func_get_year)

    master.frame = frame
    master.publishSync('histogram', new_key)
    print(slave.frame.table)