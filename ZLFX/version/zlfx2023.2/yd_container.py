# coding: utf-8

from yd_frame import *

from yd_excel import *

import matplotlib.pyplot as plt

import ContainerSync

class Yd_container(object):
    """ """
    def __init__(self, name, superior=None):
        self.name = name
        self.frame_name = 'frame'
        self.setDefaultFrame(Yd_frame())

    # the Yd_frame
    def getFrame(self, p_name):
        return self.__getattribute__(p_name)
    def setFrame(self, p_name, p_frame = None):
        if p_frame and not isinstance(p_frame, Yd_frame):
            raise ValueError('Function parameter "p_frame" is not a Frame')
        if p_frame is None:
            p_frame = Yd_frame(name=p_name)
        self.__setattr__(p_name, p_frame)
        p_frame.name = p_name

    # the default Yd_frame: 'frame' 
    def setDefaultFrame(self, p_frame):
        self.setFrame(self.frame_name, p_frame)
    def getDefaultFrame(self):
        return self.getFrame(self.frame_name)

    # the default table of the default Yd_frame: frame.table
    def getDefaultTable(self):
        t_frame = self.getDefaultFrame()
        return t_frame.table
    def setDefaultTable(self, p_table = None):
        t_frame = Yd_frame(name=self.frame_name)
        t_frame.table = p_table
        self.setDefaultFrame(t_frame)

    def addFolderNode(self, path):
        # ZLFX2022.2 A folder may contain many sheet files
        sheet_files = Yd_excel().getSheetFiles(path) 
        self.frame = Yd_frame()
        for file in sheet_files:
            file_path = path + '//' + file
            t_table = Yd_excel().loadSheet(file_path)
            self.frame.table = self.frame.table.append(t_table) # in future concat?
        return self

    #algorithm
    def getHistogramFrom(self, frame, key):
        new_key = key + '_histogram'
        histo_table = YdAlgorithm().getHistogram(frame.table, key, new_key)
        return histo_table
    def getMyHistogram(self, key):
        new_key = key + '_histogram'
        t_frame = self.getFrame()
        histo_table = YdAlgorithm().getHistogram(t_frame.table, key, new_key)
        return histo_table

    # sync between containers, as a master
    def initMaster(self):
        ContainerSync.init_master(self.name) 
   
    def  processTable(self, type, *a, **kw):
        t_func = YdAlgorithm().getTableFunc(type)
        t_table = self.getDefaultFrame().table
        t_table_new = t_func(t_table, *a, **kw)
        return t_table_new

    def  masterSend(self, type, data):
        ContainerSync.master_send(self.name, type, data)

    def connectSlave(self, slave):
        ContainerSync.slave_connect(self.name, slave)

    def disconnectSlave(self, slave):
        ContainerSync.slave_disconnect(self.name, slave)
    
    # sync between containers, as a slave
    def slaveConnect(self, topic):
        ContainerSync.slave_connect(topic, self)

    def slaveDisconnect(self, topic):
        ContainerSync.slave_disconnect(topic, self)

    def slaveReceive(self, topic, type, data):
        histo_table = data
        t_frame = Yd_frame(table= histo_table)
        self.setDefaultFrame(t_frame)

    def slaveReport(self, topic, type, *a, **kw):
        return self.processTable(type, *a, **kw)
    
    # patent analysis functions
    def analysisPatent(self, feature_type, key, statistics_type):

        table = self.frame.table
        new_key = key + '--' + feature_type

        t_func_item = YdAlgorithm().getItemFunc(feature_type)
        t_table = YdAlgorithm().addColProperty(table, key, new_key, t_func_item)

        self.frame.table = t_table
        
        self.initMaster()        
        slave_node = Yd_container('slave')
        slave_node.slaveConnect(self.name)

        t_table = self.processTable(statistics_type, new_key, statistics_type)
        self.masterSend(statistics_type, t_table)
        t_table_new = slave_node.frame.table
        return t_table_new
    
    # 20230418 分析集合类数据，例如分类号，申请人，以特定间隔分割的。
    def analysisPatentSetField(self, feature_type, key, statistics_type):
        # 将key字段的数据拼接成新的一列数据，存到t_table_new
        table = self.frame.table
        t_func_item = YdAlgorithm().getItemFunc(feature_type)
        t_table_new = YdAlgorithm().getNewTableOfSetField(table, key, t_func_item)
        # 将t_table_new封装成新容器node_new
        node_new = Yd_container('new')
        node_new.setDefaultTable(t_table_new)
        # 使用新容器node_new执行直方图操作
        t_table_new2 = node_new.analysisPatent('item', key, statistics_type)
        return t_table_new2

class Yd_container_pipe(Yd_container):
    """ """
    def __init__(self, name, superior = None):
        """"""
        super(Yd_container_pipe, self).__init__(name, superior)

