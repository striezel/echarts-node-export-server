FROM debian:12-slim
MAINTAINER Dirk Stolle <striezel-dev@web.de>

LABEL org.opencontainers.image.authors="Dirk Stolle <striezel-dev@web.de>"
LABEL org.opencontainers.image.source=https://github.com/striezel/echarts-node-export-server
LABEL org.opencontainers.image.licenses=GPL-3.0-or-later

# Always update package lists and install updates first.
# HTTPS transport for APT is required to get the Node.js packages.
# wget, GnuPG and CA certificates are needed to get the key for the Nodesource
# APT repository.
# Finally, libfontconfig is required during execution to get font rendering.
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get upgrade -y && \
    apt-get install --no-install-recommends -y \
        apt-transport-https \
        wget \
        gnupg2 \
        dirmngr \
        ca-certificates \
        libfontconfig1
# Node.js is required to run this application.
RUN wget https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key && \
    cat nodesource-repo.gpg.key | gpg --dearmor -o /usr/share/keyrings/nodesource.gpg && \
    chmod 644 /usr/share/keyrings/nodesource.gpg && \
    unlink nodesource-repo.gpg.key && \
    echo "# Node.js 20.x for Debian 12" > /etc/apt/sources.list.d/nodejs.list \
    && echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" >> /etc/apt/sources.list.d/nodejs.list && \
    apt-get update && apt-get install --no-install-recommends -y nodejs
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
