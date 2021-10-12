import * as React from "react";
import {
    subscribeToExtensionMessages, subscribeToWindowMessages,
    sendMessageToBackgroundAndPopup, sendMessageToContent,
} from "../helpers/messaging";
import { MessageType } from '../types/types'

import { Login } from "../components/Login";

import "./PopupInfo.css";
import { useEffect, useState } from "react";



// todo - extract
let name = "";
const manifest = chrome.runtime.getManifest();
if (manifest && manifest.name && manifest.version) {
    name = `${manifest.name} v. ${manifest.version}`
}
else {
    name = "";
}







const PopupWindow = () => {

    // @ts-ignore
    const getRedirect = (): string | false => {
        return typeof chrome !== "undefined" && chrome.identity ?
            chrome.identity.getRedirectURL() : false;
    }

    const [started, setStarted] = useState(false);
    const [auth, setAuth] = useState(false);
    const [isMsal, setIsMsal] = useState(false);
    const [msal, setMsal] = useState(null);
    const [redirectUri, setRedirectUri] = useState(getRedirect);


    const createMsal = () => {
        // @ts-ignore
        let msalInstance = new window.msal.PublicClientApplication({
            auth: {
                authority: "https://login.microsoftonline.com/common/",
                clientId: "9deaf42c-a982-41a0-95bf-5d95fa66eb34",
                redirectUri,
                postLogoutRedirectUri: redirectUri
            },
            cache: {
                cacheLocation: "localStorage"
            }
        });
        return msalInstance;
    }


    const check = () => {
        if (msal) {
            console.log("check - msal present");
            // @ts-ignore
            let accounts = msal.getAllAccounts();
            if (accounts.length) {
                // todo - logged in
                console.log('already logged in');
                return accounts;
            }
        }
        else console.log("check - no msal");
    }




    async function getLoginUrl(request: any, reject: any) {
        return new Promise((resolve) => {
            console.log('getLoginUrl promise');
            // @ts-ignore
            msal.loginRedirect({
                ...request,
                onRedirectNavigate: (url: any) => {
                    console.log('onRedirectNavigate url:', url);
                    resolve(url);
                    return false;
                }
            }).catch(reject);
        });
    }


    async function getLogoutUrl(request: any) {
        return new Promise((resolve, reject) => {
            console.log('getLogoutUrl promise');
            // @ts-ignore
            msal.logout({
                ...request,
                onRedirectNavigate: (url: any) => {
                    console.log('onRedirectNavigate url:', url);
                    // looks like https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=9deaf42c-a982-41a0-95bf-5d95fa66eb34&scope=openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Fnnimmgedomeeljdbgghchnbgncnggdcc.chromiumapp.org%2F&client-request-id=e507ad5d-7561-4bc3-9059-2447033f33a2&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.16.1&x-client-OS=&x-client-CPU=&client_info=1&code_challenge=qjCn6OQ_rpcsENlJPHgxEDBYTD31IeufY3v1AA-V4e8&code_challenge_method=S256&nonce=d756423e-c16a-4bb2-9760-ca538efd3512&state=eyJpZCI6IjdiMmFkMGVhLWQxZDMtNDI3Ny1hYmE5LWZlYTRkNTgwM2Y1MCIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D
                    resolve(url);
                    return false;
                }
            }).catch(reject);
        });
    }

    async function launchWebAuthFlow(url: string) {
        return new Promise((resolve, reject) => {
            console.log('launchWebAuthFlow promise');
            chrome.identity.launchWebAuthFlow({
                interactive: true,
                url
            }, (responseUrl) => {
                // Response urls includes a hash (login, acquire token calls)
                // @ts-ignore
                if (responseUrl.includes("#")) {

                    // looks something like https://nnimmgedomeeljdbgghchnbgncnggdcc.chromiumapp.org/#code=0.AUEAG1QpHXg-C0eHqN0xjPrv5yz06p2CqaBBlb9dlfpm6zQAAAA.AQABAAIAAAD--DLA3VO7QrddgJg7WevrejOcVrnyE-2__lCorKjFdfG-XD7Z-h2Y3LnpMwJUwxJHpMY3iAku031o5yBQqT536g2CTVMc4tWqFc2gBAVpqX4-x8IwJlkl8_93OLGUhIZyZmqJmaRZNx-Yj96-yfxKlLaGA6IT_e37g8iia9HpPgKh9iX57l4wXtrTHtdEagkaZYvhkN4c_or94_kDxInRsYt_Hdq9m_6FFJLsgld5TVJHmyJnCjAj6AzayvUbOjm63jpDH4eTfIjB1vFR_XjVQ_QFvqgzxNJ33Fhbc8JK2e0UyRO2Enlgbu90BkoexcqeR7wL_WRtqGHaLRhSgfS7r2oxIGRQBIsWnmUwo8fvfkPJXtt9SbpIRFnqsAv0sX2IjyRN25rc7hijtpgCYCiDmw3zlw4l2VcdkplVQA-n7fYJSugtAY_TTfWSBIZnu54Rn7Ygnu1qvPsodAOYhn1Y3NpUnZk8fMw6usV5YMDFIs2nkVSa4YMLHyTUBjY2ir3sa6FcG8h0ZtzqVxpDyIwPpHgfY5dLNnXJxJlyqO8mMqmLLlhMWVYgsgzkmhIKq5p_CxXMQ95MNHObdg0b1YLLHcHeiqrrJcM6y72iVWoAATTexmFHE7vp1xnYam2_1leNYHcw5LkaYm8slw6sqljWcV34V4iWlNgs7e59beIyP5LloezAezPeiU1FnErvFkwKkhJiiBu49JLGbH9nSWQJD0bTd8w6cnJmUulFgy7oS6rsYUwrmqmZlCsLUZO_F5HN3MEC_zfkzfWbKKWc725OIAA&client_info=eyJ1aWQiOiI3NzZkMDMxOC1kMDIzLTQ5YzUtYTc3Yy05OWQ4MmNjMzc0NDUiLCJ1dGlkIjoiMWQyOTU0MWItM2U3OC00NzBiLTg3YTgtZGQzMThjZmFlZmU3In0&state=eyJpZCI6IjdiMmFkMGVhLWQxZDMtNDI3Ny1hYmE5LWZlYTRkNTgwM2Y1MCIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d&session_state=ce37c837-fba3-4e0e-bace-dee505ee42f6

                    // todo
                    console.log('responseUrl includes #', responseUrl);

                    // @ts-ignore
                    msal.handleRedirectPromise(`#${responseUrl.split("#")[1]}`)
                        .then(resolve)
                        .catch(reject)
                } else {
                    // Logout calls
                    resolve();
                }
            })
        })
    }


    const login = async () => {
        // @ts-ignore
        const url = await getLoginUrl();
        // @ts-ignore
        const result = await launchWebAuthFlow(url);
        // returns account object
        return result;
    };

    const logout = async () => {
        // @ts-ignore
        const logoutUrl = await getLogoutUrl();
        // @ts-ignore
        await launchWebAuthFlow(logoutUrl);
    };


    const handleLogin = () => {
        console.log('handle login');

        let started: MessageType = {
            type: 'LOGIN_STARTED',
            source: 'popup',
            payload: Date.now()
        };
        sendMessageToBackgroundAndPopup(started);

        let completed: MessageType = {
            type: 'LOGIN_COMPLETED',
            source: 'popup',
            payload: Date.now()
        };
        login().then(res => {
            // returns object - see account.json
            setAuth(true);
            sendMessageToBackgroundAndPopup(completed);
            return res;
        });
    };

    const handleLogout = () => {
        console.log('handle logout');
        let message: MessageType = {
            type: 'LOGOUT',
            source: 'popup'
        };
        logout().then(res => {
            setAuth(false);
            sendMessageToBackgroundAndPopup(message);
            return res;
        });
    };


    useEffect(() => {
        const poll = setInterval(() => {
            console.log('polling for msal');
            // @ts-ignore
            if (window.msal && redirectUri) {
                clearInterval(poll);
                setIsMsal(true);
                let msal = createMsal();
                setMsal(msal);
            }
        }, 300);


        const handler = (message: MessageType) => {
            if (message.type === 'AUTH_FLOW_STATUS_RESPONSE') {
                console.log('AUTH_FLOW_STATUS_RESPONSE');
                console.log('started: ', message.payload);
                if (message.payload) {
                    console.log('auth flow started but did not complete');
                    setStarted(true);
                }
            }
        }
        const eventHandler = (event: MessageEvent<MessageType>) => {
            if (event.data) {
                handler(event.data);
            }
        }
        subscribeToExtensionMessages(handler)
        // subscribeToWindowMessages(eventHandler)

        console.log('sending auth stats request');
        sendMessageToBackgroundAndPopup({type: "AUTH_FLOW_STATUS_REQUEST", source: 'popup'});

    }, []);

    // if msal present, check account (only works after completion)
    useEffect(() => {
        if (msal) {
            console.log('checking account');
            let message: MessageType = {
                type: 'LOGIN_CHECKED',
                source: 'popup',
                payload: Date.now()
            };

            let results = check();
            if (results && results[0]) {
                console.log('account check successful');
                setAuth(true);
                sendMessageToBackgroundAndPopup(message);
            }
        }
    }, [msal]);


    // if loginflow was triggered, check to see if marked completed, and if not finish login
    useEffect(() => {

        console.log('completing login flow');
        if (msal && started) {
            handleLogin();
        }
    }, [msal, started]);



    return (
        <div className="popupWindowContainer">
            <Login isMsal={isMsal} handleLogin={handleLogin} handleLogout={handleLogout} auth={auth} check={check}/>
        </div>
    );


};

export default PopupWindow;
