#encoding=utf-8
def bubble_sort(a):
    #a_order 为从0到len-1的序号
    a_order = []
    for t in range(len(a)):
        a_order.append(t)
    #冒泡排序
    t_len=len(a)-2
    i=0
    while i<t_len:
        j=t_len
        while j>=i:
            if(a[j+1]<a[j]):
                a[j],a[j+1]=a[j+1],a[j]
                #冒泡排序中加了一句，同时调整序号数组
                a_order[j],a_order[j+1]=a_order[j+1],a_order[j]
            j-=1
        i+=1
    return a_order