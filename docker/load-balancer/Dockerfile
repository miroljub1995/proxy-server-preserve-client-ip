FROM ubuntu:18.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y iptables vim curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt update && apt install -y nodejs && rm -rf /var/lib/apt/lists/*

ADD ./setup-iptables.sh /app/
RUN chmod +x /app/setup-iptables.sh
RUN echo "#!/bin/bash" >> /etc/rc0.d/rc.local
RUN echo "bash /app/setup-iptables.sh" >> /etc/rc0.d/rc.local
RUN chmod +x /etc/rc0.d/rc.local

WORKDIR /app/
##### add nodejs
COPY package.json /app/
COPY package-lock.json /app/
COPY src /app/src
RUN npm i
# ENTRYPOINT [ "/bin/bash" ]
# CMD [ "/app/setup-iptables.sh" ]
CMD ["npm", "start"]