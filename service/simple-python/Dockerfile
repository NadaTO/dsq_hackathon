FROM python:3.7-buster

# workaround for a bug in pip and/or autobahn
# see https://github.com/crossbario/autobahn-python/issues/1230
RUN pip install web3

WORKDIR /app
ADD requirements.txt .
RUN pip install -r requirements.txt
ADD . .

ENTRYPOINT /bin/bash
