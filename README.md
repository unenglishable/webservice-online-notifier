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
POST_CHECK_HOOK=https://some.webhook.com/callback
KEYWORD=some keyword to look for!
MAX_STRIKES=5
EMAILER_LIST=some@email.net other@email.tor yetanother@email.party
EMAILER_SENDER=your@email.lol
EMAILER_AWS_ACCESS_KEY=AWSweioiACCESSjoiewjKEY
EMAILER_AWS_SECRET_KEY=AsodijW2308fjS209jcjSECRET389jiKEY
EMAILER_AWS_HOST=email-smtp.loction.amazonaws.com
```

## config.json configuration

See the [example config.json](example.config.json)

```JSON
{
  "urls": [
    "https://some.url.com",
    "https://another.url.com"
  ],
  "emailer": {
    "list": [
      "some@email.net",
      "other@email.tor",
      "yetanother@email.party"
    ],
    "sender": "your@email.lol",
    "awsAccessKey": "AWSweioiACCESSjoiewjKEY",
    "awsSecretKey": "AsodijW2308fjS209jcjSECRET389jiKEY",
    "awsHost": "email-smtp.loction.amazonaws.com"
  },
  "keyword": "A phrase to find.",
  "postCheckHook": "A URL to post to.",
  "maxStrikes": 5
}
```
