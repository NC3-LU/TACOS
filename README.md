CASESapp - Security in your smartphone !!
=========================================

# Installation

* Getting Node and NPM
* Install Ionic and cordova
```bash
npm install -g ionic cordova
```
* Clone the repository

```bash
git clone https://github.com/CASES-LU/CASESapp.git
```
* Go to the folder

```bash
cd ./CASESapp
```
* Launch the serve
```bash
ionic serve
```

# Generate Android SDK
## Requirements

* Install Java JDK8 (Cordova is not compatible with the latest version of Java. You must install JDK8 to build Android apps with Cordova)

```bash
sudo apt install openjdk-8-jdk
```

### Install Gradle

```bash
wget https://services.gradle.org/distributions/gradle-5.4.1-bin.zip -P /tmp

sudo unzip -d /opt/gradle /tmp/gradle-*.zip
```

### Install Android SDK

```bash
wget https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip -P /tmp

unzip -d ~/android-sdk-tools /tmp/sdk-tools-linux-4333796.zip
```

### Create repositories.cfg File

```bash
touch ~/.android/repositories.cfg
```

### Set environment variables

In ~/.bashrc, ~/.bash_profile, or similar shell startup scripts, make the following modifications:

1.  Set the ANDROID_SDK_ROOT environment variable. This path should be the Android SDK Location used in the previous section.

```bash
export ANDROID_SDK_ROOT=~/android-sdk-tools
```
2. Add the Android SDK command-line directories to PATH. Each directory corresponds to the category of command-line tool.

```bash
# avdmanager, sdkmanager
export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin

# adb, logcat
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools

# emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
```

3. Include gradle into your path

```bash
# gradle
export PATH=$PATH:/opt/gradle/gradle-5.4.1/bin
```

### Install SDK build tools

```bash
sdkmanager "build-tools;28.0.3"
```

### Update Android Packages

```bash
sdkmanager --update
```

### Generation sdk

```bash
ionic cordova build android
```

## To emulate android Phone
Doesn't in guest VM

### Install same [requirements](\README.md#generate-android-sdk) for generation a sdk

### Install android image

```bash
sdkmanager "system-images;android-28;google_apis;x86_64"
```

### Create device (AVD)

```bash
avdmanager create avd --force --name AndroidPhone --abi google_apis/x86_64 --package 'system-images;android-28;google_apis;x86_64'
```

### run emulator
```bash
ionic cordova emulate android
```

# License

??
