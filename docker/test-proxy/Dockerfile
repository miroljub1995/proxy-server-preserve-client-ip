FROM ubuntu:18.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y iptables iproute2 snort nginx supervisor tcpdump curl && rm -rf /var/lib/apt/lists/*
RUN snort -T -c /etc/snort/snort.conf

# ############## Add SYN flood rule #########
RUN echo 'alert tcp any any -> $HOME_NET any (flags: S; msg:"Possible TCP DoS"; flow: stateless; detection_filter: track by_src, count 50, seconds 1; sid:10000002)' >> /etc/snort/rules/local.rules

ADD nginx.conf /etc/nginx/
EXPOSE 8080

ADD supervisord.conf /etc/supervisor/conf.d/
CMD supervisord