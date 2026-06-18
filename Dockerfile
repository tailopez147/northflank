FROM denoland/deno:2.0.0

WORKDIR /app

COPY main.ts .

EXPOSE 8080

CMD ["run", "--allow-net", "--allow-env", "main.ts"]
