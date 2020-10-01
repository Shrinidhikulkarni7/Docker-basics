FROM node:10
#This downloads the node image which can be found here - https://hub.docker.com/_/node/

WORKDIR /app/web
#The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile.

COPY . /app/web
#COPY command copies the content which are in current directory ( which is denoted by '.') and copies to /app/web inside docker image.

RUN npm install
#RUN executes command in new layer, it is often used to install packages.

EXPOSE 8081
#The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime

CMD [ "node", "index.js" ]
# CMD is the command to run when container starts

