#!/bin/bash

#iptables -A PREROUTING -t nat -p tcp -d 192.168.0.109 --dport 8080 -m statistic --mode nth --every 3 --packet 0 -j DNAT --to-destination 172.17.0.4:8080
iptables -A PREROUTING -t nat -p tcp -d 172.17.0.4 --dport 8080 -m statistic --mode nth --every 2 --packet 0 -j DNAT --to-destination 172.17.0.2:8080
iptables -A PREROUTING -t nat -p tcp -d 172.17.0.4 --dport 8080 -j DNAT --to-destination 172.17.0.3:8080

#iptables -t filter -A FORWARD -d 172.17.0.4 --dport 8080 -j ACCEPT
iptables -t filter -A FORWARD -p tcp -d 172.17.0.2 --dport 8080 -j ACCEPT
iptables -t filter -A FORWARD -p tcp -d 172.17.0.3 --dport 8080 -j ACCEPT

sleep infinity