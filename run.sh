docker run --restart=always --name redis-webserver-online-notifier -d redis
docker run --restart=always --env-file dotenv --name webservice-online-notifier --link redis-webserver-online-notifier:redis -d webservice-online-notifier
