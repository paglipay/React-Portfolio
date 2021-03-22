import { questions_arry as q1 } from '../register/Data'
import { questions_arry as q2 } from '../profile/Data'
import { questions_arry as q3 } from '../CustomerQuestions/QuestionsData'
import { questions_arry as q4 } from '../orderform/FormData'

// hobbies = [
//   { question: "What's you favorit hobby?", type: "text" },
// {
//   question: 'Do you have a preferred time of delivery?',
//   type: "message",
//   condition: { property: "What's you favorit hobby?", value: ['Games'] }
// },
// ]

export const questions_keys = ['Register', 'Profile', 'Customer Questions', 'Order Form']
export const array_of_questions_arry = [q1, q2, q3, q4]

export const homeObjOne = {
  topLine: 'New Customer Questions',
  headline: 'Please Answer Questions',
  description: 'TEST DESCRIPTION',
  buttonLabel: 'Next',
  onClick: () => console.log('goto Qustion2'),
  onClickBack: () => console.log('goto Qustion2')
};
