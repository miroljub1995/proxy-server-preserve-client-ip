FROM ubuntu:18.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y snort nginx supervisor tcpdump curl && rm -rf /var/lib/apt/lists/*
RUN snort -T -c /etc/snort/snort.conf

# ############### Test snort #################
# RUN echo 'alert icmp any any -> $HOME_NET any (msg:"ICMP test"; sid:10000001; rev:001;)' > /etc/snort/rules/local.rules
# RUN snort -A console -c /etc/snort/snort.conf
# ##### ping this container from another #####
# ############################################

ADD nginx.conf                   /etc/nginx/
ADD dunja-home.ddns.net8184.cert /etc/ssl/certs/
ADD dunja-home.ddns.net8184.key  /etc/ssl/certs/
EXPOSE 8083
EXPOSE 8084
EXPOSE 8184

ADD supervisord.conf /etc/supervisor/conf.d/
CMD supervisord