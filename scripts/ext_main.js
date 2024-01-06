

//load scirpt with name and delete icon
function renderManageScriptLine(urlItem) {
  var script = document.createElement('div');
  script.className = "script";

  var scriptName = document.createElement('div');
  scriptName.className = "scriptName";
  scriptName.innerHTML = urlItem.urlPattern;
  script.appendChild(scriptName);

  var scriptDelete = document.createElement('button');
  scriptDelete.className = "scriptDelete";
  scriptDelete.innerHTML = "X";
  scriptDelete.onclick = function () {
    removeScriptForUrlPattern(urlItem.urlPattern);
    initScriptToManage();
  }
  script.appendChild(scriptDelete);
  
  document.getElementById("scripts").appendChild(script);
}

//load all scripts
function initScriptToManage() {
  document.getElementById("scripts").innerHTML = "";
  uiGetStore().then((store) => {
    store.urlItems.forEach((urlItem) => {
      renderManageScriptLine(urlItem);
    })
  })
}

//load all scripts on page load
initScriptToManage();

// change the onsumbit from the form #newScriptForm to save the script

document.getElementById("newScriptForm").onsubmit = function () {

  var urlPattern = document.getElementById("url").value;
  var script = document.getElementById("script").value;

  setNewScriptForUrlPattern(urlPattern, script).then(() => {

    initScriptToManage();
  });

  return false;
}
