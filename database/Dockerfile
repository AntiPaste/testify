FROM kiasaki/alpine-postgres:latest

ENV POSTGRES_USER=testify POSTGRES_PASSWORD=testify POSTGRES_DB=testify

COPY ./data/ /docker-entrypoint-initdb.d/

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["postgres", "-c", "log_destination=stderr"]
