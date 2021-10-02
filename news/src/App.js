import 'bulma/css/bulma.min.css';
import { useState } from 'react';

import { Container, Heading, Columns } from 'react-bulma-components'

import NewsContainer from './components/NewsList/NewsContainer';
import AuthorsList from './components/Authors/AuthorsList';
import AddAuthor from './components/Forms/AddAuthor';
import AddNews from './components/Forms/AddNews';

const FIXTURE_NEWS = [
  {
    "title": "This is the breaking news",
    "body": "An Absolutely great news!",
    "author_id": "6156faca3526c5414f8cf1ee",
    "created": "2021-10-01T12:24:41.751000",
    "updated": "2021-10-01T12:24:41.751000",
    "id": "6156fe36db0f6f2f6cab88cd"
  },
  {
    "title": "This is another news",
    "body": "An Absolutely great news!",
    "author_id": "6156faca3526c5414f8cf1ee",
    "created": "2021-10-01T12:24:41.751000",
    "updated": "2021-10-01T12:24:41.751000",
    "id": "6156fe3fdb0f6f2f6cab88ce"
  },
  {
    "title": "This is yet another",
    "body": "An Absolutely great news!",
    "author_id": "6156faca3526c5414f8cf1ee",
    "created": "2021-10-01T12:24:41.751000",
    "updated": "2021-10-01T12:24:41.751000",
    "id": "6156fe48db0f6f2f6cab88cf"
  },
  {
    "title": "This is from John",
    "body": "An Absolutely great news!",
    "author_id": "6156faca3526c5414f8cf1ee",
    "created": "2021-10-01T12:24:41.751000",
    "updated": "2021-10-01T12:24:41.751000",
    "id": "6156fe60db0f6f2f6cab88d0"
  },
  {
    "title": "This is the lorem",
    "body": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    "author_id": "6156faca3526c5414f8cf1ee",
    "created": "2021-10-02T15:25:03.948000",
    "updated": "2021-10-02T15:25:03.948000",
    "id": "61587a150f1a02f8cec6aa4a"
  },
  {
    "title": "This is the lorem",
    "body": "Lorem ipsum dolor sit amet. Qui ipsum ducimus eos nisi debitis At rerum labore aut consequatur galisum esse voluptas et dolore saepe et omnis accusantium. Et possimus maiores aut asperiores blanditiis hic mollitia deserunt qui alias dolor est minus voluptas. Magni harum non quaerat corporis eum tempora aliquid non voluptas provident est ullam quibusdam aut rerum repellendus. Qui reprehenderit numquam id veritatis harum ad voluptas deleniti eum inventore tempore. Aut voluptatem quis cum quos internos vel eligendi obcaecati ut distinctio galisum. Eos nesciunt corporis et nisi eligendi ad omnis mollitia qui omnis voluptatem!Et quia quod ad omnis praesentium est perferendis laudantium ut galisum corrupti ut nesciunt labore. Vel voluptates eveniet sed rerum eius 33 amet expedita aut dolores sint ex sint optio et aliquid doloribus sed sequi facere. Qui possimus dolor ea eveniet magni id ipsam voluptates et placeat Quis non officia recusandae rem voluptas dolores. Eum sapiente soluta qui earum dolor aut nulla consequatur. Non nihil libero et voluptas totam id magni aliquid ut nulla expedita eum quidem dolor. Non autem rerum eum odit atque ut explicabo iste sed illum repellat. Hic velit laboriosam sit atque commodi qui repellendus aperiam et laudantium rerum sit blanditiis ipsum. Ut aspernatur voluptates cum voluptate eius est nemo voluptates. Et deserunt velit rem magni accusantium aut natus dolore ut galisum deleniti. Qui minima blanditiis qui accusamus possimus eos veniam molestiae. Et odio omnis et autem nesciunt et asperiores excepturi et odit sunt 33 beatae voluptatem eum similique eius qui incidunt autem. Qui cumque optio quo illo minima est voluptas ratione et dolorem corrupti eum asperiores dolor eos provident dolor. Qui ratione laborum nam dolorem sunt aut dicta voluptas? Et enim eligendi et impedit voluptatem et magni maxime vel voluptatem quis.",
    "author_id": "6156faca3526c5414f8cf1ee",
    "created": "2021-10-02T15:27:19.907000",
    "updated": "2021-10-02T15:27:19.907000",
    "id": "61587ac2b979698b80b9645e"
  },
  {
    "title": "This is the lorem",
    "body": "Lorem ipsum dolor sit amet. Qui ipsum ducimus eos nisi debitis At rerum labore aut consequatur galisum esse voluptas et dolore saepe et omnis accusantium. Et possimus maiores aut asperiores blanditiis hic mollitia deserunt qui alias dolor est minus voluptas. Magni harum non quaerat corporis eum tempora aliquid non voluptas provident est ullam quibusdam aut rerum repellendus. Qui reprehenderit numquam id veritatis harum ad voluptas deleniti eum inventore tempore. Aut voluptatem quis cum quos internos vel eligendi obcaecati ut distinctio galisum. Eos nesciunt corporis et nisi eligendi ad omnis mollitia qui omnis voluptatem!Et quia quod ad omnis praesentium est perferendis laudantium ut galisum corrupti ut nesciunt labore. Vel voluptates eveniet sed rerum eius 33 amet expedita aut dolores sint ex sint optio et aliquid doloribus sed sequi facere. Qui possimus dolor ea eveniet magni id ipsam voluptates et placeat Quis non officia recusandae rem voluptas dolores. Eum sapiente soluta qui earum dolor aut nulla consequatur. Non nihil libero et voluptas totam id magni aliquid ut nulla expedita eum quidem dolor. Non autem rerum eum odit atque ut explicabo iste sed illum repellat. Hic velit laboriosam sit atque commodi qui repellendus aperiam et laudantium rerum sit blanditiis ipsum. Ut aspernatur voluptates cum voluptate eius est nemo voluptates. Et deserunt velit rem magni accusantium aut natus dolore ut galisum deleniti. Qui minima blanditiis qui accusamus possimus eos veniam molestiae. Et odio omnis et autem nesciunt et asperiores excepturi et odit sunt 33 beatae voluptatem eum similique eius qui incidunt autem. Qui cumque optio quo illo minima est voluptas ratione et dolorem corrupti eum asperiores dolor eos provident dolor. Qui ratione laborum nam dolorem sunt aut dicta voluptas? Et enim eligendi et impedit voluptatem et magni maxime vel voluptatem quis.",
    "author_id": "6156faca3526c5414f8cf1ee",
    "created": "2021-10-02T15:27:19.907000",
    "updated": "2021-10-02T15:27:19.907000",
    "id": "61566f9d226cdb7e91606dde"
  }
];
  
