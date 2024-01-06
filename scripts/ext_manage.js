const defaultStorage = {
  urlItems: [{
    urlPattern: "example.com",
    script: "alert('hello world')"
  }]
}

async function setNewScriptForUrlPattern(urlPattern, newScript) {
  return await uiGetStore().then((store) => {
    let found = false

    store.urlItems.forEach((urlItem) => {
      if (urlItem.urlPattern != urlPattern) {
        return
      }

      urlItem.script = newScript;
      found = true
    })

    if (!found) {
      store.urlItems.push({ urlPattern: urlPattern, script: newScript })
    }

    uiSetStore(store)
  })
}

async function removeScriptForUrlPattern(urlPattern) {
  return await uiGetStore().then((store) => {
    store.urlItems.forEach((urlItem) => {
      if (urlItem.urlPattern != urlPattern) {
        return
      }
      store.urlItems.splice(store.urlItems.indexOf(urlItem), 1)
    })

    uiSetStore(store)
  })
}