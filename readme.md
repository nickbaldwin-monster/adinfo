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

1.0.5
 - tue 27 july 2021
 - added overlay of info into search results with setting
 - updated order of info and settings
 - display number of results and errors (with additional panel for details)

1.0.6
- tue 27 july 2021
- added support for 4 missing locales (be/fr, lu/en, lu/de, ch/fr)

1.0.7
 - wed 4 aug 2021
 - tidied logging
 - spike for identifying react components (in injected script)

1.0.8
 - mon 9 aug 2021
 - ams preprod urls

1.0.9
- tue 10 aug 2021
- added nowId and template properties & assoc settings
- webadmin link
- search by id on all domains


1.0.10 - wed 18 aug 2021
 - 
 - resized columns so all text should be displayed
 - frozen primary columns in job table
 - other columns can be reordered (reorder yet to be persisted)
 - tooltips on hover for columns
 - tooltip on hover on adProvider field in table (remaining fields yet TBD)
 - link for company field in table (desired links yet to be added)
 - removed seoJobID from detail view
 - removed 'test' functions (toolbar button, settings button, + button)
 - added scrollbars to panels
 - fixed now id and webadmin link
 - updated default settings
 - reordered fields in table and revised column titles
 - order of settings matches table

order of fields (* = default setting):
- Position *
- Company *
- Ad Provider *
- Title *
- Location *
- Now ID *
- Job ID *
- Template *
- xcode *
- Apply Type
- Date *
- Mesco
- Provider
- Provider Code
- Date Recency *
- Ingestion
- Pricing Type *
- SEO Job ID
- Ref Code (added)
- Valid Through (added)
- Valid Through Google (added)



tbd

- get request info from new views *
- persist settings *
- integrate JSD widget *
- hover over ads in sync with the table *
- only link next admin for jpw jobs - followup
- remove google link
- figure out remote - followup
- occupation type / remote - followup
- which date value is displayed? - followup
- modified date?
- add legend to tabular columns
- determine what Adzerk means (is it GCTS_AdQuery ? )
- if any location field undefined, remove it
- apply xcode 'aggregated' for jobs pt 3 in eu
- add link to job detail
- add link to search using job id
- add link to webadmin using now id
- tooltip for other cell values?
- match settings to titles
- remove checkbox on items in table?
- resize width?
- copy cell/row values
- link to accounts in next admin?
- link to accounts in webadmin?



##  important
- check schema! e.g. enrichments vs posting info, what is mandatory etc
- use both post and enrichments

## capabilities todo

Deal with upcoming change in source of data!
- need to understand how/when this is happening

Next:
- persist settings
- deal with undefined locations

Data in table:
- copy info to clipboard  
- add further info into jobs - for display in extended section
  - now id?
- other dates?

Associate results with data:
- add other info to hover
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
- revise order of data?
- loading display
- deal with locations etc better

Settings:
- persist and retrieve

Other
- auto load results 
- set/see cookies



## could do later
- export selected items only
- filter

## code todo
- use redux?
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

step 1: retrieve persisted settings (if exist) via context (otherwise use defaults)
step 2: any requests to change state are handled by context, persisted (if possible) and sent to background
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


displaying popup and monitoring which result is hovered over:
- https://css-tricks.com/popping-hidden-overflow/
- http://jsfiddle.net/anureshkravi/t4oqw6zm/
- https://medium.com/a-layman/experience-in-escape-css-overflow-39ed2f71abbd
- http://michaelsoriano.com/better-tooltips-with-plain-javascript-css/

## Libraries used:

- https://www.telerik.com/kendo-react-ui/components/grid/
- https://www.npmjs.com/package/react-json-view-ts


structure and context used from:
- https://github.com/akash-joshi/react-dogs-app/