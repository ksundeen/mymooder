# My Mooder App
<img src="/readme-assets/LogoWithLargerBackgroundLighter_WorldInfo.png" width=75% height=75% display=flex justify-content=center>

# Goal of My Mooder Application
My Mooder aims to help transform an individual’s personal view of mental illness from an issue of “mental health” to “mood awareness.” Individuals will grow in their awareness of how mood is influenced not simply by work stress, family stress, or any number of stresses of humanity, but empower them to visually see over time and space, across activities, people, and weather how their mood fluctuates from negative to positive. With data in hand, individuals can choose to share such information with medical providers, therapists, or find new jobs to better support how one's moods naturally fluctuate.

### The Mockup
<img src="/readme-assets/mymooder-mockup.png" width=50% height=50% display=flex justify-content=center>

### The App Currently
<div float=center height=25% width=25% padding=5px;>
        <img src="/readme-assets/app-home.png" width=20% height=20%>
        <img src="/readme-assets/app-mood-location.png" width=20% height=20%>
        <img src="/readme-assets/app-chart-world-d3.png" width=20% height=20%>
        <img src="/readme-assets/app-leaflet-map.png" width=20% height=20%>
</div>

## Market Pull
There are many notable mobile and web browser applications that support mental health by reporting notes to healthcare providers (TherapyNotes, Epic Software), Therapy-related apps to communicate with different therapists (Power Diary,  Simple Practice, Notable), Social-Anxiety apps to help with encouraging individuals to face their fears, improve mindfulness, and learn meditation (AcuPressure: Heal Yourself, Headspace, HelloMind, Mindshift, Pacifica, PTSD Coach, Relax and Rest Meditations, Self Help for Anxiety Management, What’s Up, Worry Watch). 

**The problem that isn’t solved by any of these apps** is to help the individual use the practice of data science, measurable values, and maps to illuminate unknown behaviors, practices, feelings, and troubling scenarios that the individual would otherwise not be aware of without significant writing and self-study. 

With the My Mooder application, the data is in the hands of the individual to learn about their travel plans, individuals that disrupt their mood, weather that affects their mood or mental health. The graphs, insights, and maps illustrate with a few buttons the individual patterns over time and space where an individual’s mood is affected. Knowledge of how mood fluctuates for the individual empowers them to take action into knowing:
* When an individual needs to ask for extra support from one's community, friends, social networks, or family.
* Locations that influence an individual’s mood in both positive and negative ways to help the individual learn to change his/her behavior either to avoid certain negative places or visit positives places that increase their moods. 
* Which people, weather, or activities that increase or decrease the individual’s mood. 

#
# Tech Stack
* Python Django GeoNode for the WebMap Portal (in a docker container)
* Python FastAPI for python algorithms to run regression of data points (in a docker container)
* React Native front end with Leaflet (maps) and D3 (graphs) built with Expo to support iOS, android, and the web with SQLite database that will support exporting to geopackage or using the GeoNode’s API to submit data to the PostgreSQL/PostGIS endpoints to view on the portal.

#
# TODOs
- [x] Configure ios, android, and web building with Expo on a mac m2. :+1:
- [x] Add basic d3 graphics. :+1:
- [x] Add a leaflet map to avoid incurring costs from other mapping API vendors (Bing, Azure, Google, Apple, Mapbox, Cartograph...etc.). :+1:
- [x] Add user request for location. :+1:
- [ ] Add menu options to accept mood values. 
- [ ] Update the Leaflet map that still uses the WebView react-native component to work for the web platform. It's not working using Expo.
- [ ] Add sqlite expo component to store data natively.
- [ ] Add sample d3 graphics on the Charts and Map from entered mood values.
- [ ] Convert existing d3 world graphic to a moving SVG.
- [ ] Add a linked xy plot to exiting d3 world graphic to show mood values.
- [ ] Test that GIS data can be viewed in QGIS or other GIS applications.


## Complete Development Environment for React Native Application.
This section review steps for setting up technologies required to run a React Native Environment with a GeoNode WebMap and a Fast API python backend that uses:

