import * as utils from 'ipv4-calculator/dist/utils'

export default class ExtendedAccessList {
    constructor(name) {
        this.name = name;
        this.remarks = [];
        console.log('ExtendedAccessList')
    }

    process(){
        console.log('process')
    }

    // function parse_acl(self, list){
    //     #print('parse_acl')
    //     remark_name = ''
    //     for r in list:
    //         #print(r.strip())
    //         r = r.strip()
    
    //         if 'ip access-list extended' in r:
    //             self.name = r
    //             #print('self.name:'+self.name)
    //         elif 'remark' in r:
    //             if r in self.remarks:
    //                 print('Already has remark: '+r)
    //                 remark_name = r
    //             else:
    //                 remark_name = r
    //                 #print('remark_name: '+remark_name)
    //                 self.remarks[remark_name] = []
    //                 self.remarks_list.append(remark_name)
    
    //         elif ('permit' in r or 'deny' in r) and not 'remark' in r:
    //             #print(''+r)
    //             if remark_name == '':
    //                 remark_name = '!remark none'
    //                 self.remarks[remark_name] = []
    //                 self.remarks_list.append(remark_name)
    
    //             if r in self.global_entry_dic:
    //                 print('')
    //                 self.log_match[r] = 'MATCH Existing!: '#+r+' - '+self.global_entry_dic[r.strip()]
    //                 print('MATCH ENTRY!')
    //             elif self.is_same_source(r, remark_name):
    //                 print('self.is_same_source')
    //                 self.log_match[r] = 'MATCH SOURCE!: '#+r+' - '+self.global_entry_dic[r.strip()]
    //                 print('MATCH SOURCE!')
    //             else:
    //                 self.global_entry_dic[r] = remark_name
    //                 dic  = self.parse_acl_entry(r, remark_name)
    //                 #print(dic)
    //                 self.remarks[remark_name].append(dic)
    // }
    

}