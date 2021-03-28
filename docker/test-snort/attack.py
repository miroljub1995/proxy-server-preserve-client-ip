import http.client
con = http.client.HTTPConnection('172.17.0.2:8080')
con.request("GET", "/")
r = con.getresponse()
print(r.read())
con.close()

for n in range(2000):
  con = http.client.HTTPConnection('172.17.0.2:8080')
  con.connect()

print("Done...\r\n")