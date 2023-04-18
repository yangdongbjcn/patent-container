# coding: utf-8

from yd_container import *

from yd_excel import *


if __name__ == '__main__':

    print('testing sync')
    master_node = Yd_container('master')
    master_node.initMaster()
    slave_node = Yd_container('slave')
    slave_node.slaveConnect(master_node.name)
    
    # frame = Yd_frame()
    # frame.table = Yd_excel().loadSheet(u'data//ti.xls', start_row=1)
    # master_node.frame = frame
    # master_node.masterSend('histogram', u'申请日期')
    # print(slave_node.frame.table)

    print('testing TreeContainer')
    root = Yd_container_tree('root') # root name is ''
    a1 = root.addMember('a1')
    a1.addMember('b1')
    a1.addMember('b2')
    a2 = root.addMember('a2')
    b3 = a2.addMember('b3')
    b3.addMember('c1')
    root.dump()

    print('test findMember()')
    member = root.findMember('a2--b4')
    member = root.findMember('a2--b5--c2', create=True)
    root.dump()

    print('testing addTreeNodes')
    tree_root = Yd_container_tree('tree_root')
    tree_root.addTreeNodes(u'data//treetest')
    tree_root.dump()

    print('testing sync')
    tree_root.getMember(u'input').syncMembers('histogram', 'IPC1')

    print('testing loadSheet computeHisto')
    frame = Yd_frame()
    frame.table = Yd_excel().loadSheet(u'data//treetest//input.xls')
    histo_chart = Yd_container_pipe_histo_chart('histo_chart')
    histo_chart.setDefaultFrame(frame)
    histo_chart.pipe1Histo('IPC1')
    histo_chart.pipe2Chart()

    print('testing Yd_container.addFolderNode')
    master_node.addFolderNode(u'data//treetest//')

    print('over')




