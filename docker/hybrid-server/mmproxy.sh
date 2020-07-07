#setup for mmproxy
ip rule add from 127.0.0.1/8 iif lo table 123
ip route add local 0.0.0.0/0 dev lo table 123

ip -6 rule add from ::1/128 iif lo table 123
ip -6 route add local ::/0 dev lo table 123

/apps/mmproxy/go-mmproxy -l 0.0.0.0:8082 -4 127.0.0.1:8080 -v 2