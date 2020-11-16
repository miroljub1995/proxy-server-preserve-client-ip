FROM ubuntu:18.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y iptables && rm -rf /var/lib/apt/lists/*

ADD ./setup-iptables.sh /app/
RUN chmod +x /app/setup-iptables.sh
RUN echo "#!/bin/bash" >> /etc/rc0.d/rc.local
RUN echo "bash /app/setup-iptables.sh" >> /etc/rc0.d/rc.local
RUN chmod +x /etc/rc0.d/rc.local

WORKDIR /app/
# ENTRYPOINT [ "/bin/bash" ]
CMD [ "/app/setup-iptables.sh" ]
# CMD ["/bin/bash", "/app/setup-iptables.sh", "&&", "/bin bash" ]