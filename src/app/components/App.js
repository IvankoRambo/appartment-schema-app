import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ spec }) => ({
    spec
});

class App extends React.Component {
    render() {
        return (<div>
            This is a test
        </div>);
    }
}

export default connect(mapStateToProps)(App);
