# coding: utf-8

from collections import defaultdict

master_salves_table = defaultdict(list)

# for master
def init_master(topic):
    return master_salves_table[topic]

def master_send(topic, type, *a, **kw):
    for slave in master_salves_table[topic]:
        slave.slaveReceive(topic, type, *a, **kw)

def master_collect(topic, type):
    t_result = defaultdict(list)
    for slave in master_salves_table[topic]:
        t_result[topic] = slave.slaveReport(topic, type)
    return t_result

def get_slaves(topic):
    return master_salves_table[topic]

# for slave
def slave_connect(topic, slave):
    if not (slave in master_salves_table[topic]):
        return master_salves_table[topic].append(slave)

def slave_disconnect(topic, slave):
    master_salves_table[topic].remove(slave)
