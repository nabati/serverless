# Dashboard

- https://collabnix.com/kubernetes-dashboard-on-docker-desktop-for-windows-2-0-0-3-in-2-minutes/
- http://www.bennythejudge.com/blog/kubernetes/howtos/macos/2018/02/10/kubernetes-dashboard-secret.html
- https://medium.com/@thms.hmm/docker-for-mac-with-kubernetes-enable-k8s-dashboard-62fe036b7480
- https://forums.docker.com/t/docker-for-mac-kubernetes-dashboard/44116/8

kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml

1. install the Dashboard --> `???`
1. Run the proxy --> `kubectl proxy`
1. Get the token --> `kubectl describe secret kubernetes-dashboard --namespace=kube-system`
1. Open up the browser --> `http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/`

# important

kubectl get configuration
kubectl get pods
kubectl get revision

# Knative

curl -H "Host: localhost" 192.168.65.3:31121

kubectl get pods --namespace istio-system

kubectl get pods --namespace knative-serving
kubectl get pods --namespace knative-build
kubectl get pods --namespace knative-eventing
kubectl get pods --namespace knative-sources
kubectl get pods --namespace knative-monitoring

kubectl get svc istio-ingressgateway --namespace istio-system

kubectl get route <name> --output=custom-columns=NAME:.metadata.name,URL:.status.url

kubectl get node --output 'jsonpath={.items[0].status.addresses[0].address}'
kubectl get svc istio-ingressgateway --namespace istio-system --output 'jsonpath={.spec.ports[?(@.port==80)].nodePort}'
