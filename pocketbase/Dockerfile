FROM node:22.2.0-bullseye as builder

  ENV WORKDIR=/app

  RUN mkdir -p $WORKDIR

  WORKDIR $WORKDIR

  COPY ../.env $WORKDIR/.env
  COPY ../svelte $WORKDIR/svelte

  # config user
  RUN addgroup --system svelte && adduser --system svelte

  WORKDIR $WORKDIR/svelte

  RUN npm i
  RUN npm run build

FROM ubuntu:22.04

  ENV WORKDIR=/app

  RUN apt update -y
  RUN apt upgrade -y
  RUN apt install wget unzip curl -y
  RUN mkdir -p $WORKDIR

  WORKDIR $WORKDIR

  COPY ../.env $WORKDIR/.env
  COPY ../pocketbase/scripts/docker-entrypoint.sh $WORKDIR/scripts/docker-entrypoint.sh

  RUN wget -O '/tmp/pocketbase.zip' https://github.com/pocketbase/pocketbase/releases/download/v0.22.11/pocketbase_0.22.11_linux_arm64.zip
  RUN unzip /tmp/pocketbase.zip -d /usr/local/bin/
  RUN rm /tmp/pocketbase.zip

  # config user
  RUN addgroup --system pocketbase && adduser --system pocketbase

  RUN mkdir -p /pb_data /pb_public /pb_migrations

  VOLUME /pb_data
  
  COPY --from=builder $WORKDIR/svelte/build /pb_public

  RUN chown pocketbase:pocketbase /usr/local/bin/pocketbase
  RUN chown pocketbase:pocketbase /pb_data
  RUN chown pocketbase:pocketbase /pb_public
  RUN chown pocketbase:pocketbase /pb_migrations
  RUN chmod 710 /usr/local/bin/pocketbase

  USER pocketbase
  EXPOSE 8090

  # Command to run the executable
  CMD ["./scripts/docker-entrypoint.sh"]