- <b>Docker</b>: `docker-cli`, `docker engine`, `docker-compose` to handle running, building, and deploying the final apps.
- <b>Node.js</b>: `nvm`, `pnpm`, and `npx` for managing JavaScript dependencies for the React Native app. Version `20.10.0` 
> **Note**  
>
>  <i>I started experimenting with the newer npm and yarn successor, pnpm, which combines the efficiency of npm and security features of yarn: https://pnpm.io/, https://www.syncfusion.com/blogs/post/pnpm-vs-npm-vs-yarn. Install with `brew install pnpm`</i>
- <b>React Native with a SQLite</b>: to create the front end mobile device app and mobile device database to store all user data.
- <b>Python Fast API</b>: to handle creating machine learning algorithms (`geopandas`, `scipy`, `matplotlib`...etc) from the server to the react native app.
- <b>GeoNode</b>: A free and opensource geospatial webmapping application used to host geospatial data in `GeoServer`, stored through `PostgreSQL` with the `PostGIS` spatial extension, and accessed through a `Python Django` JavaScript frontend API and web app. 
#
# React Native Setup on Mac for Android Emulator and iOS Simulator
1. Install Brew for Mac as the package managaer. Read more about Brew https://brew.sh

        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

2. Install git for Linux or iOS

        brew install git

3. Configure your credentials for Git to show in your repositories:

        git config --global user.email "<your.name@some-domain.com>"
        git config --global user.name "<Your Name>"

4. Pull the repository in WSL or IOS os Linux using the SSH connection. If you need to add an SSH key, follow GIthub instructions: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

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
          git checkout -b <your-branch-name>

          # Example
          git checkout -b feature/d3-graphics

7. Set the pnpm global directory with 
`$XDG_DATA_HOME` env variable is set, then `$XDG_DATA_HOME/pnpm`

        # Run this in mac to set add the env to ~/.zshrc or add directly.
        export XDG_DATA_HOME="~/Library/pnpm" >> ~/.zshrc

* On Windows: `~/AppData/Local/pnpm`
* On macOS: `~/Library/pnpm`
* On Linux: `~/.local/share/pnpm`


#
> **Note**  
>
> I decided to use Docker for Desktop to Handle running anything with Docker, but unfortunately, building docker images failed with npmx and using expo tools, so I've moved away from docker and instead using expo for CI/CD builds.
>
>       # The repo still references helpful info to install and configure docker, but I gave up on in after a while. 
>       # just install-dockertools # (installs both docker engine and docker-compose)
>
>       ## React Native
>       cd mymooder/mymooder-frontend
>       
>       # List just commands
>       just --list

8. Install the Android SDK

        # Install the Android SDK on a Mac with Homebrew
        brew install android-sdk

        # This may prompt that you need the Java SDK version 8, in which case, install it with:
        brew install --cask temurin@8

9. Navigate to the mymooder-frontend directory and use justfile commands to run various commands in this order:
* Configure the apps

        1. Configure the app with the just command 
        2. Build the expo profile with a pre-build command
        3. Run the apps locally to confirm they work
        4. Use expo to build the apps and distribute them for testing
        
        NODE_ENV=development npx expo start
        
10. To create credentials for iOS, use `eas credentials` from https://docs.expo.dev/app-signing/app-credentials/ to register the provisioning file to authortize the app.
        
* Install additional react packages and follow instruction in the `~/mymooder/mymooder-frontend/justfile` with:

        just --list
#
> **Note**  
>
> ### Apply a Monkeypatch to the `react-native-leaflet-view` Package:
>
> I noticed when building the Android and iOS apps that the location of the Leaflet.html was incorrect. Finding the right location took some testing, but was resolved with moving the leaflet.html file out of the example android source file in the `react-native-leaflet-view` package. However, applying the fix and having it build with Expo ran into more challenges, so I forked the repo instead as seen below:
>
> * Install the forked repo with: `npm install git+https://git@github.com:geoinformatica-consulting/react-native-leaflet-view-2.git --save`
> * More changes can be submitted to this forked package of `https://github.com/geoinformatica-consulting/react-native-leaflet-view-2` 
> * Clone the forked package with `git@github.com:geoinformatica-consulting/react-native-leaflet-view-links.git`

