Repository for creating 
# Run locally with openshift CLI
oc login <your login>
oc port-forward <pod> 27017:8888

nodemon --exec npm run start:local

In your browser go to: http://localhost:8080
