import React from 'react';

import Room from './Room';
import InfoBar from './InfoBar';

class App extends React.Component {
    render() {
        return (<div className="app b-app">
            <h3 className="b-app-title">Room visualization</h3>
            <div className="b-app-info-bar-wrapper">
                <InfoBar />
            </div>
            <div className="b-app-room-wrapper">
                <Room />
            </div>
        </div>);
    }
}

export default App;
