# Chrome Extension boilerplate created with React Typescript

## Getting started

To build/rebuild the extension:

```
$ npm start
```

After the project is built, a directory named `dist` will be created. 

To install the extension:

1. Open Chrome
2. Navigate to `chrome://extensions`
3. Enable 'Developer mode'
4. Click 'Load unpacked'
5. Select the `dist` directory

## todo
 - install testing library etc
 - add further info into jobs - for display in extended section
 - move stateful settings stuff into Settings
 - replicate stateful stuff in Display
 - hover interactions
 - reference list of jobs in state (for selection, hover interactions)  
 - export info into excel
 - export info into json
 - filter?
 - use interface checking libraries?


## todo later
  - add licence keys to env var for build/CI (see kendo doc)
  
## info

Communication between the components
The popup enables the user to toggle settings. 
Since every component (popup, content scrip, and background script) is isolated, 
we have to use Chrome's communication API to be able to send a message between 
the components. We want our background script to function as a browser wide state, 
and therefore all the communication should go through it.

Communication between popup and content scripts to background script
We will start by listening to messages from our background script.

As the popup's state is lost every time it is closed, we should ask the 
background for the current state

As users can have multiple tabs open, either need to store state for each  
(if updating state in bg, need to tie it to id of tab) - or - 
just keep job state within the content script (starting with this simpler option)
 

## Notes

The job search results are persisted in sessionStorage, and updated after each search/paging action.

sessionStorage is isolated for each tab, so events in sessionStorage cannot be subscribed to in other tabs.
Unfortunately the current page cannot listen to changes in storage triggered by that page.
So... the only way to listen for sessionStorage events is within a frame on that page.


useful links
https://react.christmas/2020/12
https://betterprogramming.pub/inject-html-in-react-using-iframe-ea3c85bdeec0
https://www.telerik.com/kendo-react-ui/my-license/?utm_medium=product&utm_source=kendoreact&utm_campaign=kendo-ui-react-purchase-license-keys-warning


https://www.telerik.com/kendo-react-ui/components/grid/api/GridColumnProps/
https://www.telerik.com/kendo-react-ui/components/grid/
