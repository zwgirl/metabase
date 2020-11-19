# -*- mode: dockerfile; coding: utf-8; -*-

FROM adoptopenjdk/openjdk8:alpine

LABEL maintainer="Cam Saul <cam@metabase.com>"

WORKDIR /metabase

ENV FC_LANG en-US
ENV LC_CTYPE en_US.UTF-8

RUN apk update && \
        apk upgrade && \
        apk add aws-cli \
        bash \
        coreutils \
        curl \
        docker \
        gettext \
        git \
        java-cacerts \
        nodejs \
        openssh-client \
        wget \
        yarn \
        zip

# Install Leiningen
ADD https://raw.github.com/technomancy/leiningen/stable/bin/lein /usr/local/bin/lein
RUN chmod 744 /usr/local/bin/lein
RUN lein upgrade

# Install Clojure CLI
ADD https://download.clojure.org/install/linux-install-1.10.1.727.sh /tmp/linux-install-1.10.1.727.sh
RUN chmod +x /tmp/linux-install-1.10.1.727.sh
RUN /tmp/linux-install-1.10.1.727.sh

# # create a unpriviledged user
# RUN addgroup -S metabase-release
# RUN adduser -S metabase-release -G metabase-release

# # Add user to the Docker group
# RUN addgroup metabase-release docker

# # Give user perms to access Docker socket
# RUN touch /var/run/docker.sock
# RUN chown metabase-release /var/run/docker.sock

# # Change owner of /metabase and other mounted directories to unprivileged user
# RUN chown -R metabase-release /metabase

# # Switch to metabase-release user
# USER metabase-release

# ENTRYPOINT ["bash"]

# Run the release script
ENTRYPOINT ["/metabase/bin/release.sh"]
