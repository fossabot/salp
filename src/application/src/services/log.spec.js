const rewire = require('rewire')
const electronLog = require('electron-log')
const log = require('./log')

describe('log.js service', () => {
    it('should export logger as default module', () => {
        expect(log).to.have.property('default').which.equals(electronLog)
    })

    it('should export a setup function', () => {
        expect(log).to.have.property('setup').which.is.a('function')
    })

    describe('logger configuration', () => {
        let logger

        beforeEach('rewire logger module', () => {
            logger = rewire('./log')
        })

        it('should raise log level to "debug" in development', () => {
            logger.__set__('isDevelopment', true)
            logger.setup()

            expect(logger.default.transports.console.level).to.equal('debug')
        })

        it('should raise log level to "error" in production', () => {
            logger.__set__('isDevelopment', false)
            logger.setup()

            expect(logger.default.transports.file.level).to.equal('error')
        })

        it('should write log to console in development', () => {
            logger.__set__('isDevelopment', true)
            logger.setup()

            expect(logger.default.transports.console.level).to.be.ok
            expect(logger.default.transports.file.level).to.be.false
        })

        it('should write log to file in production', () => {
            logger.__set__('isDevelopment', false)
            logger.setup()

            expect(logger.default.transports.file.level).to.be.ok
            expect(logger.default.transports.console.level).to.be.false
        })
    })
})
