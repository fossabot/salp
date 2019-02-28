# Introduction
This guide shows the internals of the SALP application, used concepts and tools, aswell as hidden APIs.

SALP is a cross platform application written in JavaScript (or ECMAScript) using the [electron](https://electronjs.org/) framework.

The visible frontend is written using [Vue.js](https://vuejs.org/).

## Project
The code repository is a monolithic project with multiple sub-projects. Each project is in fact a [npm package](https://docs.npmjs.com/about-packages-and-modules). The whole project is managed with [lerna](https://github.com/lerna/lerna).

### Packages
The `src/` directory contains essential core packages which are required for running the app.
You can find [custom courses](./02-Courses.md), the course-bundler and the markdown webpack-loader inside the `packages/` folder.

## Architecture
Since SALP is based on [electron](https://electronjs.org/) it contains of two layers[^1]:
1. **main** (or sometimes called background) which is run inside a [NodeJS](https://nodejs.org/) process,
2. **renderer** that is a [Chromium](https://www.chromium.org/) view.

Both layers are run in different threads on the OS layer. They can communicate using IPC (*Inter Process Communication*), sending primitives (strings, numbers, JSON) between each other.

[^1]: https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
