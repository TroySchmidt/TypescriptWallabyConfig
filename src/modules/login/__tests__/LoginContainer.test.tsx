import 'jsdom-global/register';
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { LoginContainer } from '../components/LoginContainer';

describe('Login control rendering', () => {
    const onLogin = jest.fn();
    const onLogout = jest.fn();
    const children = <div key="child" />;

    it('1533-displays application when logged in value', () => {
        let wrapper = shallow(
            <LoginContainer
                isLoggedIn={true}
                isLoggingIn={false}
                onLogin={onLogin}
                onLogout={onLogout}
                children={children}
            />
        );
        var name = wrapper.find({name: 'child'});
        expect(name.length).toEqual(1);
    });

    it('1533-displays does not display application when not logged in value', () => {
        let wrapper = shallow(
            <LoginContainer
                isLoggedIn={false}
                isLoggingIn={true}
                onLogin={onLogin}
                onLogout={onLogout}
                children={children}
            />
        );
        var name = wrapper.find({name: 'child'});
        expect(name.length).toEqual(0);
    });
});

describe('Login control mounting', () => {
    const onLogin = jest.fn();
    const onLogout = jest.fn();

    it('1533-mounts the login control', () => {
        mount(
            <LoginContainer
                isLoggedIn={true}
                isLoggingIn={false}
                onLogin={onLogin}
                onLogout={onLogout}
            />
        );
        expect(onLogin).toHaveBeenCalledTimes(1);
    });
});

// describe('Contact State Mapping', () => {
//     it('maps state to properties', () => {
//         const initialEmail='timsmith@mymail.org';
//         const initialPhoneNumber='256-555-1212';
//         const email='johndoe@something.com';
//         const phoneNumber='615-555-1212';
//         const state = {
//             currentUser: {
//                 userDetails: {
//                     email: initialEmail,
//                     phoneNumber: initialPhoneNumber,
//                 }
//             },
//             account: {
//                 contactForm: {
//                     email: email,
//                     phoneNumber: phoneNumber
//                 },
//             }
//         }
//         const expectedProperties = {
//             email: email,
//             phoneNumber: phoneNumber,
//             initialEmail: initialEmail,
//             initialPhoneNumber: initialPhoneNumber,
//             isSaving: false
//         }
//         expect(mapStateToContactEditorProps(state)).toEqual(expectedProperties);
//     });

//     it('maps state to properties with form saving', () => {
//         const initialEmail='timsmith@mymail.org';
//         const initialPhoneNumber='256-555-1212';
//         const email='johndoe@something.com';
//         const phoneNumber='615-555-1212';
//         const state = {
//             currentUser: {
//                 userDetails: {
//                     email: initialEmail,
//                     phoneNumber: initialPhoneNumber,
//                 }
//             },
//             account: {
//                 contactForm: {
//                     formState: 'SAVING',
//                     email: email,
//                     phoneNumber: phoneNumber
//                 },
//             }
//         }
//         const expectedProperties = {
//             email: email,
//             phoneNumber: phoneNumber,
//             initialEmail: initialEmail,
//             initialPhoneNumber: initialPhoneNumber,
//             isSaving: true
//         }
//         expect(mapStateToContactEditorProps(state)).toEqual(expectedProperties);
//     });

//     it('handles missing user information', () => {
//         const initialEmail='timsmith@mymail.org';
//         const initialPhoneNumber='256-555-1212';
//         const email='johndoe@something.com';
//         const phoneNumber='615-555-1212';
//         const state = {
//             currentUser: {
//             },
//             account: {
//                 contactForm: {
//                     email: email,
//                     phoneNumber: phoneNumber
//                 },
//             }
//         }
//         const expectedProperties = {
//             email: email,
//             phoneNumber: phoneNumber,
//             initialEmail: '',
//             initialPhoneNumber: '',
//             isSaving: false
//         }
//         expect(mapStateToContactEditorProps(state)).toEqual(expectedProperties);
//     });
// });
