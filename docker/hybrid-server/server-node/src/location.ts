import http from 'http';

const cache = new Map<string, Promise<{ country: string, city: string } | null>>()
export async function getLocation(addr: string): Promise<{ country: string, city: string } | null> {
  if (!cache.has(addr)) {
    cache.set(addr, fetchNewLocation(addr))
  }
  return (await cache.get(addr)) ?? null
}

async function fetchNewLocation(hostname: string) {
  console.log("Fetching new location")
  try {
    const res = await new Promise<{ country: string, city: string }>((resolve, reject) => {
      http.get(createURL(hostname), (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          resolve(JSON.parse(data));
        });
      }).on("error", (err) => {
        reject(err)
      });
    })
    return res
  }
  catch (e) {
    console.error("Failed to fetch new location", e)
  }
  return null
}

function isPrivateIP(ip: string) {
  return /(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/.test(ip)
}

function createURL(ip: string) {
  const fieldsParam = 'fields=status,message,country,city'
  if (isPrivateIP(ip)) {
    return `http://ip-api.com/json?${fieldsParam}`
  }
  console.log("Not private", ip)
  return `http://ip-api.com/json/${ip}?${fieldsParam}`
}