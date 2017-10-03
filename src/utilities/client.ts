import 'whatwg-fetch';
import Oidc from 'oidc-client';

// Handle differences in configuration between the various servers
// In theory, this is determined at minification time, so the final
// code doesn't even  have the if check in it.
let identityServerUrl: string;
let webApiUrl: string;
let webClientUrl;
if (!process.env.REACT_APP_PUBLISH_DESTINATION) {
    // Configured to run locally
    identityServerUrl = 'https://localhost:5009'; // 'http://localhost:5009'; //
    webApiUrl = 'http://localhost:5005';
    webClientUrl = 'http://localhost:5000/';
} else if (process.env.REACT_APP_PUBLISH_DESTINATION === 'dev-server') {
    // Configured to run on the dev server
    identityServerUrl = 'https://localhost:5009'; // 'http://localhost:5009'; //
    webApiUrl = 'http://localhost:5005';
    webClientUrl = 'http://localhost:5000/';
} else {
    throw new Error(
        `INVALID REACT_APP_PUBLISH_DESTINATION (${process.env.REACT_APP_PUBLISH_DESTINATION}) - Check package.json`);
}

const identitySettings = {
    authority: identityServerUrl,
    client_id: 'WebClient',
    redirect_uri: webClientUrl,
    response_type: 'id_token token',
    scope: 'openid profile',
    post_logout_redirect_uri : webClientUrl,
    filterProtocolClaims: true,
    loadUserInfo: true
};

let userManager;
const getUserManager = () => {
    if (!userManager) {
        userManager = new Oidc.UserManager(identitySettings);
    }
    return userManager;
};
const getUser = (): Promise<Oidc.User> => {
    return new Promise((resolve, reject) => {
        getUserManager().getUser()
            .then((user: Oidc.User) => {
                if (user && !user.expired) {
                    resolve(user);
                } else {
                    getUserManager().signinRedirectCallback().then((user2: Oidc.User) => {
                        resolve(user2);
                    }).catch(() => {
                        getUserManager().signinRedirect();
                    });
                }
            })
            .catch(e => {
                reject(e);
            });
    });
};

/**
 * API success callback with response
 * @callback responseSuccessCallback
 * @param {Object} response The data returned from the server.
 */

/**
 * API success callback with no response
 * @callback noResponseSuccessCallback
 */

/**
 * API failure callback
 * @callback failureCallback
 * @param {Error} ex The error returned.
 */

/**
 * Retrieves data from the WebAPI's specified REST endpoint
 * 
 * @param {string} url The REST endpoint from which to retrieve the data.
 * @param {responseSuccessCallback} successHandler The function called on a successful result.
 * @param {failHandler} failHandler The function called if the request fails.
 */
export const getRequest = (
    url: string,
    successHandler: (response: Object) => void,
    failHandler: (ex: Error) => void
) => {
    getUser()
        .then((user) => {
            let requestHeaders = {
                'Accept': 'application/json; charset=utf-8'
            };
            // If there is a logged in user, add the bearer token to the request headers.
            if (user) {
                requestHeaders = Object.assign({}, requestHeaders, {
                    Authorization: 'Bearer ' + user.access_token
                });
            }

            // Issue the request and handle the results.
            fetch(webApiUrl + url, {
                headers: requestHeaders
            })
                .then(checkStatus)
                .then(parseJson)
                .then(successHandler)
                .catch(failHandler);
        });
};

/**
 * Creates new data using the WebAPI's specified REST endpoint
 * 
 * @param {string} url The REST endpoint to use for creating data.
 * @param {Object} data The object to post to 
 * @param {responseSuccessCallback} successHandler The function called on a successful result.
 * @param {failHandler} failHandler The function called if the request fails.
 */
export const postRequest = (
    url: string,
    data: Object,
    successHandler: (response: Object) => void,
    failHandler: (ex: Error) => void
) => {
    getUser()
        .then((user) => {
            let requestHeaders = {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            };
            // If there is a logged in user, add the bearer token to the request headers.
            if (user) {
                requestHeaders = Object.assign({}, requestHeaders, {
                    Authorization: 'Bearer ' + user.access_token
                });
            }

            // Issue the request and handle the results.
            fetch(webApiUrl + url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: requestHeaders
            })
                .then(checkStatus)
                .then(parseJson)
                .then(successHandler)
                .catch(failHandler);
        });
};

