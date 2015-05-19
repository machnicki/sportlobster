#Task for Sportlobster

##Requirements
BackboneJS Technical Test

Assignment : Create interface to view event predictions. Using the data provided, developer should visualise data by grouping and ordering them. Showcasing routing, filtering, paging, is a big plus (The data can be adjusted if needed).

1. Create list view of data that provides interaction of filtering data.
a) ability to select a prediction
b) ability to enable/disable predictions that were predicted
2. Create separate routes for different pages/views of the end solution
a) ability to navigate inside a single event, and separately review it’s predictions.
b) using url parameters

Bonus : using build script’s (Grunt), testing(Jasmine) automated testing(Karma), css precompilers (LESS, SASS), automatic documentation (Docular, Yuidoc).
Code should be nicely structured, no overuse of libraries. Max time : ~ 2h.

##UI
I have used Bootstrap for styling and SASS as a css precompiler.

##Documenation
By YUIDoc. You need to start application (``` npm start ```) to see docs: http://localhost:9000/docs/

##ToDo
Minify + concat js into one file. Improve Jasmine tests, with Phantom 2.0 should work.

##Run the app
Start the server
``` npm start ```