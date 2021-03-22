import React, { useState, useEffect, createRef } from 'react';
import Layout from '../semantic_ui/ResponsiveLayout/Layout2';
import Layout2a from '../semantic_ui/ResponsiveLayout/Layout2a';
import { dynamicForm } from '../dynamicform/dynamicform'
import Answers from './Answers/Answers'
import Submit from './Submit'
import { restructureQuestionsForPost } from './helperFunctions'

function DynamicQuestions(props) {
  const { homeObjOne, array_of_questions_arry, questions_keys, customerId } = props;

  const [arrayOfQuestionsArry, setArrayOfQuestionsArry] = useState(array_of_questions_arry)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [homeObjOneD, setHomeObjOneD] = useState(homeObjOne)
  const [questionsPost, setQuestionsPost] = useState({})

  homeObjOne.onClick = () => {
    if (arrayOfQuestionsArry[props.qIndex].length > questionIndex + 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      console.log('Submit', questionsPost, questions_keys[props.qIndex])
      props.addAnswersToPost(restructureQuestionsForPost(questionsPost), questions_keys[props.qIndex])
      props.addAnswersRequest(questionsPost, questions_keys[props.qIndex])
      setQuestionsPost({})
      setQuestionIndex(0)
      // props.history.push('/reviewcomplete')

      if (questions_keys.length - 1 > props.qIndex) {
        props.setQIndex(props.qIndex + 1)
      }
    }
  }

  homeObjOne.onClickBack = () => {
    if (questionIndex !== 0) {
      setQuestionIndex(questionIndex - 1)
    } else {
      console.log('Submit', questionsPost)
    }
  }

  useEffect(() => {
    setHomeObjOneD({
      ...homeObjOne,
      questionIndex,
      buttonLabel: arrayOfQuestionsArry[props.qIndex].length === questionIndex + 1 ? 'Review / Complete' : 'Next',
      description: dynamicForm(props, arrayOfQuestionsArry[props.qIndex][questionIndex]['questions'], setQuestionsPost, questionsPost, arrayOfQuestionsArry[props.qIndex][questionIndex]['headline']),
      headline: arrayOfQuestionsArry[props.qIndex][questionIndex]['headline'],
    })
  }, [questionIndex, questionsPost]);

  useEffect(() => {
    props.questions &&
      props.questions.results &&
      props.questions.results[questions_keys[props.qIndex]] &&
      setQuestionsPost(props.questions.results[questions_keys[props.qIndex]])


  }, [props.questions]);

  useEffect(() => {
    setQuestionsPost({})
    setQuestionIndex(0)
    if (customerId) {
      props.getAnswersById(customerId, questions_keys[props.qIndex])
    }
  }, [props.qIndex]);

  return (
    <>
      { (props.match.path === '/reviewcomplete' || props.match.path === '/orders') ? (<Layout {...props} activeStep={props.match.path === '/orders' ? 2 : 1} contextRef={createRef} key={props.qIndex} {...homeObjOneD} right_side={<><Answers key='a1' {...props} data={['Profile']} />

        {props.match.path !== '/orders' && <Submit {...props} />}

      </>}>
        <Answers key='a2' {...props}
          data={[
            'Orders',
            'Customer Questions']}
        />
        <br /><br />
      </Layout>) : (<>
        <Layout2a {...props} contextRef={createRef} key={props.qIndex} {...homeObjOneD} right_side={<>
          {/* <Submit {...props} /> */}
          <Answers key='a3' {...props}
            data={props.questions_keys}
          /></>}>
          {homeObjOneD.description}

        </Layout2a>
      </>)
      }
    </>
  );
}

export default DynamicQuestions;
