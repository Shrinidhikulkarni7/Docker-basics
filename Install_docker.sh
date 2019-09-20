#Executing this script would install docker on your system. Be root, to avoid permissions errors.

curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker $USER
