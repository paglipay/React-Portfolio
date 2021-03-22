import { Form } from 'react-bootstrap';
import {
  Button,
  Card,
  Dropdown,
  Image,
  Icon
} from 'semantic-ui-react'

import DTable from '../DynamicTable/DynamicTable'
import DTF from '../DynamicTable/DynamicTableForm'
import SubmitButton from '../DynamicQuestions/Submit'
import DForm from './DForm'
export const dynamicForm = (props, questions, setPostData, postData, qIndex = 0, elRefs) => <>
  <Form>
    {questions.map((q, i) => {
      if (q.hasOwnProperty('condition') === false || postData.hasOwnProperty(q.condition.property) &&
        postData[q.condition.property].hasOwnProperty('answer') &&
        q.condition.value.includes(postData[q.condition.property].answer)) {
        if (q.type === 'y/n') {
          return (<>
            <Form.Group controlId={`formBasicUsername${i}`}>
              <Form.Label>{q.question} </Form.Label>
              <Form.Check onChange={(e) => {
                console.log(e.target.name, e.target.value)
                setPostData({ ...postData, [e.target.name]: { answer: "Yes", qIndex, id: q.id } })
              }}
                name={`${q.question}`}
                key={`${q.question}_yes`}
                type="radio"
                id={`default-radio_yes`}
                label={`Yes`}
                checked={(postData[q.question] && postData[q.question].answer ? postData[q.question].answer : null) === 'Yes'}
              />

              <Form.Check onChange={(e) => {
                console.log(e.target.name, e.target.value)
                setPostData({ ...postData, [e.target.name]: { answer: "No", qIndex, id: q.id } })
              }}
                name={`${q.question}`}
                key={`${q.question}_no`}
                type="radio"
                label={`No`}
                id={`default-radio_no`}
                checked={(postData[q.question] && postData[q.question].answer ? postData[q.question].answer : null) === 'No'}
              />

              <Form.Text className="">
                Please enter a memorable answer.
                            </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'table') {
          return (<>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <Form.Label>{q.question} </Form.Label>
              <DTable headers={['key','text', 'value']} data={
                [
                  { key: '8:00', text: '8:00', value: '8:00' },
                  { key: '10:00', text: '10:00', value: '10:00' },
                ]} 
                />
                <DForm />
              <Form.Text className="">
                Please enter a memorable answer.
                            </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'dropdown') {
          return (<>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <Form.Label>{q.question} </Form.Label>
              <Dropdown onChange={(e, { value }) => console.log('Dropdown: ', value)} placeholder='Skills' fluid multiple selection options={
                [
                  { key: '8:00', text: '8:00', value: '8:00' },
                  { key: '10:00', text: '10:00', value: '10:00' },
                  // { key: '12:00', text: '12:00', value: '12:00' },
                  // { key: '12:00', text: '12:00', value: '12:00' },
                ]} 
                />
              <Form.Text className="">
                Please enter a memorable answer.
                            </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'select') {
          return (<>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <Form.Label>{q.question} </Form.Label>
              <Form.Control as="select" name={q.question} onChange={(e) => {
                console.log(e.target.name, e.target.value)
                setPostData({ ...postData, [e.target.name]: { answer: e.target.value, qIndex, id: q.id } })
              }}>
                <option>Default select</option>
                {q.options.map(e => <option value={e.id} selected={(postData[q.question] && postData[q.question].answer === e.id ? true : false)} >{e.value}</option>)}
              </Form.Control>
              <Form.Text className="">
                Please enter a memorable answer.
                            </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'submit_button') {
          return (<>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <Form.Label>{q.question} </Form.Label>
              <br />
              <SubmitButton {...props} />

              <Form.Text className="">
                Please enter a memorable answer.
                            </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'message') {
          return (<>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <Form.Label><h2>{q.question}</h2></Form.Label>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'button') {
          return (<>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <Button onClick={(e) => {
                e.preventDefault()
                q.onClick()
              }
              }>{q.name}</Button>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'dtf') {
          return (<>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <Form.Label><h2>{q.question}</h2></Form.Label>
              <DTF />
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'week') {
          return (<>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <Form.Label>{q.question} </Form.Label>
              <Form.Control onChange={(e) => {
                console.log(e.target.name, e.target.value)
                setPostData({ ...postData, [e.target.name]: { answer: e.target.value, qIndex, id: q.id } })
              }} name={q.question} type="week" placeholder="Enter Day of Week" />
              <Form.Text className="">
                Please enter a memorable answer.
                            </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'datetime') {
          return (<>
            <Form.Label>{q.question} </Form.Label>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <br />
              <span style={{ float: 'left' }}>
                <Form.Control style={{ float: 'left' }} onChange={(e) => {
                  console.log(e.target.name, e.target.value)
                  setPostData({ ...postData, [e.target.name]: { answer: e.target.value, qIndex, id: q.id } })
                }} name={q.question} type="date" placeholder="Enter Date" />
              </span>
              <span style={{ float: 'left' }}>
                <Form.Control style={{ float: 'left' }} onChange={(e) => {
                  console.log(e.target.name, e.target.value)

                  setPostData({ ...postData, [e.target.name]: { answer: e.target.value, qIndex, id: q.id } })
                }} name={q.question} type="time" placeholder="Enter Date" />
              </span>
              <Form.Text className="">
                <br />
              </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'date') {
          return (<>
            <Form.Label>{q.question} </Form.Label>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <br />
              <span style={{ float: 'left' }}>
                <Form.Control style={{ float: 'left' }} onChange={(e) => {
                  console.log(e.target.name, e.target.value)
                  setPostData({ ...postData, [e.target.name]: { answer: e.target.value, qIndex, id: q.id } })
                }} name={q.question} type="date" placeholder="Enter Date" />
              </span>
              <Form.Text className="">
                <br />
              </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'time') {
          return (<>
            <Form.Label>{q.question} </Form.Label>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <br />
              <span style={{ float: 'left' }}>
                <Form.Control style={{ float: 'left' }} onChange={(e) => {
                  console.log(e.target.name, e.target.value)

                  setPostData({ ...postData, [e.target.name]: { answer: e.target.value, qIndex, id: q.id } })
                }} name={q.question} type="time" placeholder="Enter Date" />
              </span>
              <Form.Text className="">
                <br />
              </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'text') {
          return (<>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <Form.Label>{q.question} </Form.Label>
              <Form.Control onChange={(e) => {
                console.log(e.target.name, e.target.value)
                setPostData({ ...postData, [e.target.name]: { answer: e.target.value, qIndex, id: q.id } })
              }} name={q.question} key={q.question} type="text" placeholder="Enter Text" value={postData[q.question] ? (postData[q.question].answer ? postData[q.question].answer : null) : null} />
              <Form.Text className="">
                Please enter a memorable answer.
                            </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
        else if (q.type === 'pass') {
          return (<>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <Form.Label>{q.question} </Form.Label>
              <Form.Control onChange={(e) => {
                console.log(e.target.name, e.target.value)
                setPostData({ ...postData, [e.target.name]: { answer: e.target.value, qIndex, id: q.id } })
              }} name={q.question} key={q.question} type="password" placeholder="Enter Text" />
              <Form.Text className="">
                Please enter a memorable answer.
                            </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
        else {
          return (<>
            <Form.Group controlId={`formBasicUsername${q.question}${i}`}>
              <Form.Label>{q.question} </Form.Label>
              <Form.Control onChange={(e) => {
                console.log(e.target.name, e.target.value)
                setPostData({ ...postData, [e.target.name]: { answer: e.target.value, qIndex, id: q.id } })
              }} name={q.question} as="textarea" rows={4}
                value={postData[q.question] ? (postData[q.question].answer ? postData[q.question].answer : null) : null} />
              <Form.Text className="">
                Please enter a memorable answer.
                            </Form.Text>
            </Form.Group>
            <br />
          </>)
        }
      }
    })}
  </Form>
</>