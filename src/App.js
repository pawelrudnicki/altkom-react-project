import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./_app.scss";
import {compose} from "redux";
import {connect} from "react-redux";
import {getIpAddressInformation} from "./actions/ipActions";
import {Row, Col} from "react-bootstrap";
import MapLocation from "./components/map-location/MapLocation";
import InformationLocation from "./components/information-location/InformationLocation";
import _ from "lodash";
import SearchBox from "./components/search-box/SearchBox";
import SearchHistory from "./components/search-history/SearchHistory";

function mapStateToProps(state) {
    return {
        addressInformation: state.ip.ipResponse,
        loading: state.ip.fetchingAddress,
    }
}

class App extends React.Component {

    componentDidMount() {
        this.changeAddress();
    }

    getCurrentInformationLocation() {
        const {addressInformation} = this.props;
        return [
            {name: "City", value: _.get(addressInformation, "city", "")},
            {name: "Continent", value: _.get(addressInformation, "continent_name", "")},
            {name: "Country", value: _.get(addressInformation, "country_name", "")},
            {name: "Region", value: _.get(addressInformation, "region_name", "")},
            {name: "Zip", value: _.get(addressInformation, "zip", "")},
        ];
    }

    getCurrentCoords() {
        const {addressInformation} = this.props;
        return [_.get(addressInformation, "latitude", 0), _.get(addressInformation, "longitude", 0)];
    }

    getHistory() {
        if (Object.keys(sessionStorage) < 2) return [];
        return Object.entries(sessionStorage).slice().sort((a, b) => +a[0] - +b[0]).map((item) => {
            const data = JSON.parse(item[1]);
            return {
                time: +item[0],
                address: _.get(data, "address", ""),
                cords: _.get(data, "cords", ""),
                informations: [
                    {name: "City", value: _.get(data, "City", "")},
                    {name: "Continent", value: _.get(data, "Continent", "")},
                    {name: "Country", value: _.get(data, "Country", "")},
                    {name: "Region", value: _.get(data, "Region", "")},
                    {name: "Zip", value: _.get(data, "Zip", "")},
                ]
            }
        })
    }

    changeAddress = (address) => {
        this.props.dispatch(getIpAddressInformation(address));
    }

    render() {
        const {loading} = this.props;
        if (loading) return null;
        const currentCords = this.getCurrentCoords();
        const currentInformationLocation = this.getCurrentInformationLocation();
        const history = this.getHistory();
        const lastInformationLocation = _.get(_.last(history), "informations", []);
        return (
            <div className="App">
                <Row>
                    <Col xs={12} lg={2} className={"p-4"}>
                        <SearchHistory historyData={history}/>
                    </Col>
                    <Col xs={12} lg={10}>
                        <Row className="d-flex justify-content-center p-4">
                            <Col xs={12} lg={4}>
                                <MapLocation cords={currentCords}/>
                            </Col>
                            <Col xs={12} lg={4}>
                                <InformationLocation informations={currentInformationLocation}/>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-4 mb-4">
                            <Col xs={4}>
                                <SearchBox informations={currentInformationLocation} changeAddress={this.changeAddress}
                                           currentCords={currentCords}/>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center p-4">
                            <Col xs={12} lg={4}>
                                <MapLocation cords={_.get(_.last(history), "cords", [])}/>
                            </Col>
                            <Col xs={12} lg={4}>
                                <InformationLocation informations={lastInformationLocation}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps)
)(App);
