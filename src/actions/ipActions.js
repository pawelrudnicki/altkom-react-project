export function getIpAddressInformation(address) {
    return function (dispatch, state) {
        dispatch({
            type: "GET_IP_ADDRESS",
            payload: fetch("http://api.ipstack.com/79.186.213.87?access_key=81e4b051be5d5c421efad3cc439b7a2a&format=1").catch(err => console.log("XD", err))
        })
    }
}