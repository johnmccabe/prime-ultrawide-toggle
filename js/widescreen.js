// When the extension is installed or upgraded
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page URL matches a watch page
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.amazon.co.uk'},
            css: [".scalingVideoContainer"]
          })
        ],
        // Show the widescreen pageaction
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

// Widescreen enabled flag
var ultrawide = false;

// Called when the user clicks on the page action
chrome.pageAction.onClicked.addListener(function(tab){
  if (ultrawide == false) {
    console.log('Enabling widescreen for ' + tab.url );
    // Resize the video wrapper to fill screen
    chrome.tabs.executeScript({
      code: 'document.querySelector(".scalingVideoContainer").style.cssText = "position: absolute;height: 134%;width: 100%;background-color: black; margin-top:-246px;"'
    });



    
    // Set page icon to active state
    chrome.pageAction.setIcon({path: "img/icon_on_19.png", tabId: tab.id});
    ultrawide = true;
  } else {
    console.log('Disabling widescreen for ' + tab.url );
    // Restore original scaling
    chrome.tabs.executeScript({
      code: 'document.querySelector(".scalingVideoContainer").style.cssText = "position: absolute;height: 100%;width: 100%;background-color: black;"'
    });
    // Set page icon to inactive state
    chrome.pageAction.setIcon({path: "img/icon_off_19.png", tabId: tab.id});
    ultrawide = false;
  }
});
