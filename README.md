Jobcore-mobile

Created with react-native-cli

## Onboarding screennames

- Dashboard: `dashboard`
- Invitations `invitations`
- Job Preferences `job_preferences`
- My Jobs `my_jobs`
- Profile `profile`

Example:

```
 {
            "dashboard": [
                {
                    "heading": "Dashboard Tutorial",
                    "message": "Click on the dolar icon to review your pending and cleared payments",
                    "img_url": "https://res.cloudinary.com/hq02xjols/image/upload/v1559164967/static/onboarding/Screen_Shot_2019-05-29_at_5.21.39_PM.png"
                },
                {
                    "heading": "Dashboard Tutorial",
                    "message": "Click on the envelope to review and apply to job invitations",
                    "img_url": "https://res.cloudinary.com/hq02xjols/image/upload/v1559164967/static/onboarding/Screen_Shot_2019-05-29_at_5.21.39_PM.png"
                },
                {
                    "heading": "Dashboard Tutorial",
                    "message": "Click on the suitcase to review your upcoming jobs",
                    "img_url": "https://res.cloudinary.com/hq02xjols/image/upload/v1559164967/static/onboarding/Screen_Shot_2019-05-29_at_5.21.39_PM.png"
                },
                {
                    "heading": "Dashboard Tutorial",
                    "message": "Click on the start and see how employers have rated you",
                    "img_url": "https://res.cloudinary.com/hq02xjols/image/upload/v1559164967/static/onboarding/Screen_Shot_2019-05-29_at_5.21.39_PM.png"
                }
            ],
        }
```


###  ANDROID X compatibility Hack for v4 projects:

For incompatibility errors like this:

```bash
/Users/alacret/workspace/jobcore-mobile/node_modules/react-native-maps/lib/android/src/main/java/com/airbnb/android/react/maps/AirMapView.java:12: error: package android.support.v4.view does not exist
import android.support.v4.view.GestureDetectorCompat;
```

1) Go to the `node_modules` folder and find the android project that is throwing de error. In this case: `react-native-maps`
2) Open the android project and create a `gradle.properties` if it does not exist already and add this 2 variables:

> node_modules/react-native-maps/android/gradle.properties
```bash
android.useAndroidX=false
android.enableJetifier=false
```

## Project configurations

Configure project on file: `src/shared/config.js`
Global constants:
- `PROD`: its on production environment or not.  
