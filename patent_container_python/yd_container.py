# coding: utf-8

from yd_frame import *

from yd_sheet import *

import matplotlib.pyplot as plt

import ContainerSync

class Container(object):
    """ """
    def __init__(self, name, superior=None):
        self.name = name
        self.default_name = 'frame'
        self.setFrame(self.default_name, Frame())

    def setDefaultFrame(self, frame):
        self.setFrame(self.default_name, frame)
    def getDefaultFrame(self):
        return self.getFrame(self.default_name)

    # frame
    def getFrame(self, name):
        return self.__getattribute__(name)
    def setFrame(self, name, frame = None):
        if frame and not isinstance(frame, Frame):
            raise ValueError('frame is not a Frame')
        if frame is None:
            frame = Frame(name=name)
        self.__setattr__(name, frame)
        frame.name = name

    #algorithm
    def getHistogramFrom(self, frame, key):
        new_key = key + '_histogram'
        histo_table = YdAlgorithm().getHistogram(frame.table, key, new_key)
        return histo_table

    # sync between containers
    def nameSync(self):
        ContainerSync.init(self.name)
    def publishSync(self, type, key):
        ContainerSync.pub(self.name, type, self.frame, key)

    def connectSync(self, topic):
        ContainerSync.sub(topic, self)
    def receiveSync(self, topic, type, *a, **kw):
        frame = a[0]
        key = a[1]
        if (type == 'histogram'):
            histo_table = self.getHistogramFrom(frame, key)
            t_frame = Frame(table= histo_table)
            self.setDefaultFrame(t_frame)


class PipeContainer(Container):
    """ """
    def __init__(self, name, superior = None):
        """"""
        super(PipeContainer, self).__init__(name, superior)

class PipeHistoChart(PipeContainer):
    """ """
    def __init__(self, name, superior = None):
        """"""
        super(PipeHistoChart, self).__init__(name, superior)
        self.histo_name = 'histo'
        self.setFrame(self.histo_name)

    def pipe1Histo(self, key):
        """"""
        new_key = key + '_histogram'
        histo_table = YdAlgorithm().getHistogram(self.frame.table, key, new_key)
        histo_data = Frame(name = self.histo_name, table= histo_table)
        self.setFrame(self.histo_name, histo_data)

    def pipe2Chart(self):
        frame = self.getFrame(self.histo_name)
        frame.resetIndex()  # YD: index becomes a new column
        frame.table.plot()
        plt.show()

class TreeContainerIO(object):
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
            leaf.frame.table = YdSheet().loadSheet(file_path)
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


class TreeContainer(Container):
    """ """
    def __init__(self, name, superior=None):
        super(TreeContainer, self).__init__(name, superior)

        self.name = name
        self.superior = superior
        self.members = {}
        self.path_sep = '------'

        self._io = TreeContainerIO()

        self.alldata_name = 'all'
        self.setFrame(self.alldata_name)

    def getAllData(self):
        nodes = self.getRecursiveMembers()
        all_data = Frame()
        for node in nodes:
            t_data = node.getDefaultFrame()
            t_table = t_data.table
            all_data.table.append(t_table)
        self.setFrame(self.alldata_name, all_data)
        return all_data

    #IO:
    def addTreeData(self, path):
        self._io.addTreeData(self, path)

    #sync between supervisor and members
    def syncBySupervisor(self, type, frame, *a, **kw):
        key = a[0]
        if (type == 'histogram'):
            self.histo_name = 'histo'
            histo_table = self.getHistogramFrom(frame, key)
            histo_data = Frame(name=self.histo_name, table=histo_table)
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
        if obj and not isinstance(obj, TreeContainer):  # YD
            raise ValueError('member is not a Container')
        if obj is None:
            obj = TreeContainer(name)  # YD
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
