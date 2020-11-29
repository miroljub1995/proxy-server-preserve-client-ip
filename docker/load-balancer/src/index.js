const k8s = require('@kubernetes/client-node')
const { exec } = require('child_process')
const kc = new k8s.KubeConfig()
kc.loadFromDefault()
const k8sApi = kc.makeApiClient(k8s.CoreV1Api)
const appName = "protected-proxy"
const appPort = "8084"

function getPreroutingCommand(every, toDestination, del) {
  return `iptables -${del ? 'D' : 'A'} PREROUTING -t nat -p tcp --dport 8080 -m statistic --mode nth --every ${every} --packet 0 -j DNAT --to-destination ${toDestination}:${appPort}`
}

function getForwardCommand(toDestination, del) {
  return `iptables -t filter -${del ? 'D' : 'A'} FORWARD -p tcp -d ${toDestination} --dport ${appPort} -j ACCEPT`
}

let dstIPs = []

function isIPsChanged(ips) {
  return JSON.stringify(dstIPs) !== JSON.stringify(ips)
}

function execCommand(cmd) {
  exec(cmd, err => err && console.log(err))
}

function removeOldCommand(every, toDestination) {
  execCommand(getForwardCommand(toDestination, true))
  execCommand(getPreroutingCommand(every, toDestination, true))
}

function addNewCommand(every, toDestination) {
  execCommand(getPreroutingCommand(every, toDestination, false))
  execCommand(getForwardCommand(toDestination, false))
}

function removeOldCommands(ips) {
  for (let i = 0; i < ips.length; i++) {
    removeOldCommand(i + 1, ips[i])
  }
}

function addNewCommands(ips) {
  for (let i = ips.length - 1; i >= 0; i--) {
    addNewCommand(i + 1, ips[i])
  }
}

function newIPsReceived(ips) {
  if (isIPsChanged(ips)) {
    removeOldCommands(dstIPs)
    addNewCommands(ips)
    dstIPs = ips
  }
}

function updateTables() {
  k8sApi
    .listNamespacedPod('default', null, null, null, null, `app=${appName}`)
    .then(res => {
      const pods = res.body.items
      const podIPs = pods.map(p => p.status.podIP).sort()
      newIPsReceived(podIPs)
    })
}

execCommand("echo 1 > /proc/sys/net/ipv4/ip_forward")
execCommand("iptables -t nat -A POSTROUTING -j MASQUERADE")
// updateTables()
setInterval(updateTables, 3000)