FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

ENV HOST=0.0.0.0
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]