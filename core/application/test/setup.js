const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
const SinonChai = require('sinon-chai')
const mockRequire = require('mock-require')
const { app } = require('../__mocks__/electron')

chai.use(chaiAsPromised)
chai.use(SinonChai)

mockRequire('electron', { app })

global.expect = chai.expect
