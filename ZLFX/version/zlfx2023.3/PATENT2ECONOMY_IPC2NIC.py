#encoding=utf-8
from __future__ import unicode_literals
import sys
sys.path.append("./")

from datetime import date, datetime
import struct
import xlrd
import xlwt
from xlutils.copy import copy
import simplejson

import os

from IPC2NIC_Read import *
from yd_algorithm_sort_bubble import *

def ThereIsNicOfHighPercent(percent, percent_high_thres):
    idx_list = []
    for i in range(len(percent)):
        if (percent[i] >= percent_high_thres):
            idx_list.append(int(i))
    return idx_list

def ThereIsNicOfMidPercent(percent, percent_high_thres, percent_mid_thres):
    idx_list = []
    for i in range(len(percent)):
        if ((percent[i] >= percent_mid_thres) and (percent[i] < percent_high_thres)):
            idx_list.append(int(i))
    return idx_list

def ThereIsNicOfLowPercent(percent, percent_mid_thres, percent_low_num):
    idx_list = []
    per_sorted = percent[:]
    per_order = bubble_sort(per_sorted)
    per_sorted.reverse()
    per_order.reverse()
    idx_list = per_order[:percent_low_num-1]
    return idx_list

def IPC_MostRelated(percent, nic_related_p):
    percent_high_thres = 60
    percent_mid_thres = 50
    percent_low_num = 5

    idx_list = ThereIsNicOfHighPercent(percent, percent_high_thres)
    if( len(idx_list) > 0 ):
        return idx_list

    idx_list = ThereIsNicOfMidPercent(percent, percent_high_thres, percent_mid_thres)
    if( len(idx_list) > 0 ):
        return idx_list

    idx_list = ThereIsNicOfLowPercent(percent, percent_mid_thres, percent_low_num)
    return idx_list

def IPC2NIC_Find(p_pc, p2nic_list):
    idx = IPC_Find(p_pc, p2nic_list)
    percent = ClassList_Index(p2nic_list,idx,'percent')
    nic_related_p = ClassList_Index(p2nic_list,idx,'nic_related_p')
    idx_idx = IPC_MostRelated(percent, nic_related_p)
    idx_sel = []
    for i in range(len(idx_idx)):
        idx_sel.append(idx[idx_idx[i]])
    return idx_sel

def IPC2NIC(ipc_list, folder_name):
    #以上为函数定义
    file_name = folder_name + u'/' + u'IPC2NIC.xls'
    p2nic_list = IPC2NIC_Read(file_name)

    nic1_list=[]
    name1_list=[]
    nic_name_string_list=[]

    for i in range(len(ipc_list)):
        t_patent = ipc_list[i]
        idx = IPC2NIC_Find(t_patent, p2nic_list)
        nic = ClassList_Index(p2nic_list,idx,'nic')
        nic_name = ClassList_Index(p2nic_list,idx,'nic_name')

        if (idx == []):
            nic1_list.append(nic)
            name1_list.append(nic_name)
        else:
            nic1_list.append(nic[0])
            name1_list.append(nic_name[0])

        nic_match = ''
        for j in range(len(idx)):
            nic_match = nic_match + nic[j] + ":" + nic_name[j] + '--'
        nic_name_string_list.append(nic_match)

    return nic1_list, name1_list, nic_name_string_list

def IPC_Find(p_pc, p2nic_list):
    p_pc = IPC_Trunc(p_pc)
    idx = []
    for i in range(len(p2nic_list)):
        t_pc = p2nic_list[i].pc
        t_percent = p2nic_list[i].percent
        if (p_pc == t_pc):
            idx.append(int(i))
    return (idx)

def IPC_Trunc(p_pc):
    #典型地，p_pc例如G06T7/20，t_pc例如G06T7, 需要将p_pc截断
    t_idx = p_pc.find('/')
    if (t_idx != -1):
        p_pc = p_pc[:t_idx]
    else:
        p_pc = p_pc
    return p_pc