/**
 * Updates existing data using the WebAPI's specified REST endpoint
 * 
 * @param {string} url The REST endpoint to use for updating data.
 * @param {Object} data The object to update
 * @param {noResponseSuccessCallback} successHandler The function called on a successful result.
 * @param {failHandler} failHandler The function called if the request fails.
 */
export const putRequest = (
    url: string,
    data: Object,
    successHandler: (respone: Object) => void,
    failHandler: (ex: Error) => void
) => {
    getUser()
        .then((user) => {
            let requestHeaders = {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            };
            // If there is a logged in user, add the bearer token to the request headers.
            if (user) {
                requestHeaders = Object.assign({}, requestHeaders, {
                    Authorization: 'Bearer ' + user.access_token
                });
            }

            // Issue the request and handle the results.
            fetch(webApiUrl + url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: requestHeaders
            })
                .then(checkStatus)
                .then(parseJson)
                .then(successHandler)
                .catch(failHandler);
        });
};

/**
 * Deletes an object using the WebAPI's specified REST endpoint
 * 
 * @param {string} url The REST endpoint to use for deleting the object.
 * @param {noResponseSuccessCallback} successHandler The function called on a successful result.
 * @param {failHandler} failHandler The function called if the request fails.
 */
export const deleteRequest = (
    url: string,
    successHandler: (response: Object) => void,
    failHandler: (ex: Error) => void
) => {
    getUser()
        .then((user) => {
            let requestHeaders = {
                Accept: 'application/json'
            };
            // If there is a logged in user, add the bearer token to the request headers.
            if (user) {
                requestHeaders = Object.assign({}, requestHeaders, {
                    Authorization: 'Bearer ' + user.access_token
                });
            }

            // Issue the request and handle the results.
            fetch(webApiUrl + url, {
                method: 'DELETE',
                headers: requestHeaders
            })
                .then(checkStatus)
                .then(parseJson)
                .then(successHandler)
                .catch(failHandler);
        });
};

/**
 * Retrieves data from an external REST endpoint
 * 
 * @param {string} url The REST endpoint from which to retrieve the data.
 * @param {responseSuccessCallback} successHandler The function called on a successful result.
 * @param {failHandler} failHandler The function called if the request fails.
 */
export const externalGetRequest = (
    url: string,
    successHandler: (response: Object) => void,
    failHandler: (ex: Error) => void
): void => {
        let requestHeaders = {
            'Accept': 'application/json; charset=utf-8'
        };

        // Issue the request and handle the results.
        fetch(url, {
            headers: requestHeaders
        })
            .then(checkStatus)
            .then(parseJson)
            .then(successHandler)
            .catch(failHandler);
};

/**
 * Check the status of a server response and throw an error if the status is bad.
 * @param {Response} response The response returned from the server.
 */
function checkStatus(response: Response) {
    if (response.ok) {
        return Promise.resolve(response);
    }
    return response.text().then((text) => {
        const json = text ? JSON.parse(text) : {};
        const error = new Error(json.message || response.statusText);
        return Promise.reject(error);
    });
}

/**
 * Parse the json recieved from a response into a javascript object.
 * @param {Response} response The response returned from the server.
 */
function parseJson(response: Response) {
    if (response.status !== 204) {
        return response.json();
    }
    return {};
}

/**
 * Login success callback
 * @callback loginSuccessCallback
 * @param {string} accessToken The access token to use for subsequent API requests
 * @param {failHandler} ex Called if there is a failure logging in.
 */

/**
 * Check to see if the user is logged in, and if not, redirect
 * to the login website.
 */
export const login = (
    successHandler: (accessToken: string, userId: string) => void,
    failHandler: (ex: Error) => void
) => {
    getUser()
        .then((user: Oidc.User) => {
            successHandler(user.access_token, user.profile.sub);
        })
        .catch(failHandler);
};

/**
 * Log the current user out.  Will also redirect to the login page.
 */
export const logout = function() {
    getUserManager().signoutRedirect();
};
