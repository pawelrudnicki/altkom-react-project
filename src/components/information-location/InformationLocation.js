import React from "react";

export default class InformationLocation extends React.Component {

    render() {
        const {informations} = this.props;
        return (
            <div className="border-info">
                {
                    informations.map((item) => (
                        <div className="d-flex flex-column">
                            <span>
                                <strong>{item.name}: </strong>
                                {item.value}
                            </span>
                        </div>
                    ))
                }
            </div>
        );
    }
}