import React from 'react';
import ReactDOM from 'react-dom';
// import { CanduProvider } from '@candulabs/react-sdk';
// import bootstrapStyleguide from '@candulabs/react-bootstrapstyleguide'
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App/App';
import './index.css';

ReactDOM.render(
	<Provider store={store}>
    {/* <CanduProvider
			clientToken='tu5pUaW7Lc'
			// styleguide={{
			// 	...bootstrapStyleguide,
			// }}
			userId='myUserId'
		> */}
		<App />
		{/* </CanduProvider> */}
	</Provider>, 
  document.getElementById('root')
);
