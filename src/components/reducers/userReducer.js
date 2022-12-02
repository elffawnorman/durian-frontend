
export function userReducer(state = null, action) {
    switch (action.type) {
        case "LOGIN":
            return action.payload;
        case "LOGOUT":
            localStorage.clear()
            return action.payload;
        default:
            return state;
 

    }
}


//ยังไม่ใช้งาน
export function userDetailReducer(state = { user: {} }, action) {
    switch (action.type) {
        case "USER_DETAIL_REQUEST":
            return { ...state, loading: true };
        case "USER_DETAIL_SUCCESS":
            return { ...state, loading: false, user: action.payload };
        case "USER_DETAIL_FAIL":
            return { ...state, loading: false, error: action.payload };
        case "USER_DETAIL_RESET":
            return { user: {} };
        default:
            return state;


    }
}