FROM node:14.19.2 as builder
WORKDIR /opt/app
COPY package-lock.json /opt/app
COPY package.json /opt/app
RUN npm install
COPY . /opt/app
RUN npm run build

FROM node:14.19.2
WORKDIR /opt/app
RUN npm install pm2 -g
COPY --from=builder /opt/app/package.json /opt/app/ecosystem.config.js  /opt/app/
COPY --from=builder /opt/app/dist /opt/app/dist/
COPY --from=builder /opt/app/public /opt/app/dist/public/
COPY --from=builder /opt/app/node_modules /opt/app/node_modules
EXPOSE 3000 
CMD ["pm2-runtime", "ecosystem.config.js"]
