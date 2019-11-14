

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


ARG LOAD_DATA=0
RUN chmod u+x ./script/dockerArgs.sh && sh ./scripts/dockerArgs.sh $LOAD_DATA
#RUN npm load
CMD ["npm", "start"]


