import { Columns, Heading } from 'react-bulma-components'
import Author from './Author'

const AuthorsList = (props) => {
    return (
        <Columns>
            <Heading size='3'>Authors</Heading>
            { props.authors.map(author => <Author author={author} key={author.id} /> ) }
        </Columns>
    )
}

export default AuthorsList;