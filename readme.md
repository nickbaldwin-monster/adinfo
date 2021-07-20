# Chrome Extension boilerplate created with React Typescript

## Getting started for dev

To build/rebuild the extension:

```
$ npm run build
```

After the project is built, a directory named `dist` will be created. 


## To install the extension:

1. Open Chrome
2. Navigate to `chrome://extensions`
3. Enable 'Developer mode'
4. Click 'Load unpacked'
5. Select the `dist` directory


##  important
- check schema! e.g. enrichments vs posting info, what is mandatory etc
- use both post and enrichments

## capabilities todo

Data in table:
- copy info to clipboard  
- add further info into jobs - for display in extended section
- deal with locations etc better
- other dates?

Associate results with data:
- hover interaction - show info?
- hover - highlight item in table?
- select item in table - highlight job in list?  

Link data:
- support all domains for links on site
- add link to webadmin
- add links for accounts
  
Display:
- mobile styling
- fix padding in grid header
- loading indicator
- revise order data

Settings:
- add settings into panel
- turn on/off specific data fields

Other
- auto load results 
- set/see cookies



## could do later
- export selected items only
- filter

## code todo
- move stateful settings stuff into Settings panel
- sync settings via background (due to potential multi-tab conflicts)  
- use interface checking libraries?
- install testing library etc
- check schema! e.g. enrichments vs posting info, what is mandatory etc
- refactor content and display components
- reference list of jobs in state (for selection, hover interactions)
- may need to monitor page and add back if rerender removes app

## questions
- what info to show / not show in table?!
- what settings should there be?
- where should the table be shown?
- settings within the page (rather than popup)?

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


## useful links

job schema:
- https://github.com/monster-next/jobs-job-dto-v2/blob/master/src/main/resources/job.ext.schema.json
  
- https://react.christmas/2020/12
- https://betterprogramming.pub/inject-html-in-react-using-iframe-ea3c85bdeec0
- https://www.telerik.com/kendo-react-ui/my-license/?utm_medium=product&utm_source=kendoreact&utm_campaign=kendo-ui-react-purchase-license-keys-warning

  
- https://github.com/gristlabs/ts-interface-checker

- https://day.js.org/docs/en/installation/typescript

- https://decipher.dev/30-seconds-of-typescript/docs/debounce/
  https://davidwalsh.name/javascript-debounce-function
  https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
- https://usehooks-typescript.com/react-hook/use-debounce

- https://usehooks.com/
- https://usehooks-typescript.com/react-hook/use-hover
- https://usehooks-typescript.com/react-hook/use-local-storage
  

- https://www.30secondsofcode.org/react/s/use-persisted-state
- https://www.30secondsofcode.org/react/s/use-debounce

tracking position before render (dor scrolling?)
- https://stackoverflow.com/questions/53537529/getsnapshotbeforeupdate-using-react-hooks

inject content into page via script:
- https://dev.to/anobjectisa/build-a-chrome-extension-using-reactjs-38o7
- https://itnext.io/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39


## Libraries used:

- https://www.telerik.com/kendo-react-ui/components/grid/
- https://www.npmjs.com/package/react-json-view-ts