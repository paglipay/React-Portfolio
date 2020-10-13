const helpers = {
    cisco_parse: function (f) {
        // console.log('cisco_parse: ')
        let obj_name, obj_prop
        let output_list = []
        let obj_dic = {}
        const break_it_up = { interface: '' }
        try {
            f.split("\n").forEach(l => {
                // console.log('forEach: ', l)
                if (l[0] !== ' ' && l !== '') {
                    obj_name = l.trim()
                    obj_prop = obj_name
                    // console.log('obj_name:', obj_name)
                    if (obj_name != '') {
                        output_list.push(obj_name)
                    }
                }
                else if (l[0] === ' ' && '!' !== l[0] && l !== '') {
                    obj_prop += '\n ' + l.trim()
                }
                if (obj_name !== '') {
                    obj_dic[obj_name] = obj_prop
                }
                // console.log(obj_dic)
            })
            return obj_dic
        }
        catch (err) {
            console.log('pass')
        }
    },
    cisco_get: function (str_config = 'interface', obj_items = [{ id: 1, name: '1', id: 2, name: '2' }]) {
        // console.log('cisco_get: ')
        let out_dic = {}
        out_dic[str_config] = {}
        // out_dic[str_config]['_list'] = []
        let p

        for(p in obj_items) {
            // console.log ('cisco_get: ', p, obj_items[p])
            
            if (str_config === p.substring(0, str_config.length)){
                // console.log ('cisco_get: ', p, obj_items[p])
                let v = obj_items[p]
                let v_line = v.split('\n')
                out_dic[str_config][p] = {"id": p, "config": v, "_list": v_line}

            }
        }
        return out_dic
    }
}
export default helpers;