import time
import os
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

os.system('vboxmanage metrics enable')


def getLoad():
    res = os.popen(
        'vboxmanage metrics query | grep "kube.* CPU/Load/.*:avg"').read()
    # print(res)

    lines = res.split("\n")[:-1]
    # print(lines)
    load = {}
    for line in lines:
        tokens = line.split()
        name = tokens[0]
        val = float(tokens[2][:-1])
        load[name] = val + load.get(name, 0)
        # print(name + " " + str(val))
    # print(load)
    return load


# values = {"kube1":[[1,2,3,4], [7.5,1.2,1.6,9]]}
values = {}
ts = [0]


def updateValues(load):
    for [key, val] in load.items():
        pltVal = values.get(key, [[], []])
        pltVal[0].append(ts[0])
        pltVal[1].append(val)
        if len(pltVal[0]) > 100:
            del pltVal[0][0]
            del pltVal[1][0]
        values[key] = pltVal
    ts[0] += 1


# updateValues(getLoad())
# time.sleep(1)
# updateValues(getLoad())
# print(values)


def updateFigure():
    for [key, val] in values.items():
        plt.plot(val[0], val[1], label=key)


# updateFigure()
# plt.show()


# def run():
#     while True:
#         plt.cla()
#         updateValues(getLoad())
#         updateFigure()
#         # mypause(0.5)
#         plt.pause(0.5)
# run()


def run(frames):
    plt.cla()
    updateValues(getLoad())
    updateFigure()
    plt.legend()
    plt.ylim([0, 100])


a = FuncAnimation(plt.gcf(), run, interval=700)
plt.show()
exit()
# evenly sampled time at 200ms intervals
t1x = np.arange(0., 5., 0.2)
t1y = np.arange(0., 10., 0.4)


t2x = np.arange(0., 5., 0.2)
t2y = np.arange(0., 20., 0.8)

# red dashes, blue squares and green triangles
plt.plot(t1x, t1y)
plt.plot(t2x, t2y)
plt.show()
