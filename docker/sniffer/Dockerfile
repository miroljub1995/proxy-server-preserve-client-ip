FROM alpine AS builder

RUN apk add build-base
RUN apk add libpcap

COPY src/* /app/
WORKDIR /app/
RUN g++ -o sniffer sniffer.c

FROM alpine
COPY --from=builder /app/sniffer /app/sniffer
WORKDIR /app/
CMD ["./sniffer"]