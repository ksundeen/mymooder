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
1. Install git for Linux or iOS:

2. Configure your credentials for Git to show in your repositories:
        git config --global user.email "kim.h.sundeen@gmail.com"
        git config --global user.name "Kim Sundeen"

3. Pull the repository in WSL or IOS os Linux using the SSH connection. If you need to add an SSH key, follow GIthub instructions: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

        # For example, if you haven't created an SSH key before, then generate one using 
        ssh-keygen -t ed25519 -C "your_email@example.com"

        # Start in admin level powershell and run
        eval "$(ssh-agent -s)"

        # Add a new ssh key
        ssh-add ~/.ssh/id_ed25519

        # Then copy the public key valuy and enter it into the Github Setting under SSH Keys
        cat ~/.ssh/id_ed25519.pub

        # Copy this value and add in into Github directly into the setting 

        # Then clone the ssh version of the repository
        git clone git@github.com:ksundeen/mymooder.git
   
3. Install Just as a command runner for your OS from: https://github.com/casey/just. For Ubuntu 24.04 install Just using:

          sudo apt install just

          # See a list of just commands by typing:
          just --list

5. Use your preferred IDE for code editing and make a fork or branch off the `main` branch. Alternatively, use VS code installed using the Ubuntu image. Change directories into the mymooder directory and install VS Code using the command:
           
          cd mymooder
          code .
          git checkout -b feature/startup
      
6. Run commands from the justfile to install api, frontend, and GeoNode dependencies
To see a list of just 

    ## Install Basic Ubuntu Packages
        cd mymooder
        
        # View the list of available commans to run
        just --list

        # Install Ubuntu tools with
        just install-ubutnu-pacakges
        
        # Install just the ubuntu tools with
        just install-dockertools # (installs both docker engine an docker-compose)

    ## React Native
        cd mymooder/mymooder-frontend
        
        # List just commands
        just --list

7. Run the react native application locally with

        # Install the Android SDK on a Mac with Homebrew
        brew install android-sdk

        # This may prompt that you need the Java SDK version 8, in which case, install it with:
        brew install --cask temurin@8

        # Navigate to the directory

        npm run android
        npm run ios # You need to use macOS to build the ios project - use the Expo app if you need to iOS development without a mac.
        
![wsl-root-img](run-apps.png?raw=true)

        # Install additional react pacakges


    ## Fast API

       ...coming

    ## GeoNode

       ...coming

## iOS (Tested for M2 Chip MacOS)

1. Get Java Runtime to Open Project for XCode tools to get the brew package manager
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
2. Run commands to add brew to your path

        (echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/Kim/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
        
3. Install Java tools with brew. If you want a specific version tack on version like openjdk@11
    
        brew install openjdk
    
4. Add the openjdk path to your PATH variable by running this in the terminal:

        echo 'export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"' >> ~/.zshrc

5. Ensure compilers can also find the openjdk by running this in the teriminal:

        export CPPFLAGS="-I/opt/homebrew/opt/openjdk/include"
        
6. Install the just command runner with

        brew install just
        
7. Check you ~/.zshrc file that it includes these exports:

        export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"
        export JAVA_HOME="/opt/homebrew/opt/openjdk/bin/java" 

        # Or type this in the terminal
        echo 'export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"' >> ~/.zshrc
        
8. Also add a symlink for the system Java wrappers to find this JDK:

        sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk \
        /Library/Java/JavaVirtualMachines/openjdk.jdk
        
8. There appears to be a bug with how XCode is installed that causes an error. You need to run this command to resolve the message

        sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

9. Make sure to also install any additional iOS simulators for the versions you want to test. 

10. Add docker engine and docker compose using brew instear of Docker for Desktop. Docker for Desktop uses too much space, CPU, and memory and adds more compleixities when you want to later build any ubuntu images with the docker cli tools.

<i>Follow this slackoverflow post to remove any additional Docker for Desktop tools:
        https://stackoverflow.com/questions/37465526/how-to-uninstall-docker-completely-from-a-mac</i>

11. Start over and install docker-machine with installing the Docker for Desktop app again. 

        brew install docker-machine docker

12. Open the whale icon app, Docker for Desktop, and then confirm it's working with typing in the terminal:

        docker ps

        # You should see something like this if you have not running containers:
        CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

13. In total to get both Android and iOS apps to work, this is the ~/.zshrc file I use:

        export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
        export ANDROID_HOME="/Users/$USER/Library/Android/sdk"
        export PATH="${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$JAVA_HOME"
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

### iOS Several Options Exist:
       
#### 1. Use UTM using Chemu to run emulators and vm for machines (about $10 for a license). 
#### 2. Use the Darling package to buils os apps with xcode: https://www.baeldung.com/linux/xcode
#### 3. You need to download the specific iso image for non-macOs machines. See https://ubuntu.com/download/desktop/thank-you?version=24.04&architecture=amd64&lts=true
#### 4. Download the specific ISO image to use ubuntu-24.04-desktop-amd64.iso
#### 5. Install XCode on Any Ipad or Mac Device
#### 6. If developing on an Ipad, use https://coder.com/blog/a-guide-to-writing-code-on-an-ipad
        

## {PREFERRED DEVELOPMENT ENVIRONMENT for both Windows & IOS}
Instead of trying to support both IOS and Windows WSL, just use Ubuntu, the linux distributions that will natively support docker, node, and react development. It's unclear if XCode could be installed for Ubuntu though. 

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

![wsl-root-img](./confirm-wsl-root.png?raw=true)

9. Now in Ubuntu-24.04 default terminal, confirm your `ksundeen` user exists using the `su` for sudouser command:
  
        su ksundeen

10. Finally, to get back to the root user from your profile user, simply type exit bring you back to the root user login screen:

        exit

# Monkey Pacthing the Android Leaflet.html file location
I noticed when building the Android app that the location of the Leakflet.html was incorrect. Finding the right location took some detective working, but the solution is applying this fix to two files: 