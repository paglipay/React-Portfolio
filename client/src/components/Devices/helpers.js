const helpers = {
    sanitize: function (f) { 
        return 'sanitize'
    },
    cisco_parse: function (f) {
        let obj_name, obj_prop
        let output_list = []
        let obj_dic = {}
        // const break_it_up = { interface: '' }
        try {
            f.split("\n").forEach(l => {
                if (l[0] !== ' ' && l !== '') {
                    obj_name = l.trim()
                    obj_prop = obj_name
                    if (obj_name !== '') {
                        output_list.push(obj_name)
                    }
                }
                else if (l[0] === ' ' && '!' !== l[0] && l !== '') {
                    obj_prop += '\n ' + l.trim()
                }
                if (obj_name !== '') {
                    obj_dic[obj_name] = obj_prop
                }
            })
            return obj_dic
        }
        catch (err) {
            console.log('pass')
        }
    },
    cisco_get: function (str_config, obj_items = []) {
        let out_dic = {}
        out_dic[str_config] = {}
        let p

        for (p in obj_items) {
            if (str_config === p.substring(0, str_config.length)) {
                let v = obj_items[p]
                let v_line = v.split('\n')
                out_dic[str_config][p] = { "id": p, "config": v, "_list": v_line }

                // let c_res = ''
                // let l_res = []
                // const configList = out_inv[e][x].config.split('\n')
                // console.log(configList)
                // configList.forEach(l => {
                //     const properties_list = breakItUp.find(b => b.key === e).list
                //     console.log(e, ':', properties_list)
                //     properties_list.forEach(p => {
                //         if (p in l){
                //             c_res += l + '\n'
                //             l_res.push(l)
                //         }
                //     })
                // })
            }
        }
        return out_dic
    }
}
export default helpers;