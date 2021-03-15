import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import DynamicQuestions from './DynamicQuestions'
import { addAnswersRequest, addAnswersToPost } from './redux/thunks'
import {
    Button
} from 'semantic-ui-react'

function Display(props) {
    const [qIndex, setQIndex] = useState(0)

    useEffect(() => {
        console.log('qIndex: ', qIndex)
    }, [qIndex])

    return (
        <>
            <Button onClick={() => setQIndex(qIndex - 1)}>Back</Button>
            <Button onClick={() => setQIndex(qIndex + 1)}>Next</Button>
            < DynamicQuestions {...props} qIndex={qIndex} />
        </>
    )
}

const mapStateToProps = state => {
    return {
        questions: state.questions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addAnswersRequest: (obj, key) => dispatch(addAnswersRequest(obj, key)),
        addAnswersToPost: (obj, key) => dispatch(addAnswersToPost(obj, key)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Display)
