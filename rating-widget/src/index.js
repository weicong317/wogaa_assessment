import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import App from './App';

const WidgetDivs = document.querySelectorAll('.rating_widget');

WidgetDivs.forEach(Div => {
	ReactDOM.render(
		<React.StrictMode>
			<App domElement={Div} />
		</React.StrictMode>,
		Div,
	);
});
