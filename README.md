![wsl-root-img](LogoWithLargerBackgroundLighter_WorldInfo.png?raw=true)
# Goal of My Mooder Application
My Mooder aims to help transform an individual’s personal view of mental illness from an issue of “mental health” to “mood awareness.” Individuals will grow in their awareness of how mood is influenced not simply by work stress, family stress, or any number of stresses of humanity, but empower them to visually see overtime and space and across activities, people, and weather how their mood fluctuates from negative to positive. With this data in hand, individuals can choose to share such information with medical providers, therapists, or find new jobs as a result that will support more positive mood qualities.
#
# Tech Stack
* Python Django GeoNode for the WebMap Portal (in a docker container)
* Python FastAPI for python algorithms to run regression of data points (in a docker container)
* React Native front end with Leaflet (maps) and D3 (graphs) in docker container with SQLite database that will support exporting to geopackage or using the GeoNode’s API to submit data to the PostgreSQL/PostGIS endpoints to view on the portal.

Data can then be viewed in QGIS or other GIS applications.

## Complete Development Environment for React Native Application.
In this section, we'll review the steps for setting up technologies required to run a React Native Environment with a GeoNode WebMap and a Fast API python backend that uses:

- <b>Docker</b>: `docker-cli`, `docker engine`, `docker-compose` to handle running, building, and deploying the final apps.
- <b>Node.js</b>: `nvm`, `npm`, and `npx` for managing JavaScript dependencies for the React Native app. Version `20.10.0` 
  * <i>Experimenting with using a the newer npm and yarn successor, pnpm, which combines the efficiency of npm and security features of yarn: https://pnpm.io/, https://www.syncfusion.com/blogs/post/pnpm-vs-npm-vs-yarn
  * Install with `brew install pnpm`</i>
- <b>React Native with a SQLite</b>: to create the front end mobile device app and mobile device database to store all user data.
- <b>Python Fast API</b>: to handle creating machine learning algorithms (`geopandas`, `scipy`, `matplotlib`...etc) from the server to the react native app.
- <b>GeoNode</b>: A free and opensource geospatial webmapping application used to host geospatial data in `GeoServer`, stored through `PostgreSQL` with the `PostGIS` spatial extension, and accessed through a `Python Django` JavaScript frontend API and web app. 
#
# Getting Started for React Native Setup
1. Install git for Linux or iOS:

2. Configure your credentials for Git to show in your repositories:

           git config --global user.email "<your.name@some-domain.com>"
           git config --global user.name "<Your Name>"

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
#
>### <i>To Get Mutliple Git Credentials into your Machine follow these additional instructions:</i> <small>from https://www.linkedin.com/pulse/how-use-multiple-github-accounts-macos-atish-maske</small>
>>>A. Create each git credential that same as above exept after creating each one, rename the file immedietely before making the next git credential:
>>>     sudo mv id_ed25519 id_ed25519<github-username>
>>>     sudo mv id_ed25519 id_ed25519<github-username>.pub
>>
>>> B. Create the 2nd git credential and use the default locations and rename them the same as above with the new github user name. Also create a separate folder within the 
>>
>>> C. Create a new git config file in ~/.ssh/config with `touch ~/.ssh/config` and then `nano ~/.ssh/config` (This file has not extention and is not a directory)
>>
>>>D. Add into this new `~/.ssh/config` folder the details for all your separate git credentials. Make sure each the `IdentityFile` points to only the private key not the `.pub` key which should still be in the ~/.ssh/ direcotry
>>>
>>>     # Account 1
>>>     Host github.com-account
>>>     HostName github.com
>>>     User git
>>>     IdentityFile ~/.ssh/<github-username>id_ed25519_<github-username1>
>>>
>>>     # Account 2
>>>     Host github.com-account2
>>>     HostName github.com
>>>     User git
>>>     IdentityFile ~/.ssh/<github-username>id_ed25519_<github-username2>
>
>>>E. Make sure that you copied the `~/.ssh/id_ed25519_<username>.pub` to each of your separate Github accouts in the new SSH Key section. While in the `~/.ssh/` directory check the contents with `ls -la` and use `cat <key pub key name>` to get the copy of the public key to link with your Github account. Or read through https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent again to connect the public key again.
>>>F. In the end, you should have in the ~/.ssh folder the following structure:
>>>
>>>     config
>>>     <username-1>
>>>     <username-2>
>>>     known_hosts # <- this is only created after you confirm the git pul request works

4. Install Brew for Mac as the package managaer. Read more about Brew https://brew.sh

        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

5. Install Just as a command runner for your OS from: https://github.com/casey/just. Or from source 


        # For Ubuntu 24.04 install Just using:
        sudo apt install just 

        # For macOS 
        brew install just

        # See a list of just commands by typing:
        just --list

6. Use your preferred IDE for code editing and make a fork or branch off the `main` branch. Alternatively, use VS code installed using the Ubuntu image. Change directories into the mymooder directory and install VS Code using the command:
           
          cd mymooder
          code .
          git checkout -b feature/startup
      
7. Run commands from the justfile to install api, frontend, and GeoNode dependencies
To see a list of just 

    ## Install Basic Mac/Ubuntu Packages
        cd mymooder
        
        # View the list of available commands to run
        just --list

