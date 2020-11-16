const k8s = require('@kubernetes/client-node')

const kc = new k8s.KubeConfig()
kc.loadFromDefault()

const k8sApi = kc.makeApiClient(k8s.CoreV1Api)
const appsApi = kc.makeApiClient(k8s.AppsV1Api)

k8sApi.listNamespacedPod('default').then((res) => {
  console.log(res.body);
  for(const pod in res.body.items) {
    
  }
})

appsApi.listNamespacedDeployment('default').then(res => {
  for(const depl in res.body.items) {
    
  }
})