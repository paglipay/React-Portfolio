import React, { useState } from "react";
import { connect } from 'react-redux'
import { postAnswers, getAnswersById } from '../redux/thunks'
import { Button, Checkbox, Segment } from 'semantic-ui-react'

function Submit(props) {

    const [checked, setChecked] = useState()

    const handleClick = (e) => {
        e.preventDefault()
        props.location.pathname === '/placeorder' && props.history.push('/reviewcomplete')
        props.location.pathname === '/reviewcomplete' && props.postAnswers({ ...props.questions.post_data }, 'orders') && props.history.push('/orders')
        props.location.pathname === '/profile' && props.postAnswers({ ...props.questions.results, userId: props.auth.user._id }, 'profiles') && props.history.push('/orders')
    }
    return (
        <Segment>
            <Button onClick={(e) => handleClick(e)} color={checked ? 'green' : 'disabled'}>Submit</Button>
            {' '}
            <Segment>
                <Checkbox onClick={() => {
                    props.location.pathname === '/profile' &&
                        ['Profile', 'Customer Questions']
                            .map(e => props.questions.results &&
                                props.questions.results[e] &&
                                Object.keys(props.questions.results[e]).length !== 0 ?
                                true : false)
                            .every((e) => e) && setChecked(!checked)

                    props.location.pathname === '/placeorder' &&
                        ['Profile', 'Orders', 'Customer Questions']
                            .map(e => props.questions.results &&
                                props.questions.results[e] &&
                                Object.keys(props.questions.results[e]).length !== 0 ?
                                true : false)
                            .every((e) => e) && setChecked(!checked)

                    props.location.pathname === '/reviewcomplete' &&
                        ['Profile', 'Orders', 'Customer Questions']
                            .map(e => props.questions.results &&
                                props.questions.results[e] &&
                                Object.keys(props.questions.results[e]).length !== 0 ?
                                true : false)
                            .every((e) => e) && setChecked(!checked)

                }} label='I agree to the Terms and Conditions' />
            </Segment>
        </Segment>
    )
}

const mapStateToProps = state => {
    return {
        questions: state.questions,
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postAnswers: (obj, key) => dispatch(postAnswers(obj, key)),
        getAnswersById: (obj, key) => dispatch(getAnswersById(obj, key)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Submit)
