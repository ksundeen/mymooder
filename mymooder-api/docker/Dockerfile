FROM ubuntu:24.04 as build
SHELL ["/bin/bash", "-c"]

ARG DEBIAN_FRONTEND=noninteractive
ARG NONROOT_USER
ENV NONROOT_HOME=/home/${NONROOT_USER}
ARG PY_VERSION=3.10.5
ARG PIP_VERSION=22.2.2
ARG POETRY_VERSION=1.2.2
ENV PROJECT=mymooder-api

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

# Install python build dependencies.
USER root
RUN apt-get update && \
    apt-get install -y \
    libbz2-dev \
    libffi-dev \
    liblzma-dev \
    libncursesw5-dev \
    libreadline-dev \
    libsqlite3-dev \
    libssl-dev \
    libxml2-dev \
    libxmlsec1-dev \
    llvm \
    make \
    tk-dev \
    wget \
    xz-utils \
    zlib1g-dev

# Build and install python.
USER root
RUN mkdir -p /usr/src
WORKDIR /usr/src
RUN wget https://www.python.org/ftp/python/${PY_VERSION}/Python-${PY_VERSION}.tgz && \
    tar xzf Python-${PY_VERSION}.tgz
WORKDIR /usr/src/Python-${PY_VERSION}
RUN ./configure --enable-optimizations && \
    make -s &&  \
    make install

# Install Vim (for field troubleshooting).
USER root
RUN apt-get install -y vim
USER ${NONROOT_USER}
RUN mkdir -p "${NONROOT_HOME}/.vim/pack/vendor/start"
RUN echo set number >> "${NONROOT_HOME}/.vimrc"
RUN echo set relativenumber >> "${NONROOT_HOME}/.vimrc"

# Install application files.
USER ${NONROOT_USER}
WORKDIR ${NONROOT_HOME}
RUN mkdir -p opt/${PROJECT}
WORKDIR ${NONROOT_HOME}/opt/${PROJECT}
COPY src/opt .
USER root
RUN chown -R ${NONROOT_USER}:${NONROOT_USER} ${NONROOT_HOME}/opt/${PROJECT}
USER ${NONROOT_USER}
RUN python3 -m venv venv && \
    source venv/bin/activate && \
    pip install pip==${PIP_VERSION} && \
    pip install poetry==${POETRY_VERSION} && \
    poetry install

# Prepare the default entry point.
USER root
COPY entrypoint.sh /
# Put the project script into the path.
COPY usr/sbin/* /usr/sbin/${PROJECT}
RUN chmod +x /usr/sbin/${PROJECT}

# Let's go.
USER ${NONROOT_USER}
WORKDIR ${NONROOT_HOME}/opt/${PROJECT}
ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
