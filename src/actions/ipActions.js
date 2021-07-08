export function getIpAddressInformation(address = "79.186.213.87") {
    return function (dispatch, state) {
        dispatch({type: "GET_IP_ADDRESS_PENDING"});
        return fetch(`http://api.ipstack.com/${address}?access_key=81e4b051be5d5c421efad3cc439b7a2a&format=1`)
            .then((res) => res.json())
            .then((data) => dispatch({type: "GET_IP_ADDRESS_FULFILLED", payload: data}))
            .catch(() => dispatch({type: "GET_IP_ADDRESS_REJECTED"}))
    }
}