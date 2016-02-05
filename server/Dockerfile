FROM    mhart/alpine-node:5.4.1

# cd to /app
WORKDIR /app

# Install app dependencies
COPY    ./app/package.json package.json
RUN     npm install

# Bundle app source
COPY    ./app/ .

EXPOSE  8000

CMD     ["npm", "run", "start:prod"]