class Yd_container_pipe_histo_chart(Yd_container_pipe):
    """ """
    def __init__(self, name, superior = None):
        """"""
        super(Yd_container_pipe_histo_chart, self).__init__(name, superior)
        self.histo_name = 'histo'
        self.setFrame(self.histo_name)

    def pipe1Histo(self, key):
        """"""
        new_key = key + '_histogram'
        histo_table = YdAlgorithm().getHistogram(self.frame.table, key, new_key)
        histo_data = Yd_frame(name = self.histo_name, table= histo_table)
        self.setFrame(self.histo_name, histo_data)

    def pipe2Chart(self):
        frame = self.getFrame(self.histo_name)
        frame.resetIndex()  # YD: index becomes a new column
        frame.table.plot()
        plt.show()

class Yd_container_tree(Yd_container):
    """ """
    def __init__(self, name, superior=None):
        super(Yd_container_tree, self).__init__(name, superior)

        self.name = name
        self.superior = superior
        self.members = {}

        self.path_sep = '--'

        self.alldata_name = 'all'
        self.setFrame(self.alldata_name)

    # def getAllData(self):
    #     nodes = self.getRecursiveMembers()
    #     all_data = Yd_rame()
    #     for node in nodes:
    #         t_data = node.getDefaultFrame()
    #         t_table = t_data.table
    #         all_data.table.concat(t_table)
    #     self.setFrame(self.alldata_name, all_data)
    #     return all_data

    #sync between supervisor and members
    def syncBySupervisor(self, type, frame, *a, **kw):
        key = a[0]
        if (type == 'histogram'):
            self.histo_name = 'histo'
            histo_table = self.getHistogramFrom(frame, key)
            histo_data = Yd_frame(name=self.histo_name, table=histo_table)
            self.setFrame(self.histo_name, histo_data)

    def syncMembers(self, type, *a, **kw):
        members = self.getMembers()
        for key, child in members:
            child.syncBySupervisor(type, self.frame, *a, **kw)
            child.syncMembers(type, *a, **kw)

    # Tree code modified from:
    # https://blog.csdn.net/xuelians/article/details/79999284

    def __contains__(self, key_name):
        return key_name in self.members

    @property
    def path(self):
        """return path string (from root to current node)"""
        if self.superior:
            return '%s-%s' % (self.superior.path.strip(), self.name)
        else:
            return self.name

    def dump(self, indent=0):
        """dump tree to string"""
        tab = '    ' * (indent - 1) + ' |- ' if indent > 0 else ''
        print('%s%s' % (tab, self.name))
        for t_name, t_member in self.getMembers():
            t_member.dump(indent + 1)

    def getSuperior(self):
        return self.superior

    def getMember(self, p_name, defval=None):
        return self.members.get(p_name, defval)

    def getMembers(self):
        return self.members.items()

    def getRecursiveMembers(self):
        node = self
        if node == None:
            return
        queue = []
        queue.concat(node)
        nodes = []
        paths = []
        while queue:
            node = queue.pop(0)
            nodes.concat(node)
            paths.concat(node.path)
            for t_name, t_member in node.getMembers():
                queue.concat(t_member)
                nodes.concat(t_member)
                paths.concat(t_member.path)
        # return nodes, paths
        return nodes

    def addMember(self, p_name, obj=None):
        if obj and not isinstance(obj, Yd_container_tree):  # YD
            raise ValueError('member is not a Container')
        if obj is None:
            obj = Yd_container_tree(p_name)  # YD
        obj.superior = self
        self.members[p_name] = obj
        return obj

    def deleteMember(self, p_name):
        if p_name in self.members:
            del self.members[p_name]

    def findMember(self, path, create=False):
        # convert path to a list if input is a string
        path = path if isinstance(path, list) else path.split(self.path_sep)
        cur = self
        for sub in path:
            # search
            obj = cur.getMember(sub)
            if obj is None and create:
                # create new node if need
                obj = cur.addMember(sub)
            # check if search done
            if obj is None:
                break
            cur = obj
        return obj

    def addTreeNodes(self, path): # ZLFX2022.2
        # ZLFX2022.2 from Yd_container_tree_io to Yd_container_tree
        sheet_files = Yd_excel().getSheetFiles(path) #ZLFX2022.2
        for file in sheet_files:
            file_name = Yd_excel().getFileName(file) #ZLFX2022.2
            tree_path = file_name
            self.findMember(tree_path, create=True)
        for file in sheet_files:
            file_name = Yd_excel().getFileName(file)
            tree_path = file_name
            leaf = self.findMember(tree_path)
            file_path = path + '//' + file
            leaf.frame.table = Yd_excel().loadSheet(file_path)
        return self