TACOS Changelog
===============

## 0.0.22 (2019-10-02)

### Enhancement

- improvements to the dark mode;
- improved display of the games and quiz section;
- android-targetSdkVersion is now set to 28 and android-minSdkVersion is set
  to 19.

### Fix

- fixed dark mode theme on iOS;
- fixed an issue when the user wants to open a href:mailto link from the
  application;
- fixed an issue the CSWL 2019 Agenda when no link is associated to an event.


## 0.0.21 (2019-10-01)

### New

- [spam-signal] the user has now possibility to report spam number in clear.
  This behavior is configurable in the settings of the application.
- [games-and-quiz] added new quiz about WiFi.

### Enhancement

- more tips and tricks are now available;
- improvements to the dark theme.

### Fix

- [settings] fixed a random bug when changing the value of SPAM_SEND_CLEAR (due
  to a infinite loop triggered via (ionChange)).


## 0.0.19 (2019-09-04)

- Android API level is now set to minimum 26 (android-minSdkVersion).


## 0.0.18 (2019-09-04)

### New

- [core] a dark theme is now available for the interface.

### Enhancement

- [games-and-quiz] an new example of phishing game has been added;
- [core] the application now detects when the internet connection is lost. The
  management of the cache has been improved;
- various improvements to the interface;
- improvements to the translations.


## 0.0.17 (2019-08-08)

### New

- we added an agenda for the Cyber Security Week Luxembourg 2019.

### Enhancement

- [core] improvements to the user interface (for Android and iOS);
- [news] it is now possible to share a news via different social networks or
  applications from the device;
- [core] translations were updated.


## 0.0.16 (2019-08-05)

### New

- [games-and-quiz] a new  game, 'Phishing ?', has been added;
- [spam-signal] the permission READ_CALL_LOG for Android is no more required
  since the dependency to cordova-plugin-calllog has been removed;

### Enhancement

- [core] improvements to the main menu and application logo;
- [spam-signal] improvements to the layout;
- [spam-signal] it is now possible to manually search for a phone number;

### Fix

- [tips-and-tricks] issue #3 has been fixed;


## 0.0.15 (2019-07-16)

- first public alpha release of TACOS.
