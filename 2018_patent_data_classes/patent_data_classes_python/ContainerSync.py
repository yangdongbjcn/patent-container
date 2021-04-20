# coding: utf-8

from collections import defaultdict

sync_table = defaultdict(list)

def init(topic):
    return sync_table[topic]

def sub(topic, subscriber):
    if not (subscriber in sync_table[topic]):
        return sync_table[topic].append(subscriber)

def pub(topic, type, *a, **kw):
    for subscriber in sync_table[topic]:
        subscriber.receiveSync(topic, type, *a, **kw)

def unsub(topic, subscriber):
    sync_table[topic].remove(subscriber)
