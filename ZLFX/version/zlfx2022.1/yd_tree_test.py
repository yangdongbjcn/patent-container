# coding: utf-8

from yd_tree import *

if __name__ == '__main__':

    print('testing Tree')
    root = Yd_tree('root') # root name is ''
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
    print("b2 is a1's child, %s" % ('b2' in a1))

    print('test deleteFrame()')
    a2.deleteMember('b3')
    root.dump()

    print('test findMember()')
    member = root.findMember('a2--b4')
    member = root.findMember('a2--b5--c2', create=True)
    root.dump()

    print('test attr path')
    print(member.path)

    print('testing getRecursiveMembers')
    nodes = root.getRecursiveMembers()
    for node in nodes:
       print(node.name)

    print('testing addTreeData')
    tree_root = Yd_tree('tree_root')
    tree_root.addTreeData(u'data//treetest')
    tree_root.dump()

    print('over')




