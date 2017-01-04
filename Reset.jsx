import React from 'react';
import Request from 'superagent';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


var movieInfo;
class Reset extends React.Component {

	constructor(props)
	{
		super(props);
		this.handleClick = this.handleClick.bind(this);
	    this.handleChange = this.handleChange.bind(this);
		this.state = {textValue:'',array:[]};
	}

	handleChange(e)
	{
		this.setState({textValue:document.getElementById('movie').value});
	}
	handleClick()
	{
		var temp=[];
		Request.get("http://www.omdbapi.com/?s="+this.state.textValue).set('Accept', 'application/json')
		.end((err, res) => {
			if (res.status===200) {
				var searched = res.body.Search;

				
				searched.forEach(function(item)
				{
					console.log(item);
					temp.push(<Card>
						<CardHeader title={item.Title}/>
						<CardText>
      						Type : {item.Type}<br/><br/>
      						Release Year :{item.Year}
    					</CardText>
							</Card>);
				})
				
    		}
     else{
     	console.log("Not ok");
        return false;
      }
      this.setState({array:temp});
  });
		}
   render() {

      return (
        <div>
        	<AppBar title="Movies Infinity" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        	<TextField hintText="Search" id="movie" onChange={this.handleChange} style={{width:"80%"}}/>
        	<RaisedButton label="Search" secondary={true}  onClick={this.handleClick} style={{marginLeft:"1%"}}/>
        	{this.state.array}
         </div>
      );
   }
}

export default Reset;
