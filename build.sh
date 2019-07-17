#! /usr/bin/env bash

alias_name=$1
keystore=$2

rm -Rf node_modules/ www/ platforms/android/
npm install
ionic cordova platforms add android
ionic cordova build android --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $alias_name
zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ./platforms/android/app/build/outputs/apk/release/TACOS.apk
