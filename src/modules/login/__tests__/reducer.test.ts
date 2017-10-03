import reducer from '../reducer';
import * as actions from '../actions';

const mockToken = 'MOCK-TOKEN';
const mockLoginId = '123456789';

describe('currentUser reducer', () => {
    it('1533-should handle a login request action', () => {
        const expectedState = {
            isLoggedIn: false,
            isLoggingIn: true,
            isPartiallyLoggedIn: false
        };
        expect(reducer(undefined, {type: actions.types.SUBMIT_LOGIN_REQUEST})).toEqual(expectedState);
    });

    it('1533-should handle login response success action', () => {
        const expectedState = {
            isLoggedIn: false,
            isLoggingIn: false,
            isPartiallyLoggedIn: true,
            accessToken: mockToken,
            loginId: mockLoginId
        };
        let currentState = reducer(
            undefined,
            {type: actions.types.SUBMIT_LOGIN_REQUEST, userName: 'userName', password: 'password'} as actions.Action
        );
        currentState = reducer(
            currentState,
            {type: actions.types.SUBMIT_LOGIN_SUCCESS, accessToken: mockToken, loginId: mockLoginId}
        );
        expect(currentState).toEqual(expectedState);
    });

    it('1533-should handle login response failure action', () => {
        const error = new Error('error message');
        const expectedState = {
            isLoggedIn: false,
            isLoggingIn: false,
            isPartiallyLoggedIn: false,
            exception: error
        };
        let currentState = reducer(
            undefined,
            {type: actions.types.SUBMIT_LOGIN_REQUEST, userName: 'userName', password: 'password'} as actions.Action
        );
        currentState = reducer(
            currentState,
            {type: actions.types.SUBMIT_LOGIN_FAIL, error: error} as actions.Action
        );
        expect(currentState).toEqual(expectedState);
    });
});