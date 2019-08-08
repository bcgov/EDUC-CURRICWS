FROM node:lts-alpine

# Move to App Folder
WORKDIR /opt/app-root/src

# Install NPM Dependencies
COPY package*.json ./
RUN npm i
# --no-optional --production

# Build Application
COPY . /opt/app-root/src
RUN npm -v
EXPOSE 8080 2015 1521 443 27017
#CMD ["npm", "start"]
CMD MONGO_DB_USERNAME=/var/lib/mongodb/data/username MONGO_DB_PASSWORD=/var/lib/mongodb/data/password npm start
