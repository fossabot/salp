# Matomo
SALP uses [Matomo](https://matomo.org/) to track user behavior data.  

## Vue.js - Matomo
To get Matomo to work with [Vue.js](https://vuejs.org/), SALP uses the [`vue-matomo`](https://github.com/AmazingDreams/vue-matomo) package.  
This packages will provide a `tracker` instance inside `vue.js` by calling `this.$matomo`.

## Matomo Javascript Tracking Client
To track user behavior inside SALP, the [Matomo Javascript Tracking Client api](https://developer.matomo.org/api-reference/tracking-javascript) is used. The api can be called via `this.$matomo` like `this.$matomo.trackPageView('settings')`.

## Consent
To allow users to opt-out SALP uses the [*consent management*](https://developer.matomo.org/api-reference/tracking-javascript#managing-consent) of Matomo.  
By default the consent is not given and if the user allows tracking, the consent will be given and vice versa.

### Hint
For development a Matomo server can be hosted via docker.