FROM    alpine:3.2

ADD			https://releases.hashicorp.com/consul-template/0.12.2/consul-template_0.12.2_linux_amd64.zip /tmp/consul-template.zip

RUN     apk add --update supervisor nginx unzip && \
	      rm -rf /var/cache/apk/* && \
        mkdir -p /tmp/nginx/client-body && \
        mkdir -p /var/lib/nginx/tmp/proxy/ && \
        ln -sf /dev/stdout /var/log/nginx/access.log && \
        ln -sf /dev/stderr /var/log/nginx/error.log && \
        chown -R nginx:nginx /tmp/nginx /var/lib/nginx /var/log/nginx && \
				unzip /tmp/consul-template.zip -d /tmp/ && \
				mv /tmp/consul-template /usr/bin/consul-template && \
				chmod +x /usr/bin/consul-template && \
				rm -rf /tmp/consul-template.zip

VOLUME  ["/var/log/nginx"]

COPY    ./app/ /app
COPY    ./nginx/ /etc/nginx/
COPY		./supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN			chown -R nginx:nginx /app /etc/nginx

EXPOSE  80 443
CMD     ["/usr/bin/supervisord"]