8. Set the pnpm global directory with 
`$XDG_DATA_HOME` env variable is set, then `$XDG_DATA_HOME/pnpm`

        # Run this in mac to set add the env to ~/.zshrc or add directly.
        export XDG_DATA_HOME="~/Library/pnpm" >> ~/.zshrc

* On Windows: `~/AppData/Local/pnpm`
* On macOS: `~/Library/pnpm`
* On Linux: `~/.local/share/pnpm`

#
#### I decided to use Docker for Desktop to Handle running anything with Docker, but unfortunately, building docker images failed with npmx and using expo tools, so I've moved away from docker and instead using expo for CI/CD builds.

        # The repo still references helpful infor to install and configur doker, but I gave up on in after a while. 
        # just install-dockertools # (installs both docker engine an docker-compose)

        ## React Native
        cd mymooder/mymooder-frontend
        
        # List just commands
        just --list

7. Install the Android SDK

        # Install the Android SDK on a Mac with Homebrew
        brew install android-sdk

        # This may prompt that you need the Java SDK version 8, in which case, install it with:
        brew install --cask temurin@8

 8. Navigate to the mymooder-frontend directory and use justfile commands to run various commands in this order:
* Configure the apps

        1. Configure the app with the just command 
        2. Build the expo profile with a pre-build command
        3. Run the apps locally to confirm they work
        4. Use expo to build the apps and distribute them for testing
        
        NODE_ENV=development npx expo start
        
9. To create credentials for iOS, use `eas credentials` from https://docs.expo.dev/app-signing/app-credentials/ to register the provisioning file to authortize the app.
        
![wsl-root-img](run-apps.png?raw=true)

* Install additional react packages and follow instruction in the `~/mymooder/mymooder-frontend/justfile` with:

        just --list
#
# This process was replaced with forking the react-native-leaflet-view    

> * Install the forked repo with: `npm install git+https://git@github.com:ksundeen/react-native-leaflet-view-links.git --save`
> * More changes can be submitted to this forked package of `https://github.com/ksundeen/react-native-leaflet-view-links` 
> * Clone the forked package with `git@github.com:ksundeen/react-native-leaflet-view-links.git`
#
### Monkey Patching the Android Leaflet.html file location (or other node_module packages) - This only works locally, but not through building in Expo.
#
I noticed when building the Android app that the location of the Leakflet.html was incorrect. Finding the right location took some detective working, but the solution is applying this fix to two files:
1. Install `patch-package` in the `~/mymooder/mymooder-frontend/src` directory with 

        npm install --save patch-package

2. Apply any existing monkey patches to the `~/mymooder/mymooder-frontend/src/patches` directory code with:

        npm run postinstall

3. If you have made any new changes to other node_modules packages and want to save them to the `~/mymooder/mymood-frontend/src/patches` directory, the 
        
        npx patch-package react-native-leaflet-view

        # Or of there are other packages that need to have their individual packages saved, then change the package name to 
        npx patch-package <package name>
#
# Install and Configure the MyMooder Frontend
1. Set up all necessary packages, and start building these just file commands. This gets the apps running locally. The just commands run regular package.json commands, but just keep them in order for simplicity's sake:

        # cd to the mymooder-frontend directory
        cd ~/mymooder/mymooder-frontend
        just START_WITH_CLEAN_NODE_MODULES_react-install-clean-cache:

        # Install expo and login
        just A1_expo-setup-install

        # Remove any previous ios and android builds, configure the app builds, and pre-build ios and android platforms to run locally.
        just A2_clean_configure_and_build_both_platforms

        # Chose which specific platform to run locally. This command runs all web, android, and ios platforms
        just B4_expo-start

        # Follow any promots to open i for ios, a for android and w for the web

2. Make test builds to prepare for distributing to testers as an 'adhoc' ios 'enterpriseProvisioning'. This command prompts to log into Expo. You should have your email and password available. The default configuration builds both iOS and Android platforms and makes credentials for them.
* Make changes to this command to stop logging into Expo, or build different platforms separately. 
* Change the variable `eas_build_profile` to be `development` or `test` - Check the individual eas profile configurations in file `~/mymooder/mymooder-frontend/eas.json`

        # The expo build command builds the platforms 
        just E_expo-build

# Install and Configure the MyMooder FastAPI Backend

       ...coming

# Install and Configure the GeoNode Web Map FrontEnd

       ...coming
#
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
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
        export XDG_DATA_HOME="~/Library/pnpm"
        export PNPM_HOME=$XDG_DATA_HOME
        export PATH="${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$JAVA_HOME:$PNPM_HOME"

### iOS Several Options Exist:
       
> 1. Use UTM using Chemu to run emulators and vm for machines (about $10 for a license). 
> 2. Use the Darling package to buils os apps with xcode: https://www.baeldung.com/linux/xcode
> 3. You need to download the specific iso image for non-macOs machines. See https://ubuntu.com/download/desktop/thank-you?version=24.04&architecture=amd64&lts=true
> 4. Download the specific ISO image to use ubuntu-24.04-desktop-amd64.iso
> 5. Install XCode on Any Ipad or Mac Device
> 6. If developing on an Ipad, use https://coder.com/blog/a-guide-to-writing-code-on-an-ipad
        
#
## An Alternative to MacOS and Windows WSL - Use Ubuntu Linux
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

# Posts and Resources that Inspired this Application
* https://medium.com/nightingale/creating-a-d3-map-in-a-mobile-app-using-react-native-46da1e6b3be6