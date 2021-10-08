import * as React from "react";
import {
    subscribeToExtensionMessages, subscribeToWindowMessages,
    sendMessageToBackgroundAndPopup, sendMessageToContent,
} from "../helpers/messaging";
import { MessageType } from '../types/types'

import {Login} from "./Login";

import "./PopupInfo.css";
import {useEffect, useState} from "react";




// todo - extract
let name = "";
const manifest = chrome.runtime.getManifest();
if (manifest && manifest.name && manifest.version) {
    name = `${manifest.name} v. ${manifest.version}`
}
else {
    name = "";
}








const PopupInfo = () => {

    // @ts-ignore
    const getRedirect = () : string | false => {
        return typeof chrome !== "undefined" && chrome.identity ?
            chrome.identity.getRedirectURL() : false;
    }


    const [isMsal, setIsMsal] = useState(false);
    const [msal, setMsal] = useState(null);
    const [redirectUri, setRedirectUri] = useState(getRedirect);


    useEffect(() => {

        const poll = setInterval(() => {
            console.log('in auth poll');
            // @ts-ignore
            if (window.msal && redirectUri) {
                clearInterval(poll);
                setIsMsal(true);
                let msal = createMsal();
                setMsal(msal);
                console.log('exit auth poll');
            }
        }, 300);

        const handler = (message: MessageType) => {
            if (message.type === 'CHECK') {
                console.log('popup: ' + message);
                chrome.runtime.sendMessage({type: 'CHECK_RESPONSE'});
            }
        }
        const eventHandler = (event: MessageEvent<MessageType>) => {
            if (event.data) {
                handler(event.data);
            }
        }
        subscribeToExtensionMessages(handler)
        // subscribeToWindowMessages(eventHandler)



    }, []);



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
            // @ts-ignore
            let accounts = msal.getAllAccounts();
            if (accounts.length) {
                // todo - logged in
                console.log('already logged in');
                return accounts;
            }
        }
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

    async function launchWebAuthFlow(url:string) {
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
        console.log(result);
        // todo login in ui
        return result;
    };

    const logout = async () => {
        // @ts-ignore
        const logoutUrl = await getLogoutUrl();
        // @ts-ignore
        await launchWebAuthFlow(logoutUrl);
        // todo  logout in ui
    };

    // do a check before showing ui
    let results = check();
    console.log('check: ', results);

    /*


    {
    "homeAccountId": "776d0318-d023-49c5-a77c-99d82cc37445.1d29541b-3e78-470b-87a8-dd318cfaefe7",
    "environment": "login.windows.net",
    "tenantId": "1d29541b-3e78-470b-87a8-dd318cfaefe7",
    "username": "nick@torana.xyz",
    "localAccountId": "776d0318-d023-49c5-a77c-99d82cc37445",
    "name": "Nicholas Baldwin",
    "idTokenClaims": {
        "aud": "9deaf42c-a982-41a0-95bf-5d95fa66eb34",
        "iss": "https://login.microsoftonline.com/1d29541b-3e78-470b-87a8-dd318cfaefe7/v2.0",
        "iat": 1633686906,
        "nbf": 1633686906,
        "exp": 1633690806,
        "name": "Nicholas Baldwin",
        "nonce": "52540e01-d8fc-48ff-9ea4-4f03a0a153b9",
        "oid": "776d0318-d023-49c5-a77c-99d82cc37445",
        "preferred_username": "nick@torana.xyz",
        "rh": "0.AUEAG1QpHXg-C0eHqN0xjPrv5yz06p2CqaBBlb9dlfpm6zRBAHU.",
        "sub": "5EMxcpiMA--2g55FATipNS6PsHLTLuyr9JXzzQ8gqcM",
        "tid": "1d29541b-3e78-470b-87a8-dd318cfaefe7",
        "uti": "hmQjTcikDUK7s7uTPDQfAQ",
        "ver": "2.0"
    }
}
     */


    const handleLogin = () => {
        login().then(res => {
            console.log('done');
            console.log(res);
            return res;

            // returns object with
            /*
            {
    "authority": "https://login.microsoftonline.com/common/",
    "uniqueId": "776d0318-d023-49c5-a77c-99d82cc37445",
    "tenantId": "1d29541b-3e78-470b-87a8-dd318cfaefe7",
    "scopes": [
        "openid",
        "profile",
        "email"
    ],
    "account": {
        "homeAccountId": "776d0318-d023-49c5-a77c-99d82cc37445.1d29541b-3e78-470b-87a8-dd318cfaefe7",
        "environment": "login.windows.net",
        "tenantId": "1d29541b-3e78-470b-87a8-dd318cfaefe7",
        "username": "nick@torana.xyz",
        "localAccountId": "776d0318-d023-49c5-a77c-99d82cc37445",
        "name": "Nicholas Baldwin",
        "idTokenClaims": {
            "aud": "9deaf42c-a982-41a0-95bf-5d95fa66eb34",
            "iss": "https://login.microsoftonline.com/1d29541b-3e78-470b-87a8-dd318cfaefe7/v2.0",
            "iat": 1633687044,
            "nbf": 1633687044,
            "exp": 1633690944,
            "name": "Nicholas Baldwin",
            "nonce": "d756423e-c16a-4bb2-9760-ca538efd3512",
            "oid": "776d0318-d023-49c5-a77c-99d82cc37445",
            "preferred_username": "nick@torana.xyz",
            "rh": "0.AUEAG1QpHXg-C0eHqN0xjPrv5yz06p2CqaBBlb9dlfpm6zRBAHU.",
            "sub": "5EMxcpiMA--2g55FATipNS6PsHLTLuyr9JXzzQ8gqcM",
            "tid": "1d29541b-3e78-470b-87a8-dd318cfaefe7",
            "uti": "Q7c1CFFkwUiQCK4voqzuAA",
            "ver": "2.0"
        }
    },
    "idToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiI5ZGVhZjQyYy1hOTgyLTQxYTAtOTViZi01ZDk1ZmE2NmViMzQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMWQyOTU0MWItM2U3OC00NzBiLTg3YTgtZGQzMThjZmFlZmU3L3YyLjAiLCJpYXQiOjE2MzM2ODcwNDQsIm5iZiI6MTYzMzY4NzA0NCwiZXhwIjoxNjMzNjkwOTQ0LCJuYW1lIjoiTmljaG9sYXMgQmFsZHdpbiIsIm5vbmNlIjoiZDc1NjQyM2UtYzE2YS00YmIyLTk3NjAtY2E1MzhlZmQzNTEyIiwib2lkIjoiNzc2ZDAzMTgtZDAyMy00OWM1LWE3N2MtOTlkODJjYzM3NDQ1IiwicHJlZmVycmVkX3VzZXJuYW1lIjoibmlja0B0b3JhbmEueHl6IiwicmgiOiIwLkFVRUFHMVFwSFhnLUMwZUhxTjB4alBydjV5ejA2cDJDcWFCQmxiOWRsZnBtNnpSQkFIVS4iLCJzdWIiOiI1RU14Y3BpTUEtLTJnNTVGQVRpcE5TNlBzSExUTHV5cjlKWHp6UThncWNNIiwidGlkIjoiMWQyOTU0MWItM2U3OC00NzBiLTg3YTgtZGQzMThjZmFlZmU3IiwidXRpIjoiUTdjMUNGRmt3VWlRQ0s0dm9xenVBQSIsInZlciI6IjIuMCJ9.iLPGEmp1b5dTgxM7pjbjz4ZPuvEP87sck1xcQ7Ed2wtYDwHMoUxhZPvbNQk2dLF7BUC1roePkX9e-xOIZ3e6Xe52zwMZsJOnWRULdeFF589m2E-BL2a0KuyPQnbv2P04HZ4jSxPeXslVQo1z1SPN5B7PQpVs7G80mKmygW22nHsUqwywjSUkviTgWBo-z5wex7TiQU-qWtdkP0FemoyAK05IqgzelhtqLKhi8N_Aw1IRY-wuoMbAHfAUYVxN6oPFHcheADc0KRB0M18V3W3CxX5H-00p3yz3AjPkUc4RfJ0mq8SQ87-5MYKBXzqNS6FYE_mWNEiMFaW9-N9CNYbyeg",
    "idTokenClaims": {
        "aud": "9deaf42c-a982-41a0-95bf-5d95fa66eb34",
        "iss": "https://login.microsoftonline.com/1d29541b-3e78-470b-87a8-dd318cfaefe7/v2.0",
        "iat": 1633687044,
        "nbf": 1633687044,
        "exp": 1633690944,
        "name": "Nicholas Baldwin",
        "nonce": "d756423e-c16a-4bb2-9760-ca538efd3512",
        "oid": "776d0318-d023-49c5-a77c-99d82cc37445",
        "preferred_username": "nick@torana.xyz",
        "rh": "0.AUEAG1QpHXg-C0eHqN0xjPrv5yz06p2CqaBBlb9dlfpm6zRBAHU.",
        "sub": "5EMxcpiMA--2g55FATipNS6PsHLTLuyr9JXzzQ8gqcM",
        "tid": "1d29541b-3e78-470b-87a8-dd318cfaefe7",
        "uti": "Q7c1CFFkwUiQCK4voqzuAA",
        "ver": "2.0"
    },
    "accessToken": "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkxaN3JNWWN3N0JCVXVpTzdrOUZZNnRVSVBuY0lEZW9ZNndONHl5MDNLNkEiLCJhbGciOiJSUzI1NiIsIng1dCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xZDI5NTQxYi0zZTc4LTQ3MGItODdhOC1kZDMxOGNmYWVmZTcvIiwiaWF0IjoxNjMzNjg3MDQ0LCJuYmYiOjE2MzM2ODcwNDQsImV4cCI6MTYzMzY5MDk0NCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkUyWmdZTmloMFp1cllhRzhkSVZMeE1mMmpXNkZUbnVVeGRlMnZJblo1bjlrT2VQTXFub0EiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkNocm9tZSBQbHVnaW4gU1NPIC0gTmljayIsImFwcGlkIjoiOWRlYWY0MmMtYTk4Mi00MWEwLTk1YmYtNWQ5NWZhNjZlYjM0IiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJCYWxkd2luIiwiZ2l2ZW5fbmFtZSI6Ik5pY2siLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxNTkuMTk2LjE3MC4zMyIsIm5hbWUiOiJOaWNob2xhcyBCYWxkd2luIiwib2lkIjoiNzc2ZDAzMTgtZDAyMy00OWM1LWE3N2MtOTlkODJjYzM3NDQ1IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAxOTI2QkVGQzMiLCJyaCI6IjAuQVVFQUcxUXBIWGctQzBlSHFOMHhqUHJ2NXl6MDZwMkNxYUJCbGI5ZGxmcG02elJCQUhVLiIsInNjcCI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic3ViIjoiQWpDWjgzMVc0OHh5bmxTSTBPLWllcmwwc2JMRG9vTUFKTUx6NmpPeTVBZyIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJPQyIsInRpZCI6IjFkMjk1NDFiLTNlNzgtNDcwYi04N2E4LWRkMzE4Y2ZhZWZlNyIsInVuaXF1ZV9uYW1lIjoibmlja0B0b3JhbmEueHl6IiwidXBuIjoibmlja0B0b3JhbmEueHl6IiwidXRpIjoiUTdjMUNGRmt3VWlRQ0s0dm9xenVBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiI1RU14Y3BpTUEtLTJnNTVGQVRpcE5TNlBzSExUTHV5cjlKWHp6UThncWNNIn0sInhtc190Y2R0IjoxNTkzNTY1NzI2fQ.kg4QfTWn9j1EjtOHXRCkP7OJU-BjK5CmiOClFZhEPBhVZxk2vHlsikRNjuJkwCbqxEd1OF8c3Hvwp8VtDIeKIX-gKshhuk92ww5jQScQ36HrV5ek3m4hohSWF6MKEER2vk7JGHH8uyU32UVRu6oDrnrrZpFMHWaqZozCsDJg8rla51b7po_rLDBWoaCNcHyJsnt8N2IwyisuQhjtBreKbu5YG_3x7aisQx3tcXNx8SG59IykR3vf-ukNYTw28TNdnIujQWmwBHupb7ewZB-qEg-vThojHvh_Np8PVe5D4zUKe9HXmcOOobRZ_jf5aKMcY-dJRtA67nPKPPmCp0ZhCQ",
    "fromCache": false,
    "expiresOn": "2021-10-08T11:02:23.000Z",
    "extExpiresOn": "2021-10-08T12:02:22.000Z",
    "familyId": "",
    "tokenType": "Bearer",
    "state": "",
    "cloudGraphHostName": "",
    "msGraphHost": ""
}
             */
        });
    }


    return (
        <div>
            <p>{name}!</p>
            <br />
            <p>Ready to auth: {isMsal ? 'true' : 'false'}</p>
            <p>Redirect URI: {redirectUri}</p>
            <button onClick={handleLogin}>click to login</button>
            <Login />
        </div>
    );
};

export default PopupInfo;
