# Webservice Online Notifier

A simple script that checks if your webservices are online, and notifies you
when they're not.  Run the script at intervals.

Requires node and redis.

## Docker deployment

Create a file called `dotenv`.  It's not `.env` because it should be
visible on the host machine, rather than hidden.  (See the .env configuration
section)

### Running

```
./build.sh        # build the docker image
docker pull redis # pull the Redis docker image
./run.sh          # run the container
```

### Stopping

```
./stop.sh   # stops the running containers and removes them
```

## Installation

`cd webservice-online-notifier && npm install`

## .env configuration

See the [example .env](example.env)

```
URLS=https://some.site https://another.site https://yet.another.site
EMAILS=some@email.net other@email.tor yetanother@email.party
POST_CHECK_HOOK=https://some.webhook.com/callback
KEYWORD=some keyword to look for!
MAX_STRIKES=5
```

## config.json configuration

See the [example config.json](example.config.json)

```JSON
{
  "urls": [
    "https://some.url.com",
    "https://another.url.com"
  ],
  "emails": [
    "some@email.net",
    "other@email.tor",
    "yetanother@email.party"
  ],
  "keyword": "A phrase to find.",
  "postCheckHook": "A URL to post to.",
  "maxStrikes": 5
}
```
