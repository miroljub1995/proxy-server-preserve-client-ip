const k8s = require('@kubernetes/client-node')

const kc = new k8s.KubeConfig()
kc.loadFromDefault()

const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

// k8sApi.listNamespacedPod('default').then((res) => {
//   const lbPod = res.body.items.find(p => p.metadata.labels['app'] === 'load-balancer')
// })

// const appsApi = kc.makeApiClient(k8s.AppsV1Api)
// appsApi.listNamespacedDeployment('default').then(res => {
//   for (const depl in res.body.items) {

//   }
// })

k8sApi
  .listNamespacedService('default', null, null, null, null, "app=load-balancer")
  .then(res => {
    const lbService = res.body.items.length && res.body.items[0]
    if (lbService) {
      console.log(lbService.spec.externalIPs)
    }
  })