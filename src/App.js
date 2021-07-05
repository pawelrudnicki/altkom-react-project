import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./_app.scss";
import {compose} from "redux";
import {connect} from "react-redux";
import {getIpAddressInformation} from "./actions/ipActions";

function mapStateToProps(state) {
    return {
        addressInformation: state.ip.ipResponse,
        loading: state.ip.fetchingAddress,
    }
}

class App extends React.Component {

    componentDidMount() {
        this.props.dispatch(getIpAddressInformation());
    }

    render() {
        return (
            <div className="App">
                <h1>xD</h1>
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps)
)(App);
