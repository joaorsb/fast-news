import { Columns, Card, Media, Heading } from 'react-bulma-components'

const Author = (props) => {
    return (
        <Columns.Column>
            <Card style={{ width: 200, margin: 'auto' }}>
                <Card.Content>
                    <Media>
                        <Media.Item>
                            <Heading size={6}>{props.author.name}</Heading>
                        </Media.Item>
                    </Media>
                </Card.Content>
            </Card>
        </Columns.Column>  
    )
}

export default Author;