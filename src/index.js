import React from 'react';
import ReactDOM from 'react-dom';
import { CanduProvider } from '@candulabs/react-sdk';
// import bootstrapStyleguide from '@candulabs/react-bootstrapstyleguide'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import './index.css';
import App from './components/App';

ReactDOM.render(
	<Provider store={store}>
    	<CanduProvider
				clientToken='tu5pUaW7Lc'
				// styleguide={{
				// 	...bootstrapStyleguide,
				// }}
				userId='myUserId'
			>
				<Router>
					<App />
				</Router>
			</CanduProvider>
	</Provider>, 
  document.getElementById('root')
);
