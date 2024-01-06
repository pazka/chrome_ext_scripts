const defaultStorage = {
  urlItems: [{
    urlPattern: "example.com",
    script: "alert('hello world')"
  }]
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "getStorage") {
    getStore().then((store) => {
      console.log("sendResponse(store);", store)
      sendResponse(store);
    }).catch((error) => {
      console.error(error);
      sendResponse({ error: 'Element not found' });
    });
  } else if (request.action == "setStorage") {
    sendResponse(setStore(request.data));
  }else{
    sendResponse({ error: 'No message ref' });
  }

  // Return true to indicate that you will send a response asynchronously
  return true;
});



async function getStore() {
  const rawStore = (await chrome.storage.sync.get("scriptStore")).scriptStore;
  let store = {};

  if (rawStore == null || rawStore == undefined || rawStore == "") {
    store = Object.assign(store, defaultStorage);
    await setStore(store);
  } else {
    store = Object.assign(store, rawStore);
  }

  return store;
}

async function setStore(store) {
  return await chrome.storage.sync.set({ scriptStore: store });
}