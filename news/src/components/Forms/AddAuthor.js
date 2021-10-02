import { useState } from 'react'
import { Form, Block, Button } from 'react-bulma-components'

const AddAuthor = (props) => {
    const [enteredName, setEnteredName] = useState('')
    const [enteredEmail, setEnteredEmail] = useState('')

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value)
    }

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const author = {
            name: enteredName,
            email: enteredEmail,
            id: Math.random().toString(36).substr(2, 5)
        }
        props.onAddAuthor(author)
        setEnteredName('')
        setEnteredEmail('')

    }

    const cancelHandler = (event) => {
        event.preventDefault()
        setEnteredName('')
        setEnteredEmail('')
    }

    return (
        <form onSubmit={submitHandler} onCancel={cancelHandler}>
        <Block renderAs="fieldset">
            <Form.Field>
            <Form.Label>Nome</Form.Label>
            <Form.Control>
                <Form.Input placeholder="Nome" value={enteredName} onChange={nameChangeHandler}/>
            </Form.Control>
            </Form.Field>
            <Form.Field>
            <Form.Label>Email</Form.Label>
            <Form.Control>
                <Form.Input placeholder="E-mail" value={enteredEmail} onChange={emailChangeHandler}/>
            </Form.Control>
            </Form.Field>
            
        </Block>

        <Form.Field kind="group">
            <Form.Control>
                <Button color="link" colorVariant="light">
                    Cancel
                </Button>
            </Form.Control>
            <Form.Control>
                <Button color="link">Submit</Button>
            </Form.Control>
        </Form.Field>
        </form>
    )
}

export default AddAuthor