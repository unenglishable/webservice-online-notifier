FROM node:onbuild
MAINTAINER unenglishable <unenglishable@gmail.com>
npm update webservice-online-check
CMD ./cron.sh
