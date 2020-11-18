import ExtendedAccessList from './ExtendedAccessList'
const EACL = new ExtendedAccessList('TEST')

const helpers = {
    ExtendedAclObj: function (f) { 
        EACL.process()
        return 'ExtendedAclObj: ' + f
    },
    compare_acl_entry: function (net1, net2, entry) { 
        if(net1 === net2){
            return true
        }
        return false
    }
}
export default helpers;