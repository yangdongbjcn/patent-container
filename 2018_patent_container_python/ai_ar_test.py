# coding: utf-8

from yd_container import *

from yd_sheet import *

def func_get_year(item):
    item_str = str(item)
    return item_str[0:4]

if __name__ == '__main__':

    tree_root = TreeContainer('增强现实')
    tree_root.addTreeData(u'data//ai//增强现实//全部')
    tree_root.dump()

    t_nodes = tree_root.getRecursiveMembers()

    # tree_root.getMember(u'input').syncMembers('histogram', 'IPC1')
