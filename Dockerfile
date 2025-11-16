FROM node:18

WORKDIR /TextSummarizerAndParaphraserTool

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm","start"]

