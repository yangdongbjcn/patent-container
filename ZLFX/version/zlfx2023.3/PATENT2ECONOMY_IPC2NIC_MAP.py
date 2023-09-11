#encoding=utf-8
import xlrd

class c_p2nic:
    def __init__(self,nic,nic_name,pc, pc_name, percent, nic_related_p, pc_related_p):
        self.nic = nic
        self.nic_name = nic_name
        self.pc = pc
        self.pc_name = pc_name
        self.percent = percent
        self.nic_related_p = nic_related_p
        self.pc_related_p = pc_related_p
    def get_key_value(self, key_name):
        key_value = {'nic':self.nic,
                'nic_name':self.nic_name,
                'pc':self.pc,
                'pc_name':self.pc_name,
                'percent':self.percent,
                'nic_related_p':self.nic_related_p,
                'pc_related_p':self.pc_related_p
                }
        return key_value[key_name]

def IPC2NIC_Read(file_name):
    xls_read = xlrd.open_workbook(file_name)
    xls_table = xls_read.sheets()[0]
    table_nrows = xls_table.nrows

    p2nic_list = []
    for i in range(table_nrows):
        # t_p2nic = {}
        # t_p2nic['nic']= xls_table.cell(i, 0).value.strip()      # 第1列，NIC
        # t_p2nic['nic_name'] = xls_table.cell(i, 1).value.strip()      # 第2列，NIC名称
        # t_p2nic['pc'] = xls_table.cell(i, 2).value.strip()      # 第3列，分类号
        # t_p2nic['pc_name'] = xls_table.cell(i, 3).value.strip()    # 第4列，分类号释义
        # t_p2nic['percent'] = xls_table.cell(i, 4).value      # 第5列，NIC和PC相关比例
        # t_p2nic['nic_related_p'] = xls_table.cell(i, 5).value      # 第6列，与NIC有关的P的数量
        # t_p2nic['pc_related_p'] = xls_table.cell(i, 6).value      # 第7列，与PC有关的P的数量
        # p2nic_list.append(t_p2nic)
        t_p2nic = c_p2nic(
        xls_table.cell(i, 0).value.strip(),   # 第1列，NIC
        xls_table.cell(i, 1).value.strip(),   # 第2列，NIC名称
        xls_table.cell(i, 2).value.strip(),   # 第3列，分类号
        xls_table.cell(i, 3).value.strip(),   # 第4列，分类号释义
        xls_table.cell(i, 4).value,   # 第5列，NIC和PC相关比例
        xls_table.cell(i, 5).value,   # 第6列，与NIC有关的P的数量
        xls_table.cell(i, 6).value    # 第7列，与PC有关的P的数量
        )
        p2nic_list.append(t_p2nic)
    return p2nic_list

def ClassList_Index(class_list, idx, key_name):
    value = []
    for i in range(len(idx)):
        t_idx = idx[i]
        value.append(class_list[t_idx].get_key_value(key_name))
    return value

