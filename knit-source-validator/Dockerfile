FROM node:22.2.0-bullseye

  ENV WORKDIR=/app

  RUN mkdir -p $WORKDIR

  WORKDIR $WORKDIR

  COPY . $WORKDIR

  RUN ls -al && npm i
  RUN npm run build
