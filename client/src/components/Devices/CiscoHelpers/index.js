import ExtendedAccessList from './ExtendedAccessList'
const EACL = new ExtendedAccessList('TEST')

const helpers = {
    ExtendedAclObj: function (f) { 
        EACL.process()
        return 'ExtendedAclObj: ' + f
    }
}
export default helpers;