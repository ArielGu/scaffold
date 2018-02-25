import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import Timer from '../components/Timer';

const render=Component=>{
    ReactDOM.render(
        <AppContainer>
            <Timer />
        </AppContainer>
        ,document.getElementById('root'));

}

render(Timer);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('../components/Timer', () => {
      render(Timer)
    })
  }
ReactDOM.render(<Timer />,document.getElementById('root'));

