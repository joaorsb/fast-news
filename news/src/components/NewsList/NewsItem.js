import { Heading, Columns, Card, Media, Image, Content } from 'react-bulma-components'
const NewsItem = (props) => {
    const news = props.news
    const author = props.authors.filter((author) => { if (author.id === news.author_id) return author } ) 
    return (
        <Columns.Column size={4}>
            <Card style={{ width: 300, margin: 'auto' }}>
                <Card.Image
                    size="4by3"
                    src="http://bulma.io/images/placeholders/1280x960.png"
                />
                <Card.Content>
                    <Media>
                        <Media.Item renderAs="figure" align="left">
                            <Image
                            size={64}
                            alt="64x64"
                            src="http://bulma.io/images/placeholders/128x128.png"
                            />
                        </Media.Item>
                        <Media.Item>
                            <Heading size={4}>{news.title}</Heading>
                            <Heading subtitle size={6}>
                                {author[0].name}
                            </Heading>
                        </Media.Item>
                    </Media>
                    <Content>
                        {news.body.substr(0, 30)} ...
                        <br />
                    </Content>
                </Card.Content>
            </Card>
        </Columns.Column>  
    )
}

export default NewsItem;