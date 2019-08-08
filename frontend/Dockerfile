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
CMD node loader.js
CMD ["npm", "start"]
