import socket
from getmac import get_mac_address

DLM_IP_LIST = []

DLM_DEVICE_LIST = []

def get_mac(ipAddr):
    macAddr = get_mac_address(ip=ipAddr, network_request=True)
    return macAddr

def validate_device(ip):
    data = b''
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.005)
    #print(ip)
    try:
        s.connect((ip, 9019))
        sent = s.sendall(b'PING')
        if sent == 0:
            pass
            raise RuntimeError("Socket Connection Broken")
        data = s.recv(2048)
    except:
        pass
        #print("badIP - timeout")
    finally:
        s.close()
     
    if data == b'DLM':
        DLM_IP_LIST.append(ip)
        print("goodIP")
    #else:
        #print("badIP")


def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.settimeout(0)
    try:
        # doesn't even have to be reachable
        s.connect(('10.254.254.254', 80))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

def get_subnet(ip):
    netSplit = ip.split(".")
    #print(netSplit)
    subnet = str(netSplit[0] + "." + netSplit[1] + "." + netSplit[2] + ".")
    return subnet

def write_list_as_row(filename, list):
    with open(filename, 'w', newline='') as write_obj:
        for i in list:
            #print(i)
            write_obj.writelines(i[0] + ',' + i[1] + ',DLM\n')

thisIP = get_ip()
thisSubnet = get_subnet(thisIP)
#print(thisSubnet)
num = 0
ip_list = []

while num <= 225:
    ip = thisSubnet + str(num)
    ip_list.append(ip)
    num += 1

for i in ip_list:
    validate_device(i)

#print(DLM_IP_LIST)
for i in DLM_IP_LIST:
    mac = get_mac(i)
    DLM_DEVICE_LIST.append([i, mac])
    #print(mac)

write_list_as_row("./src/controllerList.csv", DLM_DEVICE_LIST)