FROM ubuntu:18.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y iptables iproute2

ADD setup.sh /setup/
RUN chmod +x /setup/setup.sh
CMD /setup/setup.sh