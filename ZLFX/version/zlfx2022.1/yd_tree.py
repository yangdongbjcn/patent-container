# coding: utf-8

import os

class Yd_tree_io(object):
    """ """
    def addTreeData(self, cont, path):
        all_files = self.getFolderFiles(path)
        for file in all_files:
            file_name = self.getFileName(file)
            tree_path = file_name
            cont.findMember(tree_path, create=True)
        for file in all_files:
            file_name = self.getFileName(file)
            tree_path = file_name
            leaf = cont.findMember(tree_path)
            file_path = path + '//' + file
            leaf.id = file_path
        return cont

    def getFolderFiles(self, path):
        all_files_and_folders = os.listdir(path)
        all_files = []
        for file in all_files_and_folders:
            if not os.path.isdir(file):
                all_files.append(file)
        return all_files

    def getFileName(self, file_path):
        basename = os.path.basename(file_path)
        file_name = os.path.splitext(basename)[0]
        return file_name


class Yd_tree(object):
    """ """
    def __init__(self, name, superior=None):
        self.name = name
        self.superior = superior
        self.members = {}

        self.path_sep = '--'
        self._io = Yd_tree_io()

        self.id = ''

    #IO:
    def addTreeData(self, path):
        self._io.addTreeData(self, path)

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
        if obj and not isinstance(obj, Yd_tree):  # YD
            raise ValueError('member is not a Container')
        if obj is None:
            obj = Yd_tree(name)  # YD
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
