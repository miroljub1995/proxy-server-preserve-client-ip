#!/bin/bash

ip route add default via 172.17.0.2 table VIP
iptables -t mangle -A OUTPUT -p tcp --sport 8080 -j MARK --set-mark 1
ip rule add from all fwmark 1 table VIP
echo "Done" > /setup/bash.txt