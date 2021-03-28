apt update && apt install -y iptables iproutes2

#iptables -A PREROUTING -t nat -p tcp -d 192.168.0.109 --dport 8080 -m statistic --mode nth --every 3 --packet 0 -j DNAT --to-destination 172.17.0.4:8080
iptables -A PREROUTING -t nat -p tcp --dport 8080 -m statistic --mode nth --every 2 --packet 0 -j DNAT --to-destination 172.17.0.3:8080
iptables -A PREROUTING -t nat -p tcp --dport 8080 -m statistic --mode nth --every 1 --packet 0 -j DNAT --to-destination 172.17.0.4:8080

#iptables -t filter -A FORWARD -d 172.17.0.4 --dport 8080 -j ACCEPT
iptables -t filter -A FORWARD -p tcp --dport 8080 -j ACCEPT

docker stats

#list rules
iptables -t filter -v -L FORWARD -n --line-number
iptables -t nat -v -L PREROUTING -n --line-number

#delete rules
iptables -t filter -D FORWARD 1
iptables -t nat -D PREROUTING 1
