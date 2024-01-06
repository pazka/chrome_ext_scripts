async function uiGetStore() {
    return new Promise ((resolve, reject) => {
        chrome.runtime.sendMessage({ action: 'getStorage', data: null },
            function (response) {
                console.log("Receive storage : ", response);
                resolve(response);
            });
    });
}

async function uiSetStore(store) {
    return new Promise ((resolve, reject) => {
        chrome.runtime.sendMessage({ action: 'setStorage', data: store },
            function (response) {
                console.log("Receive storage : ", response);
                resolve(response);
            });
    });
}