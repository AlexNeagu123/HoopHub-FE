FROM node:lts-alpine as build
WORKDIR /app
COPY ./package*.json .
RUN rm -rf node_modules
RUN rm -rf build
RUN npm install
COPY . .
RUN npm run build
#
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules node_modules/

EXPOSE 5176
ENV PORT=5176 

CMD [ "node", "build" ]



