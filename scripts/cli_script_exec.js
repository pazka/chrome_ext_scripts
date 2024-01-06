getStore().then(function (response) {
    trymatchUrls(response.urlItems)
});

function trymatchUrls(urlItems) {
    urlItems.forEach(urlItem => {
        console.log("CUSTOM_SCRIPT : " + urlItem);
        if (tryMatchUrl(urlItem.urlPattern)) {
            executeScript(urlItem.script);
        }
    });
}

function tryMatchUrl(urlPattern) {
    if (urlPattern == null || urlPattern == undefined || urlPattern == "") return false;

    var url = window.location.href;
    var pattern = new RegExp(urlToMatch);

    return pattern.test(url);
}

function executeScript(scriptText) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode(scriptText));
    (document.body || document.head || document.documentElement).appendChild(script);
}