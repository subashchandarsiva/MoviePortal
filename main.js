import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, Link ,hashHistory ,browserHistory } from 'react-router';
import About from './About.jsx';

injectTapEventPlugin();
ReactDOM.render(<MuiThemeProvider>
	<Router history={hashHistory}>
	    <Route path="/" component={App}/>
			<Route path="about/:id" component={About}/>
	  </Router>
	</MuiThemeProvider>, document.getElementById('app'));
