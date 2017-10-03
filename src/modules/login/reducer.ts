import * as actions from './actions';

//  Reducer code
export type LoginState = {
    isLoggingIn: boolean,
    isPartiallyLoggedIn: boolean,
    isLoggedIn: boolean,
    exception?: Error,
    accessToken?: string,
    loginId?: string,
};

export const initialState: LoginState = {
    isLoggedIn: false,
    isPartiallyLoggedIn: false,
    isLoggingIn: false
};

const reducer = (state: LoginState = initialState, action: actions.Action): LoginState => {
    switch (action.type) {
        case actions.types.SUBMIT_LOGIN_REQUEST:
            return {...state,
                isLoggingIn: true,
                isPartiallyLoggedIn: false,
                isLoggedIn: false,
                exception: undefined,
                accessToken: undefined,
                loginId: undefined,
            };
        case actions.types.SUBMIT_LOGIN_SUCCESS:
            return {...state,
                isLoggingIn: false,
                isPartiallyLoggedIn: false,
                isLoggedIn: true,
                accessToken: action.accessToken,
                loginId: action.loginId,
                exception: undefined,
            };
        case actions.types.SUBMIT_LOGIN_FAIL:
            return {...state,
                isLoggedIn: false,
                isPartiallyLoggedIn: false,
                isLoggingIn: false,
                exception: action.error,
                accessToken: undefined,
                loginId: undefined,
            };
        default:
            return state;
    }
};

export default reducer;