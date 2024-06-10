# Dockerfile
FROM ubuntu:24.04
SHELL ["/bin/bash", "-c"]

ARG DEBIAN_FRONTEND=noninteractive
ARG NONROOT_USER=nonroot
ENV NONROOT_HOME=/home/${NONROOT_USER}
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=20.10.0


# Prepare apt.
RUN apt-get update
RUN apt-get install -y apt-utils

# Install general utilities.
RUN apt-get install -y \
    iputils-ping \
    sudo \
    build-essential \
    checkinstall \
    curl \
    jq

# Create the non-root user.
RUN useradd -m -s /usr/bin/bash -d "/home/${NONROOT_USER}" "${NONROOT_USER}"
# Add the user to the sudoers group.
RUN usermod -aG sudo "${NONROOT_USER}"
# Set a password for running sudo. (It's the same as the user name.)
RUN echo "${NONROOT_USER}:${NONROOT_USER}" | chpasswd
# Copy home directory files into place.
COPY home/* ${NONROOT_HOME}/

# Install ubuntu & react build dependencies.
USER root
RUN apt-get update && \
    apt-get install -y \
    apt-transport-https curl

# Install LTS node version
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version


# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Copy the entire app directory to the working directory
COPY . .

# Build the app for production
RUN npx react-native bundle --platform ios --dev false --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ios/assets
RUN npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Expose port 8080 for the React Native packager
EXPOSE 8080

# Start the app
CMD ["npx", "react-native", "start"]