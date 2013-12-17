# Redmine: fast assign

## Description
This script is designed for ```Tampermonkey``` and allows you to assign the issue
and set required status in one click from issues list.

## Configuration
Add script to the ```Tampermonkey``` and set IDs to required values:

```JS
  var redmineAssign = {
      userID: 53, // Define your user ID here
      status: 5,  // Define status ID you wish to set
```
