#! /usr/bin/env bash

keystore=$1
key_alias=$2

final_apk=./platforms/android/app/build/outputs/apk/release/TACOS.apk


rm -Rf node_modules/ www/ plugins/ platforms/android/
npm install
ionic cordova platforms add android
ionic cordova build android --release


read -r -p "Do you want to sign the APK? [y/N] " response
case "$response" in
    [yY][eE][sS]|[yY])
        jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $key_alias
        zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $final_apk
        echo "Generation done. Signed APK available here:"
        echo $final_apk
        ;;
    *)
        echo "Generation done. APK available here:"
        echo ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
        ;;
esac


exit 0
