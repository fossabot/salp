// salp course bundle config

export interface ImageConfiguration {
    // docker image (on hub.docker.com)
    image?: string;
    // path to a local docker image which will be used instead of image
    path?: string;
    // ports which should be mapped onto a running container
    ports?: number[]
}

export interface CourseConfiguration {
    // path to course content/chapters
    chapters: string;
    // whether the chapters are nested into different languages (e.g. en/01-Introduction.md, de/01-Einleitung.md)
    multilang?: boolean;

    // path to content script entry file; this script is executed in content context
    contentScript?: string;
    // path to background script entry file; this script is executed in background context
    backgroundScript?: string;

    // register docker images
    // one image per property; key is a unique identifier for that course
    images?: { [key: string]: ImageConfiguration };

    // optional: chain webpack config for both content and background scripts
    chainWebpack?: Function;
    // optional: chain webpack config for content script
    chainContentWebpack?: Function;
    // optional: chain webpack config for background script
    chainBackgroundWebpack?: Function;
}

export default CourseConfiguration
