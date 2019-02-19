// salp course bundle config

export interface ImageConfiguration {
    // docker image (on hub.docker.com)
    image?: string;
    // path to a local docker image which will be used instead of image
    path?: string;
    // ports which should be mapped onto a running container
    ports?: number[]
}

// one image per property; key is a unique identifier for that course
export type DockerImages = { [key: string]: ImageConfiguration }

export interface DockerConfiguration {
    // list of all provided docker images
    images?: DockerImages;
}

export interface AssignmentQuestionAnswers {
    answer: string;
    // determines whether the answer is correct; only one answer can be correct for 'SingleChoice';
    // defaults to false when omitted
    correct?: boolean;
}

export interface AssignmentQuestion {
    component: 'SingleChoice' | 'MultipleChoice' | 'UserInput';
    question: string;
    answers: Array<AssignmentQuestionAnswers>;
}

export interface Assignment {
    questions: Array<AssignmentQuestion>;
}

export type Assignments = { [name: string]: Assignment }

export interface CourseConfiguration {
    // path to course content/chapters
    chapters: string;

    // A custom output directory; might be overwritten by CLI
    output?: string;

    // path to content script entry file; this script is executed in content context
    userScript?: string;

    // docker configuration (mainly for images)
    docker?: DockerConfiguration;

    // assignment configuration
    assignments?: Assignments;

    // optional: chain webpack config for both content and background scripts
    chainWebpack?: Function;
    // optional: chain webpack config for content script
    chainUserWebpack?: Function;
}

export default CourseConfiguration
