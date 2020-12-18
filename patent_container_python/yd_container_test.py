# coding: utf-8

from yd_container import *

from yd_sheet import *


if __name__ == '__main__':

    print('testing sync')
    master = Container('master')
    master.nameSync()
    slave = Container('slave')
    slave.connectSync('master')

    frame = Frame()
    frame.table = YdSheet().loadSheet(u'data//ti.xls', start_row=1)
    # print frame.table
    master.frame = frame
    master.publishSync('histogram', u'申请日期')
    print(slave.frame.table)

    print('testing TreeContainer')
    print('test addFrame()')
    root = TreeContainer('root') # root name is ''
    a1 = root.addMember('a1')
    a1.addMember('b1')
    a1.addMember('b2')
    a2 = root.addMember('a2')
    b3 = a2.addMember('b3')
    b3.addMember('c1')
    root.dump()

    print('test getMembers()')
    for name, member in a1.getMembers():
        print(name, member)

    print('test operator "in"')
    print("b2 is a1's _set = %s" % ('b2' in a1))

    print('test deleteFrame()')
    a2.deleteMember('b3')
    root.dump()

    print('test findMember()')
    member = root.findMember('a2 b2')
    print(member)

    print('test findMember() with create')
    member = root.findMember('a1 b1 c2 b1 e1 f1', create=True)
    print(member)
    root.dump()

    print('test attr path')
    print(member.path)

    print('testing getRecursiveMembers')
    nodes = root.getRecursiveMembers()
    for node in nodes:
        print(node.name)

    print('testing addTreeData')
    input_device = TreeContainer('input_device')
    input_device.addTreeData(u'data//treetest')
    input_device.dump()
    print('testing getAllData')
    t_data = input_device.getAllData()

    print('testing sync')
    input_device.getMember(u'input').syncMembers('histogram', 'IPC1')

    print('testing loadSheet computeHisto')
    frame = Frame()
    frame.table = YdSheet().loadSheet(u'data//treetest//input.xls')
    histo_chart = PipeHistoChart('histo_chart')
    histo_chart.setDefaultFrame(frame)
    histo_chart.pipe1Histo('IPC1')
    histo_chart.pipe2Chart()

    print('over')




