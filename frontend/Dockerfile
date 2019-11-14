

FROM node:lts-alpine

# Move to App Folder
WORKDIR /opt/app-root/src

# Install NPM Dependencies
COPY package*.json ./
RUN npm i
# --no-optional --production

# Build Application
COPY . /opt/app-root/src
EXPOSE 8080 2015 1521 443 27017

# Check if we need to load data
ARG LOAD_DATA = 0
#RUN chmod u+x /opt/app-root/src/script/dockerArgs && /opt/app-root/src/scripts/dockerArgs $LOAD_DATA
RUN echo $LOAD_DATA

#RUN npm load
CMD ["npm", "start"]


