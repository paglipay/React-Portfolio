// import { Form } from 'react-bootstrap';
import {
    Button,
    Card,
    Form,
    Image,
    Icon
} from 'semantic-ui-react'

//import DTF from '../../DynamicTable/DynamicTableForm'

// const isValidZip = (zip) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);

const CardExampleCard = () => (
    <Card>
        <Image src='/images/avatar/large/elliot.jpg' wrapped ui={false} />
        <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
                <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
                Matthew is a musician living in Nashville.
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
          22 Friends
        </a>
        </Card.Content>
    </Card>
)

const CardExampleGroups = () => (
    <Card.Group>
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='/images/avatar/large/steve.jpg'
                />
                <Card.Header>Steve Sanders</Card.Header>
                <Card.Meta>Friends of Elliot</Card.Meta>
                <Card.Description>
                    Steve wants to add you to the group <strong>best friends</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
            </Button>
                    <Button basic color='red'>
                        Decline
            </Button>
                </div>
            </Card.Content>
        </Card>
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='/images/avatar/large/molly.png'
                />
                <Card.Header>Molly Thomas</Card.Header>
                <Card.Meta>New User</Card.Meta>
                <Card.Description>
                    Molly wants to add you to the group <strong>musicians</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
            </Button>
                    <Button basic color='red'>
                        Decline
            </Button>
                </div>
            </Card.Content>
        </Card>
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='/images/avatar/large/jenny.jpg'
                />
                <Card.Header>Jenny Lawrence</Card.Header>
                <Card.Meta>New User</Card.Meta>
                <Card.Description>
                    Jenny requested permission to view your contact details
          </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
            </Button>
                    <Button basic color='red'>
                        Decline
            </Button>
                </div>
            </Card.Content>
        </Card>
    </Card.Group>
)

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]
export const DynamicForm = (questions, setPostData, postData, qIndex = 0, elRefs) => {
    const value = 'sm'
    return (<>
        <Form>
            <Form.Group widths='equal'>
                <Form.Input fluid label='First name' placeholder='First name' />
                <Form.Input fluid label='Last name' placeholder='Last name' />
                <Form.Select
                    fluid
                    label='Gender'
                    options={options}
                    placeholder='Gender'
                />
            </Form.Group>
            <Form.Group inline>
                <label>Size</label>
                <Form.Radio
                    label='Small'
                    value='sm'
                    checked={value === 'sm'}
                    // onChange={this.handleChange}
                />
                <Form.Radio
                    label='Medium'
                    value='md'
                    checked={value === 'md'}
                    // onChange={this.handleChange}
                />
                <Form.Radio
                    label='Large'
                    value='lg'
                    checked={value === 'lg'}
                    // onChange={this.handleChange}
                />
            </Form.Group>
            <Form.TextArea label='About' placeholder='Tell us more about you...' />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Form.Button>Submit</Form.Button>
        </Form>
    </>)
}

