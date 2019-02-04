const { createSandbox } = require('sinon')
const Course = require('./Course')
const CourseManager = require('./CourseManager')

const sandbox = createSandbox()
const { stub, replaceGetter } = sandbox

describe('Course class from CourseService', () => {
    // mock data
    // setup
    let manager

    beforeEach('initialize CourseManager', () => {
        manager = new CourseManager()
    })

    afterEach('reset', () => {
        sandbox.reset()
    })

    after('restore', () => {
        sandbox.restore()
    })

    // tests
    it('should discover courses')

    describe('#_loadCourse', () => {
        let isValidStub

        before('stub Course.isValid', () => {
            isValidStub = stub()
            replaceGetter(Course.prototype, 'isValid', isValidStub)
            stub(Course.prototype, '_readPkgInfo').returns({})
        })

        it('should throw an error if course is not valid', () => {
            isValidStub.returns(false)

            expect(() => {
                manager._loadCourse('')
            }).to.throw('not valid')
        })

        it('should add new course to loaded courses', () => {
            isValidStub.returns(true)

            expect(manager.loadedCourses).to.have.a.lengthOf(0)

            manager._loadCourse('')

            expect(manager.loadedCourses).to.have.a.lengthOf(1)
        })
    })

    describe('#loadCourses', () => {
        let loadCourseStub,
            discoverCoursesStub

        beforeEach('stub _loadCourse', () => {
            discoverCoursesStub = stub(manager, 'discoverCourses')
            loadCourseStub = stub(manager, '_loadCourse')
        })

        it('should return an array of Courses', () => {
            discoverCoursesStub.returns([])
            let result = manager.loadCourses()

            expect(result).to.be.an('array').that.is.empty
        })

        it('should throw an error if at least one course failed to load', () => {
            discoverCoursesStub.returns(['first-course', 'second-course', 'third-course'])
            loadCourseStub.withArgs('second-course').throws()

            expect(() => {
                manager.loadCourses()
            }).to.throw('Failed to load')
        })
    })
})
