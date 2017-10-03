import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';

// Mocking setups
jest.mock('../../../utilities/client');
const client = require('../../../utilities/client');
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('login actions', () => {
    it('1533-should create successful login actions', () => {
        client.__setClientLoginMockHandler((success, failure) => {success(); });
        client.__setClientMockHandler((success, failure) => {success(); });
        const expectedActions = [
            { type: 'SUBMIT_LOGIN_REQUEST' },
            { type: 'SUBMIT_LOGIN_SUCCESS' },
            { type: 'GET_USER_SUCCESS' }
        ];

        const store = mockStore({account: {}});
        return store.dispatch(actions.login())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            }
        );
    });

    it('1533-should create failed login actions', () => {
        client.__setClientLoginMockHandler((success, failure) => {success(); });
        client.__setClientMockHandler((success, failure) => {failure(); });
        const expectedActions = [
            { type: 'SUBMIT_LOGIN_REQUEST' },
            { type: 'SUBMIT_LOGIN_SUCCESS' },
            { type: 'GET_USER_FAILURE' }
        ];

        const store = mockStore({account: {}});
        return store.dispatch(actions.login())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            }
        );
    });

});
