# Tweet Labeler
## This app is for quickly labeling tweets for a training set.

## Getting Started
### Dependencies:
1. MongoDB. You'll need to configure connection in app.js.
1. Node.js

### Fire up the app.
1. In the app's directory, run `npm install`.
1. Call `node app.js`

## Labeler Instructions
1. Enter the label's name in the LabelName field.
1. Enter the keyboard-key to label-value mapping in the mapping field. (eg. {"1":"liberal", "5":"moderate", "0":"conservative"}. Note, the double quotes are necessary. Also, the space bar is reserved for skipping over a tweet.)
1. Click the submit button.
1. Hover the mouse over the tweet to activate the labeling. ('Unhovering' deactivates labeling.)
1. Press a mapped key to apply the label. The next tweet will appear.

Debugging info is available in the browser's console.

