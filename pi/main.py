import socket
import struct
import json
import time

Thing_ID = []
ServiceName = []
IP_Addr = []
isScanning = True
time_start = time.time()

def find_value(dir_data, fvalue):
    result = False
    if len(dir_data) == 0:
        return result

    for i in range(len(dir_data)):
        if (dir_data[i] == fvalue):
            result = True
            break
    return result


multicast_group = '232.1.1.1'
server_address = ('', 1235)

# open a UDP socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind(server_address)
# assign and set up group
group = socket.inet_aton(multicast_group)
mreq = struct.pack('4sL', group, socket.INADDR_ANY)
s.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)

def scan():
    while True:
        data, address = s.recvfrom(1024)
        print(address)
        tweet = json.loads(data)
        print(tweet)

        if 'Thing ID' in tweet:
            if find_value(Thing_ID, tweet["Thing ID"]) is False:
                Thing_ID.append(tweet["Thing ID"])

        if 'Name' in tweet:
            if find_value(ServiceName, tweet["Name"]) is False and len(tweet["Name"]) != 0:
                ServiceName.append(tweet["Name"])

        if find_value(IP_Addr, address) is False:
            IP_Addr.append(address)

        time_end = time.time()

        if time_end - time_start > 40:
            isScanning = False
            break


def tcpInit1():
    ss = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    ss.connect(("192.168.0.28", 6668))
    return ss


def tcpInit2():
    sss = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sss.connect(("192.168.0.29", 6668))
    return sss


if __name__ == '__main__':
    with open('C:/Users/38658/PycharmProjects/flaskProject/isScanning.txt', 'w') as fa:
        fa.write('True')

    scan()

    with open('C:/Users/38658/PycharmProjects/flaskProject/ThingID.txt', 'w') as fb:
        fb.write(json.JSONEncoder().encode(Thing_ID))

    with open('C:/Users/38658/PycharmProjects/flaskProject/ServiceName.txt', 'w') as fc:
        fc.write(json.JSONEncoder().encode(ServiceName))

    with open('C:/Users/38658/PycharmProjects/flaskProject/IPAddr.txt', 'w') as fd:
        fd.write(json.JSONEncoder().encode(IP_Addr))

    with open('C:/Users/38658/PycharmProjects/flaskProject/isScanning.txt', 'w') as fe:
        fe.write('False')

    # set up pi connection
    # pi 1

    tap = b'{"Tweet Type":"Service call","Thing ID":"MySmartThing01","Space ID":"MySmartSpace","``Service`` Name":"tap","Service Inputs":"()"}'
    blink = b'{"Tweet Type":"Service call","Thing ID":"MySmartThing01","Space ID":"MySmartSpace","Service Name":"blink","Service Inputs":"()"}'
    off = b'{"Tweet Type":"Service call","Thing ID":"MySmartThing01","Space ID":"MySmartSpace","Service Name":"off","Service Inputs":"()"}'
    tem = b'{"Tweet Type":"Service call","Thing ID":"MySmartThing01","Space ID":"MySmartSpace","Service Name":"tem","Service Inputs":"()"}'

    # pi 2
    #s2 = tcpInit2()
    #tap1 = b'{"Tweet Type":"Service call","Thing ID":"AlexSmartThing","Space ID":"AlexSmartSpace","Service Name":"tap","Service Inputs":"()"}'
    #blink1 = b'{"Tweet Type":"Service call","Thing ID":"AlexSmartThing","Space ID":"AlexSmartSpace","Service Name":"blink","Service Inputs":"()"}'
    #off1 = b'{"Tweet Type":"Service call","Thing ID":"AlexSmartThing","Space ID":"AlexSmartSpace","Service Name":"off","Service Inputs":"()"}

    tem_path = "C:/Users/38658/PycharmProjects/flaskProject/tempreture.txt"

    def execute(service):
        if service == "tap":
            s1 = tcpInit1()
            s1.sendall(tap)
            print(tap)
            s1.close()
            datax = s1.recv(1024)
            print(datax)
        elif service == "blink":
            s1 = tcpInit1()
            s1.sendall(blink)
            datax = s1.recv(1000)
            print(datax)
            s1.close()
        elif service == "off":
            s1 = tcpInit1()
            s1.sendall(off)
            datax = s1.recv(1000)
            s1.close()
            print(datax)
        elif service == "tem":
            s1 = tcpInit1()
            s1.sendall(tem)
            datax = s1.recv(1000)
            s1.close()
            print(datax)
            with open(tem_path, 'w') as fn:
                ddd = json.loads(datax)
                fn.write(ddd["Service Result"])
        #elif service == "tap1":
            #s2 = tcpInit2()
            #s2.sendall(tap1)
            #datax = s2.recv(1000)
            #s2.close()
        #elif service == "blink1":
            #s2 = tcpInit2()
            #s2.sendall(blink1)
            #datax = s2.recv(1000)
            #s2.close()
        #elif service == "off1":
            #s2 = tcpInit2()

            #s2.sendall(off1)
            #datax = s2.recv(1000)
            #s2.close()
        #elif service == "tem1":
            #s2 = tcpInit2()
            #s2.sendall(tem1)
            #datax = s2.recv(1000)
            #s2.close()
            #with open(tem_path, 'w') as fn1:
                #fn1.writelines(datax)
        return datax


    #Activate:
    substring1 = "True"
    substring2 = "Executing"
    substring3 = "stop"

    first = True

    while True:
        time.sleep(3)
        with open('./isActivate.txt', 'r') as f1:
            b = f1.read().strip()

        if substring1 in b:
            if first:
                with open('./isActivate.txt', 'w') as f2:
                    f2.writelines(substring2)
                    print("Executing Written!!!")
                first = False

            with open('./activate.txt', 'r') as f:
                a = f.read().strip()
            if len(a) > 5:
                # get services and relationship
                relationship = a.split()[0]
                service1 = a.split()[1]
                service2 = a.split()[2]
                print(relationship + service1 + service2)
                # execute service
                data1 = execute(service1)
                if len(data1) > 20:
                    data2 = execute(service2)
            else:
                # get service name
                service3 = a
                # execute service
                data3 = execute(service3)
        if substring2 in b:
            continue
        if substring3 in b:
            s1 = tcpInit1()
            s1.sendall(off)
            dataxx = s1.recv(1000)
            print(dataxx)
            s1.close()
            #s2 = tcpInit2()
            #s2.sendall(off)
            #s2.close()

            with open('./isActivate.txt', 'w') as fx:
                fx.writelines("False")