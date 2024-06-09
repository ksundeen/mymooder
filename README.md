# Goal of My Mooder Application
My Mooder aims to help transform an individual’s personal view of mental illness from an issue of “mental health” to “mood awareness.” Individuals will grow in their awareness of how mood is influenced not simply by work stress, family stress, or any number of stresses of humanity, but empower them to visually see overtime and space and across activities, people, and weather how their mood fluctuates from negative to positive. With this data in hand, individuals can choose to share such information with medical providers, therapists, or find new jobs as a result that will support more positive mood qualities.

# Tech Stack
* Python Django GeoNode for the WebMap Portal (in a docker container)
* Python FastAPI for python algorithms to run regression of data points (in a docker container)
* React Native front end with Leaflet (maps) and D3 (graphs) in docker container with SQLite database that will support exporting to geopackage or using the GeoNode’s API to submit data to the PostgreSQL/PostGIS endpoints to view on the portal.

Data can then be viewed in QGIS or other GIS applications.

## Complete Development Environment for React Native Application.
In this section, we'll review the steps for setting up technologies required to run a React Native Environment with a GeoNode WebMap and a Fast API python backend that uses:

- <b>Docker</b>: `docker-cli`, `docker engine`, `docker-compose` to handle running, building, and deploying the final apps.
- <b>Node.js</b>: `nvm`, `npm`, and `npx` for managing JavaScript dependencies for the React Native app.
- <b>React Native with a SQLite</b>: to create the front end mobile device app and mobile device database to store all user data.
- <b>Python Fast API</b>: to handle creating machine learning algorithms (`geopandas`, `scipy`, `matplotlib`...etc) from the server to the react native app.
- <b>GeoNode</b>: A free and opensource geospatial webmapping application used to host geospatial data in `GeoServer`, stored through `PostgreSQL` with the `PostGIS` spatial extension, and accessed through a `Python Django` JavaScript frontend API and web app. 

# Getting Started for React Native Setup

1. Pull the repository in WSL or IOS os Linux using the SSH connection. If you need to add an SSH key, follow GIthub instructions: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

          git clone git@github.com:ksundeen/mymooder.git
   
3. Install Just as a command runner for your OS from: https://github.com/casey/just. For Ubuntu 24.04 install using:

       sudo apt install just

6. Run commands from the justfile to install api, frontend, and GeoNode dependencies

    ## React Native
       cd mymooder
       just install-ubuntu-packages
       just install-dockertools
       just install-frontend

    ## Fast API

       ...coming

    ## GeoNode

       ...coming

## IOS
- Install XCode on Any Ipad or Mac Device
 - If developing on an Ipad, use https://coder.com/blog/a-guide-to-writing-code-on-an-ipad

## Install & Configure A Development Environment Using Windows Subsystem for Linux (WSL) in Windows:
1. Open the Windows terminal (`cmd.exe`) and install Windows Subsystem Linux (WSL) 2:

        wsl --install 

2. View the list of WSL distributions available with:

        wsl --list --online

3. Install your preferred Ubuntu distribution with

        wsl --install -d Ubuntu-24.04

4. Once installed, another terminal will open where you should set your password. This will set the username to be in the sudoers file and be assigned sudo privelages. Close the Ubuntu terminal. I used the username as `ksundeen`.

5. Open the Windows terminal to set the default distribution as Ubuntu-24.04. Set the default Ubuntu distribution with:

        wsl --setdefault Ubuntu-24.04

6. From the same Windows terminal, login to the new Ubuntu-24.04 distribution using:

        wsl -u ksundeen -d Ubuntu-24.04

7. Create root user password to keep things safe:
        
        # Login to WSL as the root user:
        wsl -u root -d Ubuntu-24.04

        # Enter commands to change the password:
        passwd root

        # The change the password for the root user:
        ...

        # Exit WSL:
        exit

        # Login to WSL Ubuntu 24.04 machine:
        wsl -u ksundeen -Ubuntu-24.04
        
        # Type echo hi to confirm the password was accepted:
        sudo echo hi


8. Close the Ubuntu-24.04 terminal by typing `exit` and then login using the root user. You will be confirming that you can login as the `ksundeen` user here.

        wsl -u root

![wsl-root-img](./instruction-img/confirm-wsl-root.png?raw=true)

9. Now in Ubuntu-24.04 default terminal, confirm your `ksundeen` user exists using the `su` for sudouser command:
  
        su ksundeen

10. Finally, to get back to the root user from your profile user, simply type exit bring you back to the root user login screen:

        exit
