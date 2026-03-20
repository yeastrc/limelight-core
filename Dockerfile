FROM ruby:3.3-slim

ENV PATH="/usr/local/bundle/bin:${PATH}"

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential git \
    && rm -rf /var/lib/apt/lists/* \
    && gem install --no-document jekyll:4.4.1 kramdown webrick

WORKDIR /site

EXPOSE 4000

CMD ["sh", "-lc", "mkdir -p docs && /usr/local/bundle/bin/jekyll clean --destination docs && /usr/local/bundle/bin/jekyll build --destination docs && exec /usr/local/bundle/bin/jekyll serve --host 0.0.0.0 --port 4000 --destination docs --skip-initial-build"]