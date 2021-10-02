import { Columns } from 'react-bulma-components'
import NewsItem from './NewsItem';

const NewsContainer = (props) => {
    return (
      <Columns>
          { props.newsList.map(news => <NewsItem news={news} authors={props.authors} key={news.id}/> ) }
      </Columns> 
    );
}

export default NewsContainer;