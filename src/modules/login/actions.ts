import * as client from '../../utilities/client';

export enum types {
    SUBMIT_LOGIN_REQUEST = 'login/SUBMIT_LOGIN_REQUEST',
    SUBMIT_LOGIN_SUCCESS = 'login/SUBMIT_LOGIN_SUCCESS',
    SUBMIT_LOGIN_FAIL = 'login/SUBMIT_LOGIN_FAIL',
}

//  Action definitions
export type SubmitLoginRequestAction = { type: types.SUBMIT_LOGIN_REQUEST };
function submitLoginRequest(): SubmitLoginRequestAction {
    return {
        type: types.SUBMIT_LOGIN_REQUEST
    };
}

export type SubmitLoginSuccessAction = { type: types.SUBMIT_LOGIN_SUCCESS, accessToken: string, loginId: string };
function submitLoginSuccess(accessToken: string, userId: string): SubmitLoginSuccessAction {
    return {
        type: types.SUBMIT_LOGIN_SUCCESS,
        accessToken: accessToken,
        loginId: userId
    };
}

export type SubmitLoginFailureAction = { type: types.SUBMIT_LOGIN_FAIL, error: Error };
function submitLoginFailure(error: Error): SubmitLoginFailureAction {
    return {
        type: types.SUBMIT_LOGIN_FAIL,
        error
    };
}

export const login = () => {
    return function (dispatch: Function) {
        dispatch(submitLoginRequest());
        return client.login(
            (accessToken: string, userId: string) => {
                dispatch(submitLoginSuccess(accessToken, userId));
            },
            (error: Error) => {
                dispatch(submitLoginFailure(error));
            }
        );
    };
};

export const logout = () => {
    return function (dispatch: Function) {
        return client.logout();
    };
};

//  Types for Actions contained in this file

export type Action =
    SubmitLoginRequestAction
  | SubmitLoginSuccessAction
  | SubmitLoginFailureAction;
