import socket
def connect(ip):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(30)
    try:
        s.connect((ip, 80))
    except:
        s.close()
        raise Exception("Closed")
    totalsent = 0
    msg = b'DLM'
    while totalsent < len(msg):
        sent = s.send(msg[totalsent:])
        if sent == 0:
            raise RuntimeError("Socket Connection Broken")
        totalsent = totalsent + sent
    
    chunks = []
    bytes_recd = 0
    while bytes_recd < len(msg):
        chunk = s.recv(4096)
        if chunk == b'':
            raise RuntimeError("Socket Connection Broken")
        chunks.append(chunk)
        bytes_recd = bytes_recd + len(chunk)
    return b''.join(chunks)

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

thisIP = get_ip()
thisNetBits = thisIP.split(".")
print(thisNetBits)
thisSubNet = str(thisNetBits[0] + "." + thisNetBits[1] + "." + thisNetBits[2] + ".")
print(thisSubNet)

print(connect('192.168.3.124'))