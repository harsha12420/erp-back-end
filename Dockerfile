FROM node:18.17.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

#RUN node --max-old-space-size=8000

RUN npm install

COPY . .

RUN npm run build

# CMD node dist/main.js
#CMD npm run typeorm migration:run && node dist/main.js
#CMD ["npm", "run", "start:dev"]
CMD node dist/main.js seed
# CMD ["node", "dist/main.js"]