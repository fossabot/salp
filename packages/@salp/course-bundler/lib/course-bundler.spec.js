const path = require('path')
const rewire = require('rewire')

const cwd = process.cwd()

describe('course-bundler', () => {
    const module = rewire('./course-bundler.js')

    describe('private method #determineOutputDir', () => {
        const subject = module.__get__('determineOutputDir')

        function normalizePath(result) {
            return result.replace(cwd, '').slice(1)
        }

        const tests = [
            {
                msg: 'when no path nor options are provided',
                shouldMsg: 'should resolve default path "dist"',
                args: [cwd, null, {}],
                expected: 'dist'
            },
            {
                msg: 'when a path is given',
                shouldMsg: 'should prefer given path',
                args: [cwd, '_some_output_path_', {}],
                expected: '_some_output_path_'
            },
            {
                msg: 'when only path in options is given',
                shouldMsg: 'should resolve path from options',
                args: [cwd, null, { output: '_some_other_dir_' }],
                expected: '_some_other_dir_'
            },
            {
                msg: 'when path is given and in options',
                shouldMsg: 'should prefer given path to options path',
                args: [cwd, '_path_from_given_', { output: '_path_from_options' }],
                expected: '_path_from_given_'
            }
        ]

        tests.forEach(test => {
            context(test.msg, () => {
                let result

                before(() => {
                    result = subject.apply(null, test.args)
                })

                it(test.shouldMsg, () => {
                    expect(normalizePath(result)).to.equal(test.expected)
                })

                it('should return absolute path', () => {
                    const isAbsolute = path.isAbsolute(result)

                    expect(isAbsolute, 'path is absolute').to.be.true
                })
            })
        })
    })
})
