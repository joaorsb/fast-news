import { useState } from 'react'
import { Form, Block, Button } from 'react-bulma-components'

const AddNews = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('')
    const [enteredBody, setEnteredBody] = useState('')
    const [enteredAuthor, setEnteredAuthor] = useState('')

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value)
    }

    const bodyChangeHandler = (event) => {
        setEnteredBody(event.target.value)
    }
    const authorChangeHandler = (event) => {
        setEnteredAuthor(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const news = {
            title: enteredTitle,
            body: enteredBody,
            author_id: enteredAuthor,
            id: Math.random().toString(36).substr(1, 10)
        }
        props.onAddNews(news)
        setEnteredTitle('')
        setEnteredBody('')
        setEnteredAuthor('')

    }

    const cancelHandler = (event) => {
        event.preventDefault()
        setEnteredTitle('')
        setEnteredBody('')
        setEnteredAuthor('')
    }

    return (
        <form onSubmit={submitHandler} onCancel={cancelHandler}>
            <Block renderAs="fieldset">
                <Form.Field>
                    <Form.Label>Title</Form.Label>
                    <Form.Control>
                        <Form.Input placeholder="Title" value={enteredTitle} onChange={titleChangeHandler}/>
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Body</Form.Label>
                    <Form.Control>
                        <Form.Textarea value={enteredBody} onChange={bodyChangeHandler}/>
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Label>
                        Select the Author
                    </Form.Label>
                    <Form.Control>
                        <Form.Select
                            onChange={authorChangeHandler}
                            value={enteredAuthor}>
                            <option value="">Escolha o autor</option>
                            { props.authors.map(author => <option value={author.id} key={author.id}>{author.name}</option>)}
                        </Form.Select>
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

export default AddNews