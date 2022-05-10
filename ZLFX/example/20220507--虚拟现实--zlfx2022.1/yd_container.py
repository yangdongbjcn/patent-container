# coding: utf-8

from yd_frame import *

from yd_excel import *

import matplotlib.pyplot as plt

import ContainerSync

class Yd_container(object):
    """ """
    def __init__(self, name, superior=None):
        self.name = name
        self.default_name = 'frame'
        self.setFrame(self.default_name, Yd_frame())

    # frame
    def getFrame(self, name):
        return self.__getattribute__(name)
    def setFrame(self, name, frame = None):
        if frame and not isinstance(frame, Yd_frame):
            raise ValueError('frame is not a Frame')
        if frame is None:
            frame = Yd_frame(name=name)
        self.__setattr__(name, frame)
        frame.name = name


    def setDefaultFrame(self, frame):
        self.setFrame(self.default_name, frame)
    def getDefaultFrame(self):
        return self.getFrame(self.default_name)


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

class Yd_container_tree_io(object):
    """ """
    def addTreeData(self, cont, path):
        sheet_files = self.getSheetFiles(path)
        for file in sheet_files:
            file_name = self.getFileName(file)
            tree_path = file_name
            cont.findMember(tree_path, create=True)
        for file in sheet_files:
            file_name = self.getFileName(file)
            tree_path = file_name
            leaf = cont.findMember(tree_path)
            file_path = path + '//' + file
            leaf.frame.table = Yd_excel().loadSheet(file_path)
        return cont

    def getSheetFiles(self, path):
        files = os.listdir(path)
        sheet_files = []
        for file in files:
            if not os.path.isdir(file):
                file_ext = self.getFileExt(file)
                if (file_ext in [u'xls', u'xlsx']):
                    sheet_files.append(file)
        return sheet_files

    def getFileExt(self, file_path):
        file_ext = os.path.splitext(file_path)[1]
        file_ext = file_ext.replace('.', '')
        file_ext = file_ext.lower()
        return file_ext

    def getFileName(self, file_path):
        basename = os.path.basename(file_path)
        file_name = os.path.splitext(basename)[0]
        return file_name



class Yd_container_tree(Yd_container):
    """ """
    def __init__(self, name, superior=None):
        super(Yd_container_tree, self).__init__(name, superior)

        self.name = name
        self.superior = superior
        self.members = {}

        self.path_sep = '--'
        self._io = Yd_container_tree_io()

        self.alldata_name = 'all'
        self.setFrame(self.alldata_name)

    # def getAllData(self):
    #     nodes = self.getRecursiveMembers()
    #     all_data = Frame()
    #     for node in nodes:
    #         t_data = node.getDefaultFrame()
    #         t_table = t_data.table
    #         all_data.table.append(t_table)
    #     self.setFrame(self.alldata_name, all_data)
    #     return all_data

    #IO:
    def addTreeData(self, path):
        self._io.addTreeData(self, path)

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
        for name, member in self.getMembers():
            member.dump(indent + 1)

    def getSuperior(self):
        return self.superior

    def getMember(self, name, defval=None):
        return self.members.get(name, defval)

    def getMembers(self):
        return self.members.items()

    def getRecursiveMembers(self):
        node = self
        if node == None:
            return
        queue = []
        queue.append(node)
        nodes = []
        paths = []
        while queue:
            node = queue.pop(0)
            nodes.append(node)
            paths.append(node.path)
            for name, member in node.getMembers():
                queue.append(member)
                nodes.append(member)
                paths.append(member.path)
        # return nodes, paths
        return nodes

    def addMember(self, name, obj=None):
        if obj and not isinstance(obj, Yd_container_tree):  # YD
            raise ValueError('member is not a Container')
        if obj is None:
            obj = Yd_container_tree(name)  # YD
        obj.superior = self
        self.members[name] = obj
        return obj

    def deleteMember(self, name):
        if name in self.members:
            del self.members[name]

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
