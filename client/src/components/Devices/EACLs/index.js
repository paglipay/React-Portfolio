import React, { useState, useEffect, useRef } from 'react'
import CiscoHelpers from '../CiscoHelpers'

function EACLs() {
    
    useEffect(() => {
        console.log('EACLs')
        console.log(CiscoHelpers.ExtendedAclObj('hi'))
    }, []);

    return (
        <div>
            <h1>EACLs</h1>
        </div>
    )
}

export default EACLs
