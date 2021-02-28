FROM ubuntu:18.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y iptables iproute2

ADD setup.sh /setup/
CMD /setup/setup.sh