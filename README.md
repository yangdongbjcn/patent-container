一、简介

专利分析人员经常从付费专利数据库中导出各种电子表格文件，例如CSV文件或者XLS文件。这些文件包含了成百上千条专利著录项目。然而付费专利数据库的统计画图功能一般只能在系统中使用，无法对导出的电子表格进行专利分析。更无法对其他数据库导出的电子表格进行分析。

专利容器(Patent-Container)可以载入和组织这些文件，并基于这些文件进行专利分析。专利容器使用Python语言实现，其可视化部分使用JavaScript语言实现。

专利容器可以对一维、二维、三维数据建模。从专利数据库中导出的单个CSV或XLS文件属于二维数据。多个CSV或XLS文件的组合属于三维数据，三维数据的组织方式可以是数据立方体，或者是技术分支树。

对于不同的专利数据库，例如Patentics，incoPat，TI数据库等，专利容器通过适配数据库的字段，可以方便的导入数据。

对于不同的专利分析算法，例如申请年份统计、申请人统计、分类号统计，专利容器通过数据结构的标准化，可以兼容和切换同类算法。

二、目录

(一）patent_container_python

基于Python和Linux提供了专利容器的示意代码。推荐使用PyCharm社区版编辑器，执行其中的ydbj_container_test.py。

（二）yd_js

JS版的专利容器核心库。提供了yd_list、yd_dict、yd_mat、yd_frame、yd_tree等类。

（三）yd_php

PHP版的专利容器核心库。提供了yd_list、yd_dict、yd_mat、yd_frame等类。

（四）webchart_php_js

本项目属于专利容器的可视化部分，使用JavaScript语言实现。本项目提供了基础版的专利分析可视化功能。包括提取国别、检索式解析、申请人标准化、提取公开号、提取DWPI号、年份直方图、统计IPC、气泡散点图、气泡矩阵图、世界地图、中国地图等多种图表。

本项目的后台部分基于codeigniter框架实现。具体地，基于Github项目http://github.com/yangodongbjcn/webpage-includer-codeigniter 。

本项目的可视化是对Echarts的封装。由于Echarts需要的数据是JSON格式，而专利数据库一般二维表格形式，本项目提供了从二维表到JSON结构的统计和转换功能。Echarts的功能强大导致其配置也比较复杂，本项目对其进行了封装和简化。

三、扩展阅读

专利容器所需要的Python编程环境搭建，也给出了简要的步骤。

想要更多了解专利容器是什么，
请依次阅读以下页面:

https://github.com/yangdongbjcn/patent-container/blob/master/CONTAINER_THOUGHT.md 

https://github.com/yangdongbjcn/patent-container/blob/master/CONTAINER_DATA.md

https://github.com/yangdongbjcn/patent-container/blob/master/CONTAINER_EXAMPLE.md

https://github.com/yangdongbjcn/patent-container/blob/master/CONTAINER_DEV.md

更多的内容，将收录在微信公众号yangdongpatent。2019年出版的专著《玩转专利大数据——智慧容器助力专利分析与运营》第三章和第6.2节。或者直接访问网站http://zlrq.cn/web/yd/pc.html 。
