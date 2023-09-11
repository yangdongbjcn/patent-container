#coding=utf-8
import xlrd
import os

class c_patent:
    def __init__(self, col_name, col_value):
        self.key_value = {}
        for i in range(len(col_name)):
            self.key_value[col_name[i]] = col_value[i]
    def get_key_value(self, key_name):
        return self.key_value[key_name]

def PatentExcelRead(excel_file):

    file_name = excel_file

    xls_read = xlrd.open_workbook(file_name)        #打开EXCEL
    xls_table = xls_read.sheets()[0]                #打开表
    table_nrows = xls_table.nrows
    table_ncols = xls_table.ncols

    # 公开号	申请号	标题	申请人	标准申请人	发明人	第一发明人	优先权日	申请日	公开日	国际主分类	国际分类
    # 专利度	特征度	专利类型	引用数	自引用数	非自引用数	引用公司数	被引用数	被自引用	非被自引用数	被引用公司数	被引用国家数
    # 同族数	同族国家数	等级	相关度	法律状态

    # pn = xls_table.col_values(0)
    # apn = xls_table.col_values(1)
    # title = xls_table.col_values(2)
    # an = xls_table.col_values(3)
    # ann = xls_table.col_values(4)
    # inventor = xls_table.col_values(5)
    # inventor1 = xls_table.col_values(6)
    # prd = xls_table.col_values(7)
    # apd = xls_table.col_values(8)
    # pd = xls_table.col_values(9)
    # ipc_class = xls_table.col_values(10)
    # ipc1 = xls_table.col_values(11)
    # patent_degree = xls_table.col_values(12)
    # feature_degree = xls_table.col_values(13)
    # patent_type = xls_table.col_values(14)
    # citing_num = xls_table.col_values(15)
    # self_citing_num = xls_table.col_values(16)
    # not_self_citing_num = xls_table.col_values(17)
    # return pn, apn, title, ann, ipc_class, ipc1

    col_name = ['pn','apn','title','ann','ipc_class', 'ipc1']

    p_list = []
    for i in range(table_nrows):
        col_value = [
        xls_table.cell(i, 0).value,
        xls_table.cell(i, 1).value,
        xls_table.cell(i, 2).value,
        xls_table.cell(i, 4).value,
        xls_table.cell(i, 10).value,
        xls_table.cell(i, 11).value.replace(' ','')
        ]
        t_patent = c_patent(col_name, col_value)
        p_list.append(t_patent)
    return p_list


def FolderRead(folder_name, file_types=['xls','XLS','xlsx','XLSX']):

    # 所有文件夹，第一个字段是次目录的级别
    dirList = []
    # 所有文件
    fileList = []
    # 返回一个列表，其中包含在目录条目的名称(google翻译)
    files = os.listdir(folder_name)

    for f in files:
        if(os.path.isdir(folder_name + '/' + f)):
            # 排除隐藏文件夹。因为隐藏文件夹过多
            if(f[0] == '.'):
                pass
            else:
                # 添加非隐藏文件夹
                dirList.append(f)
        if(os.path.isfile(folder_name + '/' + f)):
            # 添加文件
            fileList.append(folder_name + '/' + f)

    return fileList, dirList

def ClassList_Index(class_list, idx, key_name):
    value = []
    for i in range(len(idx)):
        t_idx = idx[i]
        value.append(class_list[t_idx].get_key_value(key_name))
    return value

if __name__ == '__main__':
    pn = PatentExcelRead('./BjCorpAbroad/2000.xls')
    print pn
    print 'PatentExcelRead() is tested'

    FolderRead('BjCorpAbroad', {'xls', 'XLS', 'xlsx', 'XLSX'})
    print 'FolderRead() is tested'