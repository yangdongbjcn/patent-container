# coding: utf-8

from yd_container import *

from yd_excel import *

def func_get_year(item):
    item_str = str(item)
    return item_str[0:4]

if __name__ == '__main__':

    master_node = Yd_container('master')
    master_node.initMaster()
    slave_node = Yd_container('slave')
    slave_node.slaveConnect(master_node.name)

    frame = Yd_frame()

    frame.table = Yd_excel().loadSheet(u'data//autodriving//ptics--autodriving--fleet.csv', start_row=0)

    key = u'申请日'
    new_key = key + u'_year'
    frame.table = YdAlgorithm().addColProperty(frame.table, key, new_key, func_get_year)

    master_node.frame = frame
    master_node.masterSend('histogram', new_key)
    print(slave_node.frame.table)