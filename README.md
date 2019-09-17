# patent-container

Patents in multiple files

Patent-container makes it easy to manage patents in multiple files. Patent analysts often use .CSV or .XLS files to store patent information, those files usually contain thousands of patent item. And those files usually have relationships like parents and children. For example, 'vehicle.xls' and 'electric vehicle.xls'.

The Container is a structure to store/load patents  to/from multiple files using Python Pandas DataFrame. It is easy to apply some algorithms of patent analysis on patent-container.

Patent-Container contains another repository Patent-Frame （https://github.com/yangdongbjcn/patent-frame ）. 

Patent-Container 专利容器

Patent-Container 是一个对多个电子表格中存储的专利数据进行处理的程序。专利分析人员经常从专利分析网站或者客户端中检索专利之后下载存储专利的文件，这些文件一般是.CSV或者是.XLS格式。Patent-Container中内置的Patent-Frame 是一个二维表的数据结构，用于处理存储于单个文件中的专利数据，兼容常见的数据类型，列表类型和用户自定义类型。Patent-Container则可以将多个文件读入并建立“树型”数据结构。

Patent-Container中的Patent-Frame 使用Python Pandas的DataFrame来存储数据，适合集成一些用于专利分析的算法。

Patent-Frame 也有一个单独的库，参见 https://github.com/yangdongbjcn/patent-frame 。

我们要做什么？
提供一个简要的用于专利分析的python环境的搭建步骤。
提供用于单文件读取和专利分析的Ydbj-Frame代码，以及相关的用于电子表格文件读取的Ydbj-Sheet代码，以及相关算法Ydbj-Algorithm代码。
提供用于多专利文件读取和专利分析的Ydbj-Container代码。该文件包含Container基础类，以及继承的TreeContainer类等。
更多的内容，将收录在微信公众号yangdongpatent。

专利分析环境搭建

1）安装anaconda2，https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/

2）打开anaconda的命令行，安装依赖库。
pip install jieba
pip install gensim
conda install xlutils

3）安装pycharm，选择免费的社区版，https://www.jetbrains.com/pycharm 

4）下载本库的代码，使用pycharm运行ydbj_container_test.py
