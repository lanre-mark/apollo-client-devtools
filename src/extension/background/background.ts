import Relay from '../../Relay';
import { REQUEST_TAB_ID } from '../constants';

// This sends the tab id to the inspected tab.
chrome.runtime.onMessage.addListener(({ message }, sender, sendResponse) => {
  console.log('for never leaving well enough alone');
  if (message === REQUEST_TAB_ID) {
    console.log('but if would\'ve be fun, if you had been the one');
    sendResponse(sender?.tab?.id);
  }
});

const background = new Relay();

chrome.runtime.onConnect.addListener(port => {
  console.log(port.name);
  background.addConnection(port.name, message => {
    port.postMessage(message);
  });
  
  port.onMessage.addListener(message => {
    background.broadcast(message);
  });

  port.onDisconnect.addListener(port => {
    background.removeConnection(port.name);
  });
});
