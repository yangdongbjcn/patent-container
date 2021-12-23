一、简介

专利分析人员经常从付费专利数据库中导出各种电子表格文件，例如CSV文件或者XLS文件。这些文件包含了成百上千条专利著录项目。

这些导出的电子表格文件，实际上已经包含了专利分析所需要的各种信息。例如电子表格文件一般包含申请日这一字段，从这一字段可以提取出申请年，从而进行专利分析中的年度趋势统计。

专利容器(Patent-Container)可以载入和组织这些文件，并基于这些文件进行专利分析。

专利容器可以对一维、二维、三维数据建模。从专利数据库中导出的单个CSV或XLS文件属于二维数据。多个CSV或XLS文件的组合属于三维数据，三维数据的组织方式可以是树形数据结构，例如技术分支树。

对于不同的专利数据库，例如Patentics，incoPat，TI数据库等，专利容器通过适配数据库的字段，可以方便的导入数据。

对于不同的专利分析算法，例如申请年份统计、申请人统计、分类号统计，专利容器通过数据结构的标准化，可以方便地切换算法。

专利容器可以使用各种语言实现。例如Python语言、PHP语言、JavaScript语言。

二、目录

(一）patent_container_python

基于Python语言实现了专利容器的数据结构，参见 yd_container.py 等文件。

该文件夹还包括一些示意数据，参见 data 文件夹下的数据。并演示了使用这些数据进行专利统计分析。

推荐安装 Anaconda3 编程环境，使用 PyCharm 社区版编辑器，导入整个文件夹作为项目，并执行其中的 ydbj_container_test.py 文件。

（二）patent_container_web

（1）2018_container_lib_js

JS版的专利容器核心库。提供了yd_list、yd_dict、yd_mat、yd_frame、yd_tree等类。

（2）2018_container_lib_php

PHP版的专利容器核心库。提供了yd_list、yd_dict、yd_mat、yd_frame等类。

（3）202101_webchart_europe_map

PHP版的专利容器可视化。提供了图表、地图。

三、扩展阅读

更多的内容，将收录在微信公众号yangdongpatent（专利容器）。

2019年出版的图书《玩转专利大数据——智慧容器助力专利分析与运营》第3章和第6.2节。

开源代码将公开在Github和Gitee。
http://github.com/yangdongbjcn/patent-container  
http://gitee.com/yangdongbjcn/patent-container

简单的在线专利分析小工具，请访问 http://zlrq.cn