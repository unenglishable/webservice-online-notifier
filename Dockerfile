FROM node:onbuild
MAINTAINER unenglishable <unenglishable@gmail.com>
RUN npm update webservice-online-check
CMD node cron.js
