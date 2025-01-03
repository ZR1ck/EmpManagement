# Stage Build
FROM node:20.16-alpine as build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Stage Create the final image
FROM node:20.16-alpine
WORKDIR /app
COPY --from=build /app/build /app/build
EXPOSE 3000
CMD ["npm", "start"]
