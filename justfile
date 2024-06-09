set shell := ["bash", "-uc"]
set dotenv-load

project_frontend := "mymooder-frontend"
project_api := "mymooder-api"
project_geonode := "mymooder-geonode"
flags := env_var_or_default("JUST_FLAGS", "-eo pipefail")
thumbup := "\\U1F44D"
check := "\\U2705"
warn := "\\U26A0"

# Containers
docker_root := "docker"

# List recipes
# $ just --list
# $ just --summary

# Install Dependencies for Ubuntu 24.04
install-ubuntu-packages:
    #!/usr/bin/env bash
    set {{flags}}
    sudo apt-get update
    sudo apt-get install -y apt-utils

    # Install general utilities.
    sudo apt-get install -y \
        iputils-ping \
        sudo \
        build-essential \
        checkinstall \
        curl \
        jq \
        nano

# Install Depdendencies for the API

# Start the API

# Install Dependencies for the React Native Front End

# Start the React Native Front End
install-frontend:
    #!/usr/bin/env bash
    set {{flags}}
    pushd {{project_frontend}}
    install-nvm

# Install Depedencies for GeoNode

# Start GeoNode

# Install Dependencies for Docker

# Start a docker-compose definition.
up target:
    #!/usr/bin/env bash
    set {{flags}}
    docker compose up


# Install all the docker tools.
install-dockertools: install-docker install-compose

install-docker:
    #!/usr/bin/env bash
    if [ -x "$(command -v docker)" ]; then
        echo "docker is already installed."
        exit 0
    fi
    sudo apt update

    # Install basic apt package utilities
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        nano \
        software-properties-common

    # Followed from https://docs.docker.com/engine/install/ubuntu/
    # Add Docker official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    sudo apt-get update

    # Install Docker packages
    VERSION_STRING=5:26.1.0-1~ubuntu.24.04~noble
    sudo apt-get install docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io docker-buildx-plugin docker-compose-plugin

    sudo usermod -aG docker ${USER}

# Install previous docker
docker-focal-2004:
    #!/usr/bin/env bash
    if [ -x "$(command -v docker)" ]; then
        echo "docker is already installed."
        exit 0
    fi
    sudo apt update
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
    apt-cache policy docker-ce
    sudo apt-get install -y docker-ce
    sudo usermod -aG docker ${USER}

# Install docker-compose.
install-compose:
    #!/usr/bin/env bash
    if [ -x "$(command -v docker-compose)" ]; then
        echo "docker-compose is already installed."
        exit 0
    fi
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    docker-compose --version