#Tweet Labeler
##This app is for quickly labeling tweets for a training set.

##Getting Started
###Dependencies:
1. MongoDB. You'll need to configure connection in app.js.
2. Node.js

###Fire up the app.
1. In the app's directory, run `npm install`.
2. Call `node app.js`

##Labeler Instructions
1. Enter the label's name in the LabelName field.
2. Enter the keyboard-key to label-value mapping in the mapping field. (eg. {"1":"liberal", "5":"moderate", "0":"conservative"}. Note, the double quotes are necessary. Also, the space bar is reserved for skipping over a tweet.)
3. Click the submit button.
4. Hover the mouse over the tweet to activate the labeling. ('Unhovering' deactivates labeling.)
5. Press a mapped key to apply the label. The next tweet will appear.

Debugging info is available in the browser's console.