#
# Install and Configure the MyMooder Frontend
1. Install necessary packages and start building the app using these `just` file commands. This gets the apps running locally. The `just` commands run regular package.json commands. The following commands gets you up and running:

        # cd to the mymooder-frontend directory:
        cd ~/mymooder/mymooder-frontend

        # Remove any previous node_modules, ios or android builds:
        just A_start-fresh:

        # Install expo and login.
        just A1_expo-setup-install

        # Remove any previous ios and android builds, configure the app builds, and pre-build ios and android platforms to run locally:
        just A2_clean-configure-and-build-both-platforms

        # Chose which specific platform to run locally. This command runs all web, android, and ios platforms:
        just B4_expo-start

        # Follow any promots to open i for ios, a for android and w for the web.

2. Make test builds to prepare for distributing to testers as an 'adhoc' ios 'enterpriseProvisioning'. This command prompts to log into Expo. You should have your email and password available. The default configuration builds both iOS and Android platforms and makes credentials for them.
* Make changes to this command to stop logging into Expo, or build different platforms separately. 
* Change the variable `eas_build_profile` to be `development` or `test` - Check the individual eas profile configurations in file `~/mymooder/mymooder-frontend/eas.json`

        # The expo build command builds the platforms 
        just E_expo-build-android

        just E_expo-build-ios

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

### Other Alternatives to Using a Mac (I have not confirmed these all work):
       
> 1. Use UTM using Chemu to run emulators and vms for machines (about $10 for a license). 
> 2. Use the Darling package to buils iOS apps with xcode: https://www.baeldung.com/linux/xcode
> 3. Download specific iso image for non-macOs machines. See https://ubuntu.com/download/desktop/thank-you?version=24.04&architecture=amd64&lts=true
> 4. Download the specific ISO image to use ubuntu-24.04-desktop-amd64.iso
> 5. Install XCode on Any Ipad or Mac Device
> 6. If developing on an Ipad, use https://coder.com/blog/a-guide-to-writing-code-on-an-ipad

#
> **Note**
>
> ### ~No Longer Used, but retained for documentation purposes~
> ##### Install & Configure A Development Environment Using Windows Subsystem for Linux (WSL) in Windows:
>1. Open the Windows terminal (`cmd.exe`) and install Windows Subsystem Linux (WSL) 2:
>
>        wsl --install 
>
>2. View the list of WSL distributions available with:
>
>        wsl --list --online
>
>3. Install your preferred Ubuntu distribution with
>
>        wsl --install -d Ubuntu-24.04
>
>4. Once installed, another terminal will open where you should set your password. This will set the username to be in the sudoers file and be assigned sudo privelages. Close the Ubuntu terminal. I used the username as `ksundeen`.
>
>5. Open the Windows terminal to set the default distribution as Ubuntu-24.04. Set the default Ubuntu distribution with:
>
>        wsl --setdefault Ubuntu-24.04
>
>6. From the same Windows terminal, login to the new Ubuntu-24.04 distribution using:
>
>        wsl -u ksundeen -d Ubuntu-24.04
>
>7. Create root user password to keep things safe. :
>       
>       - Login to WSL as the root user:
>       
>               wsl -u root -d Ubuntu-24.04
>
>       - Enter commands to change the password:
>
>               passwd root
>
>       - The change the password for the root user ...
>
>       - Exit WSL:
>
>               exit
>
>       - Login to WSL Ubuntu 24.04 machine:
>       
>               wsl -u ksundeen -Ubuntu-24.04
>       
>       - Type echo hi to confirm the password was accepted:
>       
>               sudo echo hi
>
>8. Close the Ubuntu-24.04 terminal by typing `exit` and then login using the root user. You will be confirming that you can login as the `ksundeen` user here.
>
>        wsl -u root
>
>![wsl-root-img](./confirm-wsl-root.png?raw=true)
>
>9. Now in Ubuntu-24.04 default terminal, confirm your `ksundeen` user exists using the `su` for sudouser command:
> 
>        su ksundeen
>
>10. Finally, to get back to the root user from your profile user, simply type exit bring you back to the root user login screen:
>
>         exit
>
#
# Posts and Resources that Helped Build and Inspire this Application
* Adding D3 Graphics to a Map: https://medium.com/nightingale/creating-a-d3-map-in-a-mobile-app-using-react-native-46da1e6b3be6
* Getting a User's Location with Expo: https://docs.expo.dev/versions/latest/sdk/location/
* Getting Location Without Expo: https://blog.logrocket.com/react-native-geolocation-complete-tutorial/#getting-users-location-data

# Other Fun Resources to Remember
* github README emojis: https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md