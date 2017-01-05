import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import App from './App.jsx';
import Reset from './Reset.jsx';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class About extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {item:{},id:""};
  }
  componentWillMount(){
    var id = this.props.params.id;
    Request.get("http://www.omdbapi.com/?i="+id+"&plot=full&r=json").set('Accept', 'application/json')
		.end((err, res) => {
			if (res.status===200) {
        this.setState({
          item:res.body,
          id:id
        });
    		}
     else{
     	console.log("Not ok");
        return false;
      }
  });
  }
  render() {
    var item = this.state.item;
    return <div>
      <h1>Deatails for <i>{this.state.id}</i></h1>
      <Card>
    <CardHeader title={item.Title} />
      <CardMedia style={{width:"400px",marginLeft:"35%"}}>
              <img src={item.Poster} style={{height:"500px"}} />
        </CardMedia>
      <CardText>
            <strong>Actors</strong> : {item.Actors}<br/>
            <strong>Awards</strong> : {item.Awards}<br/>
            <strong>Country</strong> : {item.Country}<br/>
            <strong>Director</strong> : {item.Director}<br/>
            <strong>Genre</strong> : {item.Genre}<br/>
            <strong>Language</strong> : {item.Language}<br/>
            <strong>Metascore</strong> : {item.Metascore}<br/>
            <strong>Plot</strong> : {item.Plot}<br/>
            <strong>Rated</strong> : {item.Rated}<br/>
            <strong>Released</strong> : {item.Released}<br/>
            <strong>Runtime</strong> : {item.Runtime}<br/>
            <strong>Type</strong> : {item.Type}<br/>
            <strong>Writer</strong> : {item.Writer}<br/>
            <strong>Year</strong> : {item.Year}<br/>
            <strong>imdbRating</strong> : {item.imdbRating}<br/>
            <strong>imdbVotes</strong> : {item.imdbVotes}<br/>
        </CardText>
      </Card>
    </div>;
  }
}

export default About;
