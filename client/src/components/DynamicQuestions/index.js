import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// import { questions_keys } from './Data';
import DynamicQuestions from './DynamicQuestions'
import { addAnswersRequest, addAnswersToPost, getAnswersById, getProfiles } from './redux/thunks'
import {
    Button,
    Checkbox,
    Container,
    Grid,
    Select
} from 'semantic-ui-react'

function Display(props) {
    const [adminMode, setAdminMode] = useState(false)
    const [customerId, setCustomerId] = useState()
    const [qIndex, setQIndex] = useState(0)
    const [idOptions, setIdOptions] = useState([
        // { key: "604b9e69328de618f01fb181", value: "604b9e69328de618f01fb181", text: "604b9e69328de618f01fb181" },
    ])
    const questions_keys = props.questions_keys

    useEffect(() => {
        props.auth.user && props.getProfiles(props.auth.user._id, 'profiles')
    }, [props.auth])

    useEffect(() => {
        if (customerId) {
            // props.getAnswersById(customerId, 'Register')
            props.getAnswersById(customerId, 'Profile')
            props.getAnswersById(customerId, 'Customer Questions')
            // props.getAnswersById(customerId, 'Orders')
        }
    }, [customerId])

    useEffect(() => {
        const profiles = props.questions.results.profiles &&
            props.questions.results.profiles.map(e => {
                return {
                    value: e['_id'],
                    text: `${e['app_data']['Profile']['Street Address'] ? e['app_data']['Profile']['Street Address'].answer : ''} - ${e['app_data']['Profile']['Full Name'] ? e['app_data']['Profile']['Full Name'].answer : ''}`,
                    key: e['_id']
                }
            })
        setIdOptions(profiles)

        props.questions.results.profiles &&
            props.questions.results.profiles.length > 0 &&
            props.addAnswersToPost(props.questions.results.profiles[props.questions.results.profiles.length - 1].item.stripe.id, 'stripeCustId')

        props.questions.results.profiles &&
            props.questions.results.profiles.length > 0 &&
            setCustomerId(props.questions.results.profiles[props.questions.results.profiles.length - 1]['_id'])

    }, [props.questions.results.profiles])

    const adminModeDisplay = (<>
        <h1>Employee Administration Mode:</h1>
        <Button onClick={() => {
            props.getProfiles(props.auth.user._id, 'profiles')
        }} primary>
            Get
            </Button>
        <Select placeholder='Select' onChange={(e, { value }) => {
            setCustomerId(value)
            props.addAnswersToPost(props.questions.results.profiles.find(e => e._id === value).item.stripe.id, 'stripeCustId')
        }} options={idOptions} />

        <Container>
            <Grid columns={2} stackable>
                <Grid.Row columns={3}>
                    <Grid.Column width={5}>
                        {qIndex !== 0 ?
                            <Button onClick={() => setQIndex(qIndex - 1)} size='huge' primary>
                                Back
                            </Button> : null}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <h1 style={{ textAlign: 'center' }}>{questions_keys[qIndex]}</h1>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        {/* {qIndex < questions_keys.length - 1 ?
                            <Button onClick={() => setQIndex(qIndex + 1)} style={{ float: 'right' }} size='huge' primary>
                                Next
                            </Button> : null} */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    </>)

    return (
        <>
            {((props.location.pathname === '/placeorder' || props.location.pathname === '/profile') && props.auth.user) &&
                <Checkbox label='Employee Admin Mode' onChange={() => setAdminMode(!adminMode)} />}
            {adminMode && adminModeDisplay}
            <DynamicQuestions {...props} qIndex={qIndex} setQIndex={setQIndex} customerId={customerId} />
        </>
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
        addAnswersRequest: (obj, key) => dispatch(addAnswersRequest(obj, key)),
        addAnswersToPost: (obj, key) => dispatch(addAnswersToPost(obj, key)),
        getAnswersById: (obj, key) => dispatch(getAnswersById(obj, key)),
        getProfiles: (obj, key) => dispatch(getProfiles(obj, key)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Display)