const FIXTURE_AUTHORS = [
  {
    "name": "Jane Doe",
    "email": "jdoe@example.com",
    "id": "6156faca3526c5414f8cf1ee"
  },
  {
    "name": "John Doe",
    "email": "joe@example.com",
    "id": "61566f9d226cdb7e91606dde"
  }
];

function App() {
  const [newsList, setNewsList] = useState(FIXTURE_NEWS)
  const [authors, setAuthors] = useState(FIXTURE_AUTHORS)

  const addAuthorHandler = (newAuthor) => {
      setAuthors(authorsState => {
       return [ newAuthor, ...authorsState] 
      })
  }

  const addNewsHandler = (newNews) => {
    setNewsList(newsListState => {
     return [ newNews, ...newsListState] 
    })
}

  return (
    <div className="" >
      <Container>
            <Columns>
                <Columns.Column>
                  <Heading size='1'>Daily news</Heading>
                </Columns.Column>
            </Columns>
            <Container>
              <Columns>

                <Columns.Column size={3}>
                  <AuthorsList authors={authors} />
                  <AddAuthor onAddAuthor={addAuthorHandler} />
                </Columns.Column>

                <Columns.Column >
                  <AddNews onAddNews={addNewsHandler} authors={authors}/>
                  <br/>
                  <NewsContainer newsList={newsList} authors={authors} />
                </Columns.Column>

              </Columns>
            </Container>        

        </Container>   
      
    </div>
  );
}

export default App;
