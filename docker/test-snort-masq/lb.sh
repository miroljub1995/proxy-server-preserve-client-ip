apt update && apt install -y iptables iproute2

#iptables -A PREROUTING -t nat -p tcp -d 192.168.0.109 --dport 8080 -m statistic --mode nth --every 3 --packet 0 -j DNAT --to-destination 172.17.0.4:8080
iptables -A PREROUTING -t nat -p tcp --dport 8080 -m statistic --mode nth --every 2 --packet 0 -j DNAT --to-destination 172.17.0.3:8080
iptables -A PREROUTING -t nat -p tcp --dport 8080 -m statistic --mode nth --every 1 --packet 0 -j DNAT --to-destination 172.17.0.4:8080

#iptables -t filter -A FORWARD -d 172.17.0.4 --dport 8080 -j ACCEPT
iptables -t filter -A FORWARD -p tcp --dport 8080 -j ACCEPT

iptables -t nat -A POSTROUTING -j MASQUERADE

docker stats