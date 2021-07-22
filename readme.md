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

## updates
1.0.4
 - wed 21 july 2021
 - added settings for field display
 - added permission/match for .be/en/



##  important
- check schema! e.g. enrichments vs posting info, what is mandatory etc
- use both post and enrichments

## capabilities todo

Deal with upcoming change in source of data!
- need to understand how/when this is happening

Fixes:
- 2 fields not being displayed: id and provider code
- display seo url in expanded details
- deal with locations etc better

Data in table:
- copy info to clipboard  
- add further info into jobs - for display in extended section
  - now id?
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
- revise order of data

Settings:
- persist and retrieve

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


Since every component (popup, content script, and background script) is isolated, 
we have to use Chrome's communication API to be able to send a message between 
the components. We want our background script to function as a browser wide state, 
and therefore all the communication about the plugin settings should go through it. However, 
the state of the job results should be contained within the page as it is possible
to have multiple tabs open (different searches, domains etc) at the same time.

Whenever a content script page (or popup) is closed/refreshed, the state is lost. 
Generally, we should ask the background for the current state (by listening to 
messages from our background script), however we can  persist the settings in 
local storage (or chrome storage) and use that for startup - then just need to 
presist changes and communicate state changes to all tabs 

step 1: retrieve persisted settings via context
step 2: any requests to change state are handled by context, persisted and sent to background
step 3: state changes are sent to all content tabs from background

## Notes

The job search results are currently persisted in sessionStorage, and updated after each search/paging action.

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
- https://github.com/akash-joshi/local-storage-hook
- https://blog.bitsrc.io/how-to-start-using-react-query-4869e3d5680d
- https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/

on hover
- https://stackoverflow.com/questions/14795099/pure-javascript-to-check-if-something-has-hover-without-setting-on-mouseover-ou
- https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event

- https://www.30secondsofcode.org/react/s/use-persisted-state
- https://www.30secondsofcode.org/react/s/use-debounce

tracking position before render (dor scrolling?)
- https://stackoverflow.com/questions/53537529/getsnapshotbeforeupdate-using-react-hooks

inject content into page via script:
- https://dev.to/anobjectisa/build-a-chrome-extension-using-reactjs-38o7
- https://itnext.io/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39

testing with useContext
- https://testing-library.com/docs/example-react-context/
- https://www.youtube.com/watch?v=3yiialslPbc&ab_channel=KentC.Dodds
- https://medium.com/@ryandrewjohnson/unit-testing-components-using-reacts-new-context-api-4a5219f4b3fe
- https://polvara.me/posts/mocking-context-with-react-testing-library

structure using context and adapters
- https://www.freecodecamp.org/news/a-better-way-to-structure-react-projects/


## Libraries used:

- https://www.telerik.com/kendo-react-ui/components/grid/
- https://www.npmjs.com/package/react-json-view-ts


structure and context used from:
- https://github.com/akash-joshi/react-dogs-app/