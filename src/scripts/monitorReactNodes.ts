//@ts-nocheck

export const monitorReactNodes = function() {

    let msalInstance = null;
    let redirectUri = null;

    // have to do this in order to access window.msal
    window.addEventListener('message', function(event) {
        if (event.data?.type === 'AUTH_URI_RESPONSE') {
            console.log('script: auth uri response from background: ' + event.data.payload);
            redirectUri = event.data.payload;
        }

        if (event.data?.type === 'LOGIN_REQUEST') {
            console.log('script: login request received for: ' + event.data.payload);
        }

        if (event.data?.type === 'LOGOUT_REQUEST') {
            console.log('script: login request received for: ' + event.data.payload);
        }
    });

    const msalPoller = setInterval(() => {

        // both card view and split view have this when list is rendered
        const msal = window.msal;
        if (msal) {
            console.log('script: msal present');
            clearInterval(msalPoller);
            msalInstance = new msal.PublicClientApplication({
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

            // todo
            console.log('script: msal: ', msalInstance);


        }
    }, 200);


    async function getLoginUrl(request, reject) {
        return new Promise((resolve) => {
            msalInstance.loginRedirect({
                ...request,
                onRedirectNavigate: (url) => {
                    resolve(url);
                    return false;
                }
            }).catch(reject);
        });
    }


    async function getLogoutUrl(request) {
        return new Promise((resolve, reject) => {
            msalInstance.logout({
                ...request,
                onRedirectNavigate: (url) => {
                    resolve(url);
                    return false;
                }
            }).catch(reject);
        });
    }

    async function launchWebAuthFlow(url) {
        return new Promise((resolve, reject) => {
            chrome.identity.launchWebAuthFlow({
                interactive: true,
                url
            }, (responseUrl) => {
                // Response urls includes a hash (login, acquire token calls)
                if (responseUrl.includes("#")) {

                    // todo
                    console.log('responseUrl includes #', responseUrl);

                    msalInstance.handleRedirectPromise(`#${responseUrl.split("#")[1]}`)
                        .then(resolve)
                        .catch(reject)
                } else {
                    // Logout calls
                    resolve();
                }
            })
        })
    }





    const sendResults = (results: Element) => {
        for (const key in results) {
            if (key.startsWith('__reactFiber$')) {

                // @ts-ignore
                let item = results[key];
                let numberIt = 0;

                while (item.memoizedProps.items === undefined && numberIt < 15) {
                    item = item?.return;
                    numberIt++;
                }

                // console.log('iterations: ', numberIt);
                // console.log('item: ', item);
                if (item.memoizedProps.items) {

                    // todo
                    let message = "job state changed: " + item.memoizedProps.items.length + " jobs";

                    // log({ logType: 'INFO', message });
                    window.postMessage({
                        type: 'JOB_PROPS',
                        payload: item.memoizedProps.items,
                        source: 'content'
                    }, "*");


                }
            }
        }
    }


    const sendRequest = (nodeWithRequestInfo: Element) => {
        if (nodeWithRequestInfo) {
            const poll = setInterval(() => {
                // @ts-ignore
                if (nodeWithRequestInfo.memoizedState?.baseState.location?.searchId) {
                    clearInterval(poll);
                    window.postMessage({
                        type: 'SEARCH_CONTEXT_UPDATED',
                        // @ts-ignore
                        payload: nodeWithRequestInfo.memoizedState?.baseState,
                        source: 'content'
                    }, "*");
                }
            }, 200);
        }
    }


    const header = document.querySelector('.ds-header');

    const findRequest = () => {

        for (const key in header) {
            if (key.startsWith('__reactFiber$')) {
                // console.log('header has key');

                // @ts-ignore
                let item = header[key];
                // console.log(item);

                let numberIt = 0;
                // numberIt should be 16
                while (item.memoizedState?.baseState?.client === undefined && numberIt < 20) {
                    item = item?.return;
                    numberIt++;
                }

                if (item.memoizedState?.baseState) {
                    return item;
                } else return null;
            }
        }


    }


    console.log('adinfo: injected script');
    const poller = setInterval(() => {

        // both card view and split view have this when list is rendered
        const cards = document.querySelector('.infinite-scroll-component');
        if (cards !== null) {
            clearInterval(poller);

            // todo ? - deal with both being present, and switching layout

            const cardList = document.querySelector("[class^='job-search-resultsstyle__CardGrid']");
            // console.log('cardList: ', cardList);

            const cardListSplit = document.querySelector("[class^='splitviewstyle__CardGridSplitView']");
            // console.log('cardListSplit: ', cardListSplit);

            let results: Element | null = null;
            if (cardList) {
                results = cardList;
            }
            // bias to cardListSplit
            if (cardListSplit) {
                results = cardListSplit;
            }

            let timeout: NodeJS.Timeout;
            const handleMove = (event: Event) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    // console.log("mousemove!", event);
                    // @ts-ignore
                    let path = event.path || evwnt.composedPath();
                    try {
                        for (let i = 0; i < path.length; i++) {
                            if (path[i].nodeName === 'ARTICLE') {
                                // console.log(path[i]);
                                let id = path[i].getAttribute('data-test-id');
                                let match = id.match(/-component-(\d*)$/);

                                let pos;
                                if (match) {
                                    pos = parseInt(match[1]) + 1;


                                    window.postMessage({
                                        type: 'HOVER_RESULTS',
                                        payload: pos,
                                        source: 'content'
                                    }, "*");


                                }

                                // todo - want to do any checks???!!!
                                // console.log(pos);
                                let child = path[i].children[0];
                                let link = child?.href;
                                let decoration = child.children[child.children.length - 1];
                                if (decoration && decoration.nodeName === 'DIV') {
                                    let position = parseInt(decoration.children[0]?.children[2]?.innerText);
                                    if (position !== pos) {
                                        console.log('ERROR with position')
                                    }
                                }
                                break;
                            }
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }, 200);
            }

            // monitor updates to card list
            if (results) {

                if (window.PointerEvent) {
                    results.addEventListener("pointermove", handleMove);
                } else {
                    results.addEventListener("mousemove", handleMove);
                    console.log('no pointer?!')
                }

                // todo - need to send initial results, or observer does that now?
                // results && sendResults(results);

                // if we have results, then there will be a request
                let nodeWithRequestInfo = findRequest();

                const resultsObserver = new MutationObserver((mutations: any) => {
                    // console.log('UPDATES')
                    results && sendResults(results);
                    sendRequest(nodeWithRequestInfo);
                });
                // @ts-ignore
                resultsObserver.observe(results, {
                    childList: true // report added/removed nodes
                });
            }
        }

    }, 100);


    /*
        <div className="job-search-resultsstyle__LoadMoreContainer-sc-1wpt60k-1 htsqfC">
            <button aria-pressed="false" className="sc-dkPtyc jRkyeO  ds-button" disabled="" role="button" type="button"
                    shape="rectangle">No More Results
            </button>
        </div>
     */



}