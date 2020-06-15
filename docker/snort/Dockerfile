FROM ubuntu:18.04
RUN apt update && apt upgrade -y

RUN apt install -y wget build-essential libpcap-dev libpcre3-dev libdumbnet-dev libdaq-dev zlib1g-dev flex bison libluajit-5.1-dev pkg-config libssl-dev
WORKDIR /app/
RUN wget https://www.snort.org/downloads/snort/snort-2.9.16.tar.gz
RUN tar xvzf snort-2.9.16.tar.gz
                      
WORKDIR /app/snort-2.9.16/
RUN ./configure --enable-sourcefire && make && make install
RUN mkdir -p /etc/snort/rules
RUN mkdir /var/log/snort
RUN mkdir /usr/local/lib/snort_dynamicrules
RUN touch /etc/snort/rules/white_list.rules
RUN touch /etc/snort/rules/black_list.rules
RUN touch /etc/snort/rules/local.rules
RUN cp /app/snort-2.9.16/etc/*.conf* /etc/snort
RUN cp /app/snort-2.9.16/etc/*.map /etc/snort
WORKDIR /app/
RUN wget https://www.snort.org/downloads/community/community-rules.tar.gz
RUN tar -xvzf community-rules.tar.gz -C /etc/snort/rules
# in /etc/snort/snort.conf set ipvar HOME_NET server_public_IP/32
# in /etc/snort/snort.conf set ipvar EXTERNAL_NET !$HOME_NET

RUN sed -i 's/var RULE_PATH ..\//var RULE_PATH /' /etc/snort/snort.conf
RUN sed -i 's/var SO_RULE_PATH ..\//var SO_RULE_PATH /' /etc/snort/snort.conf
RUN sed -i 's/var PREPROC_RULE_PATH ..\//var PREPROC_RULE_PATH /' /etc/snort/snort.conf
RUN sed -i 's/var WHITE_LIST_PATH ..\//var WHITE_LIST_PATH /' /etc/snort/snort.conf
RUN sed -i 's/var BLACK_LIST_PATH ..\//var BLACK_LIST_PATH /' /etc/snort/snort.conf

RUN sed -i 's/# output unified2/output unified2/' /etc/snort/snort.conf
RUN sed -i 's/include \$RULE_PATH/# include \$RULE_PATH/' /etc/snort/snort.conf
RUN sed -i 's/# include \$RULE\_PATH\/local.rules/include \$RULE\_PATH\/local.rules\ninclude \$RULE\_PATH\/community-rules\/community.rules/' /etc/snort/snort.conf
RUN snort -T -c /etc/snort/snort.conf

CMD [ "snort" "-q" "-c" "/etc/snort/snort.conf" ]