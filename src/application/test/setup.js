const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
const SinonChai = require('sinon-chai')

chai.use(chaiAsPromised)
chai.use(SinonChai)

global.expect = chai.expect
