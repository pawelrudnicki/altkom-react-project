import React from "react";

export default class SearchHistory extends React.Component {
    render() {
        const {historyData = []} = this.props;
        return (
            <div>
                {
                    historyData.map((item, index) =>
                        <div className="d-flex" key={index}>
                            {new Date(item.time).toDateString()}
                            <span>Address: <strong>{item.address}</strong></span>
                        </div>
                    )
                }
            </div>
        );
    }
}