# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.137.0/containers/java/.devcontainer/base.Dockerfile
ARG VARIANT="11"
FROM mcr.microsoft.com/vscode/devcontainers/java:0-${VARIANT}

ARG INSTALL_NODE="true"
ARG NODE_VERSION="14"
RUN if [ "${INSTALL_NODE}" = "true" ]; then su vscode -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

# Install build tools
# bash:         various shell scripts
# wget:         installing lein (TODO -- is this actually needed? We don't use wget directly)
# curl:         needed by script that installs Clojure CLI
# git:          ./bin/version
# yarn:         frontend building
# make:         backend building (TODO -- huh? We don't use Make to build the backend)
# gettext:      translations
# leiningen:    backend dependencies and building
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends coreutils bash yarn git wget curl make gettext leiningen \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Clojure CLI (needed for some build scripts)
ADD https://download.clojure.org/install/linux-install-1.10.1.708.sh /tmp/linux-install-1.10.1.708.sh
RUN chmod +x /tmp/linux-install-1.10.1.708.sh
RUN /tmp/linux-install-1.10.1.708.sh
