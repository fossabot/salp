const { createSandbox } = require('sinon')
const mockRequire = require('mock-require')
const Course = require('./Course')

const sandbox = createSandbox()
const { stub } = sandbox

describe('Course class from CourseService', () => {
    // mock data
    const pkgJsonData = {
        name: 'salp-course-test-example',
        description: 'A Description for a Course',
        version: '1.0.2',
        author: 'Janett Doe <janett.doe@example.com>',
        keywords: ['example-course', 'SQL injections', 'test Course']
    }

    // setup
    let readPkgInfoStub

    before('stub', () => {
        readPkgInfoStub = stub(Course.prototype, '_readPkgInfo')
    })

    afterEach('reset', () => {
        sandbox.reset()
    })

    after('restore', () => {
        sandbox.restore()
    })

    // tests
    describe('course information', () => {
        const infoProperties = ['name', 'description', 'version', 'author', 'keywords']

        it('should have info properties ' + infoProperties.join(', '), () => {
            readPkgInfoStub.returns({...pkgJsonData})
            const course = new Course()

            infoProperties.forEach(p => {
                expect(course).to.have.property(p)
            })
        })

        it('should be able to access package.json details', () => {
            const expectedPkgJsonDetails = {
                version: '1.0.1',
                description: 'Another Description',
                main: 'dist/content.js',
                pkgJsonVar: 'only available in package.json'
            }

            readPkgInfoStub.returns(expectedPkgJsonDetails)
            const course = new Course()

            expect(course.pkgInfo).to.deep.equal(expectedPkgJsonDetails)
        })

        it('should return package name as identifier', () => {
            readPkgInfoStub.returns({...pkgJsonData})
            const course = new Course()

            expect(course.id).to.equal(pkgJsonData.name)
            expect(course.id).to.equal(course.name)
        })

        it('should use info from package.json info', () => {
            readPkgInfoStub.returns({...pkgJsonData})
            const course = new Course()

            Object.entries(pkgJsonData).forEach(([key, value]) => {
                expect(course[key]).to.equal(value)
            })
        })

        it('should work with empty package.json info', () => {
            readPkgInfoStub.returns(undefined)
            const course = new Course()

            Object.keys(pkgJsonData).forEach(key => {
                expect(course[key]).to.equal(undefined)
            })
        })

        context('valid state', () => {
            it('should be valid if it has a name and can resolve entry scripts', () => {
                readPkgInfoStub.returns({
                    ...pkgJsonData,
                    'browser': 'browser.js',
                    'main': 'main.js'
                })

                const course = new Course('/some/path')
                const isValid = course.isValid

                expect(isValid, 'Course is valid').to.be.true
            })

            it('should not be valid if it has an invalid path', () => {
                readPkgInfoStub.returns({})
                const course = new Course()
                const isValid = course.isValid

                expect(isValid, 'Course is not valid').to.be.false
            })

            it('should not be valid if it has no name', () => {
                readPkgInfoStub.returns({})
                const course = new Course('/some/path')
                const isValid = course.isValid

                expect(isValid, 'Course is not valid').to.be.false
            })

            it('should not be valid if it cannot resolve entry script', () => {
                readPkgInfoStub.returns({...pkgJsonData})
                const course = new Course('/some/path')
                const isValid = course.isValid

                expect(isValid, 'Course is not valid').to.be.false
            })
        })
    })

    describe('#sanitizedName', () => {
        const expectedNames = {
            'Some Course': 'Some_Course',
            'Some:Course': 'Some_Course',
            'Some: Course': 'Some__Course',
            'Some-Course': 'Some_Course',
            'Some_Course': 'Some_Course',
            ' Some Course ': 'Some_Course',
            '00 Some Course': '00_Some_Course',
            '  Course: Chapters 01-98': 'Course__Chapters_01_98'
        }

        Object.entries(expectedNames).forEach(([name, sanitizedName]) => {
            it(`should sanitize name "${name}" to "${sanitizedName}"`, () => {
                readPkgInfoStub.returns({ name })
                const course = new Course()

                expect(course.sanitizedName).to.equal(sanitizedName)
            })
        })
    })

    describe('#_readPkgInfo', () => {
        it('should resolve package.json in given path', () => {
            const givenPath = '/tmp/_salp_application_tests/_course_tests'
            const expectedPath = givenPath + '/package.json'
            const expectedPkgJson = { uniqTKey: 'some package.json var' }

            readPkgInfoStub.callThrough()
            mockRequire(expectedPath, expectedPkgJson)

            const course = new Course(givenPath)
            const result = course._readPkgInfo()

            expect(result).to.deep.equal(expectedPkgJson)
        })
    })

    describe('#resolveContentEntry', () => {
        it('should throw an exception when "browser" field was not defined in package.json', () => {
            const course = new Course()

            expect(course.resolveContentEntry.bind(course)).to.throw(Error, 'missing in package.json')
        })

        it('should resolve entry from "browser" field in current path', () => {
            const givenPath = '/tmp/_salp_application_tests/_course_tests/resolver'
            const expectedEntryFile = 'entry/file_Content'

            readPkgInfoStub.returns({ browser: expectedEntryFile })
            const course = new Course(givenPath)

            expect(course.resolveContentEntry()).to.equal(givenPath + '/' + expectedEntryFile)
        })
    })

    describe('#resolveBackgroundEntry', () => {
        it('should throw an exception when "main" field was not defined in package.json', () => {
            const course = new Course()

            expect(course.resolveBackgroundEntry.bind(course)).to.throw(Error, 'missing in package.json')
        })

        it('should resolve entry from "main" field in current path', () => {
            const givenPath = '/tmp/_salp_application_tests/_course_tests/resolver'
            const expectedEntryFile = 'entry/file_Background'

            readPkgInfoStub.returns({ main: expectedEntryFile })
            const course = new Course(givenPath)

            expect(course.resolveBackgroundEntry()).to.equal(givenPath + '/' + expectedEntryFile)
        })
    })
})
