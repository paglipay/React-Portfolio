import React from "react";
import { connect } from 'react-redux'
import {
    Header,
    Segment,
    Icon,
} from 'semantic-ui-react'
import DTable from '../../DynamicTable/DynamicTable'

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
        return (<><hr /><h3>{e}</h3>{results[e].map(l => {
            return (<><p><b>{l.question}</b><br />{l.answer}</p>
                {Array.isArray(l.answer) ? <DTable  key={`${i}${l}`} headers={['key', 'text', 'value']} data={
                    [
                        { key: '8:00', text: '8:00', value: '8:00' },
                        { key: '10:00', text: '10:00', value: '10:00' },
                    ]} /> : null}
            </>)
        })}</>)
    })
}

function Answers(props) {
    // const data = ['Profile', 'Customer Questions', 'Order Form']
    const data = props.data

    return (
        <>
            {data.map((e, i) => {
                return (
                    <Segment key={i}>
                        <span>
                            {props.qIndex > i ? <div style={{ float: 'right' }}>Edit{' '}<Icon key={i} name='edit' onClick={() => {
                                props.setQIndex(i)
                                props.history.push('/placeorder')
                            }} style={{ float: 'right', cursor: "pointer" }} /></div> : null}
                        </span>

                        {props.qIndex === i ?
                            (<span><Header>
                                {props.questions.results && props.questions.results[data[i]] && Object.keys(props.questions.results[data[i]]).length !== 0 ? <Icon key={i} circular name="check" /> : <Icon key={i} circular name="exclamation triangle" />}
                                {e}
                            </Header></span>) : (<>
                                {props.questions.results && props.questions.results[data[i]] && Object.keys(props.questions.results[data[i]]).length !== 0 ? <Icon key={i} circular name="check" /> : <Icon key={i} circular name="exclamation triangle" />}
                                {e}
                            </>)
                        }
                        {
                            // props.location.pathname !== '/placeorder' &&
                            props.questions.results && props.questions.results[data[i]] ? displayResults(consolidateQIndexes(props.questions.results && props.questions.results[data[i]] ? props.questions.results[data[i]] : {})) : <p></p>}
                    </Segment>
                )
            })}
        </>
    );
}

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
