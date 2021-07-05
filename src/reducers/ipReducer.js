export const initialValue = {
    ipResponse: "",
    fetchingAddress: false
};

export default function ipReducer(state = initialValue, action) {
    switch (action.type) {
        case "GET_IP_ADDRESS_INFO_PENDING": {
            return {
                ...state,
                ipResponse: "",
                fetchingAddress: true
            }
        }
        case "GET_IP_ADDRESS_INFO_FULFILLED": {
            return {
                ...state,
                ipResponse: action.payload,
                fetchingAddress: false
            }
        }
        case "GET_IP_ADDRESS_INFO_REJECTED": {
            return {
                ...state,
                ipResponse: "",
                fetchingAddress: false
            }
        }
        default:
            return state;
    }
}