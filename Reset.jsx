import React from 'react';
import Request from 'superagent';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

var movieInfo;
var temp=1;
class Reset extends React.Component {

	constructor(props)
	{
		super(props);
		this.handleClick = this.handleClick.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.handleNext = this.handleNext.bind(this);
	    this.handlePrev = this.handlePrev.bind(this);
		this.state = {textValue:'',array:[],page:1};
	}

	handleNext() 
	{
    	 temp++;
    	 this.setState({page:temp});
    	 this.handleClick();
  	}
  	handlePrev()
  	{
  		temp--;
  		this.setState({page:temp});
    	this.handleClick();

  	}
	handleChange(e)
	{
		this.setState({textValue:document.getElementById('movie').value});
	}
	handleClick()
	{
		var temp=[];
		this.setState({array:[]});
		Request.get("http://www.omdbapi.com/?s="+this.state.textValue+'&page=' +this.state.page).set('Accept', 'application/json')
		.end((err, res) => {
			if (res.status===200) {
				var searched = res.body.Search;				
				searched.forEach(function(item)
				{
					console.log(item);
					temp.push(<Card>
						<CardHeader title={item.Title}/>
						<CardMedia  style={{width:"400px",marginLeft:"35%"}}>
      							<img src={item.Poster} style={{height:"500px"}} />
    					</CardMedia>
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
        	<RaisedButton label="Prev" secondary={true}  onClick={this.handlePrev} style={{marginRight:"1%"}}/>
        	<TextField hintText="Search" id="movie" onChange={this.handleChange} style={{width:"70%"}}/>
        	<RaisedButton label="Search" secondary={true}  onClick={this.handleClick} style={{marginLeft:"1%"}}/>
        	<RaisedButton label="Next" secondary={true}  onClick={this.handleNext} style={{marginLeft:"1%"}}/>
        	{this.state.array}        	
         </div>
      );
   }
}

export default Reset;
