# Sandbox
Since SALP loads unknown and probably risky user content it is crucial to load them in a controlled environment.

## Courses
### Content
A single course content is run in a browser sandbox using the [electron `<webview>` API](https://electronjs.org/docs/api/webview-tag) which has limited access to the main application.

A custom API (named `sandbox-api`) provides the following features:
* updating the page title
* change the current route
* tracking

### Docker images
Docker containers which are using the provided docker images from a curse a run in an [isolated network](https://docs.docker.com/network/network-tutorial-standalone/) and do not have access to the internet. They can only be accessed from `localhost`.
