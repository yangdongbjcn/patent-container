专利分析人员经常从付费专利数据库中导出各种电子表格文件，例如CSV文件或者XLS文件。这些文件包含了成百上千条专利著录项目。然而付费专利数据库的统计画图功能一般只能在系统中使用，无法对导出的电子表格进行专利分析。更无法对其他数据库导出的电子表格进行分析。

专利容器(Patent-Container)可以载入和组织这些文件，并基于这些文件进行专利分析。专利容器使用Python语言实现，其可视化部分使用JavaScript语言实现。

专利容器可以对一维、二维、三维数据建模。从专利数据库中导出的单个CSV或XLS文件属于二维数据。多个CSV或XLS文件的组合属于三维数据，三维数据的组织方式可以是数据立方体，或者是技术分支树。

对于不同的专利数据库，例如Patentics，incoPat，TI数据库等，专利容器通过适配数据库的字段，可以方便的导入数据。

对于不同的专利分析算法，例如申请年份统计、申请人统计、分类号统计，专利容器通过数据结构的标准化，可以兼容和切换同类算法。专利容器的画图功能发布在专利容器（JS版）中。专利容器还提供了基于JavaScript语言的专利分析可视化技术chart-container。请访问 https://github.com/yangdongbjcn/patent-chart 。
特别地，还提供了基于JavaScript语言的地理空间可视化技术map-container，可以支持对于中国地图和世界地图的可视化。请访问 https://github.com/yangdongbjcn/map-container 。

专利容器所需要的Python编程环境搭建，也给出了简要的步骤。

想要更多了解专利容器是什么，
请依次阅读以下页面:
https://github.com/yangdongbjcn/patent-container/blob/master/CONTAINER_THOUGHT.md 
https://github.com/yangdongbjcn/patent-container/blob/master/CONTAINER_DATA.md
https://github.com/yangdongbjcn/patent-container/blob/master/CONTAINER_EXAMPLE.md
https://github.com/yangdongbjcn/patent-container/blob/master/CONTAINER_DEV.md

本项目包含多个子文件夹，分别对应不同的项目。

1)patent-container子文件夹。该项目适合Windows环境。

2)patent-container-linux子文件夹。该项目适合Ubuntu Linux环境。

更多的内容，将收录在微信公众号yangdongpatent。2019年出版的专著《玩转专利大数据——智慧容器助力专利分析与运营》第三章和第6.2节。或者直接访问网站http://zlrq.cn 。
