import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import {
    Header,
    Segment,
    Icon,
    Image,
} from 'semantic-ui-react'

const consolidateQIndexes = (data) => {
    let results = {}
    Object.keys(data).forEach((prop) => {
        if (results.hasOwnProperty(data[prop].qIndex) === false) { results[data[prop].qIndex] = [] }
        results[data[prop].qIndex].push({ question: prop, answer: data[prop].answer })
    })
    return results
}

const displayResults = (results) => {
    return Object.keys(results).map((e, i) => {
        return (<><hr /><h3>{e}</h3><br />{results[e].map(l => {
            return (<p><b>{l.question}</b><br />{l.answer}</p>)
        })}</>)
    })
}

function Answers(props) {
    const data = ['Register', 'Profile', 'Customer Questions', 'Order Form']

    return (
        <>
            {data.map((e, i) => {
                return (
                    <Segment key={i}>
                        <span>
                            <Link to='/profile'>
                                {/* <Label style={{ float: 'right' }}> */}
                                <Icon name='edit' style={{ float: 'right' }} />
                                {/* </Label> */}
                            </Link>
                        </span>
                        <span><Header as='h2'><Image src='/images/avatar/small/elliot.jpg' size='medium' circular />{e}</Header></span>
                        {displayResults(consolidateQIndexes(props.questions.results && props.questions.results[data[i]] ? props.questions.results[data[i]] : {}))}
                    </Segment>)
            })}
        </>
    );
}

// export default Orders;

const mapStateToProps = state => {
    return {
        questions: state.questions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Answers)
