FROM debian:11-slim
MAINTAINER Dirk Stolle <striezel-dev@web.de>

LABEL org.opencontainers.image.authors="Dirk Stolle <striezel-dev@web.de>"
LABEL org.opencontainers.image.source=https://github.com/striezel/echarts-node-export-server
LABEL org.opencontainers.image.licenses=GPL-3.0-or-later

# Always update package lists and install updates first.
# HTTPS transport for APT is required to get the Node.js packages.
# wget, GnuPG and CA certificates are needed to get the key for the Nodesource
# APT repository.
# Finally, libfontconfig is required during execution to get font rendering.
RUN apt-get update && apt-get upgrade -y && \
    apt-get install --no-install-recommends -y \
        apt-transport-https \
        wget \
        gnupg2 \
        dirmngr \
        ca-certificates \
        libfontconfig1
# Node.js is required to run this application.
RUN echo "# Node.js 16.x for Debian 11 (codename bullseye)" > /etc/apt/sources.list.d/nodejs.list \
  && echo "deb https://deb.nodesource.com/node_16.x bullseye main" >> /etc/apt/sources.list.d/nodejs.list \
  && echo "deb-src https://deb.nodesource.com/node_16.x bullseye main" >> /etc/apt/sources.list.d/nodejs.list
RUN apt-key adv --fetch-keys https://deb.nodesource.com/gpgkey/nodesource.gpg.key
RUN apt-get update && apt-get install --no-install-recommends -y nodejs
# Create directory for application.
RUN mkdir -p /opt/export-server
# Copy all files to that directory.
COPY export-server /opt/export-server
WORKDIR /opt/export-server
# Install required Node.js packages.
RUN npm install
# Node.js server runs on port 3000.
EXPOSE 3000
# Start server via NPM.
CMD npm start
