sudo docker build -t mess-clone-api .
sudo docker stop mess-clone-api
sudo docker rm mess-clone-api
sudo docker run --name mess-clone-api -p 3003:3000  --env NODE_ENV=staging  -d -t mess-clone-api