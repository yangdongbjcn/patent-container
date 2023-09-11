#encoding=utf-8
from __future__ import unicode_literals
import sys
sys.path.append("./")

from NIC2Customs_Read import *

def NIC2Customs_Find(nic2, nic2customs_list):
    idx = []
    for i in range(len(nic2customs_list)):
        t_nic2 = nic2customs_list[i].get_key_value('nic2')
        if (nic2 == t_nic2):
            idx.append(int(i))
    return (idx)

def NIC2Customs(nic_list, folder_name):
    #以上为函数定义
    file_name = folder_name + u'/' + u'NIC2Customs.xls'
    nic2customs_list = NIC2Customs_Read(file_name)

    customs_list=[]
    
    for i in range(len(nic_list)):
        t_nic = nic_list[i]
        t_nic2 = t_nic[0:3]
        idx = NIC2Customs_Find(t_nic2, nic2customs_list)
        customs = ClassList_Index(nic2customs_list,idx,'customs')

        if (customs == []):
            customs_list.append(customs)
        else:
            customs_list.append(customs[0])

    return customs_list

