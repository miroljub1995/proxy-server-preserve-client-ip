FROM ubuntu:18.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y iptables iproute2 snort nginx supervisor
RUN snort -T -c /etc/snort/snort.conf

# ############### Test snort #################
RUN echo 'alert icmp any any -> $HOME_NET any (msg:"ICMP test works"; sid:10000001; rev:001;)' > /etc/snort/rules/local.rules
# RUN snort -A console -c /etc/snort/snort.conf
# ##### ping this container from another #####
# ############################################

# ############## Add SYN flood rule #########
RUN echo 'alert tcp any any -> $HOME_NET any (flags: S; msg:"Possible TCP DoS"; flow: stateless; detection_filter: track by_src, count 50, seconds 1; sid:10000002)' >> /etc/snort/rules/local.rules

ADD nginx.conf /etc/nginx/
EXPOSE 8080

# ######### add network setup script #########
RUN echo "2000 VIP" >> /etc/iproute2/rt_tables
ADD setup.sh /setup/
RUN chmod +x /setup/setup.sh

ADD supervisord.conf /etc/supervisor/conf.d/
CMD supervisord