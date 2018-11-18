chrome.storage.onChanged.addListener(translate);

// alert("ran translate page!");
translate();
function translate() {
    chrome.storage.sync.get(null, function(storage){
        if (storage.dictionaryMode != undefined && storage.dictionaryMode == true){
            dictionaryModeSwap();
        }
    });
}

function dictionaryModeSwap(){
    dictAsString = ' { "data": [ [ "and", "et", "Duolingo", "false" ], [ "variety", "variété", "Duolingo", "false" ], [ "computer", "ordinateur", "Uploaded", "true" ], [ "and", "et", "Duolingo", "false" ], [ "variety", "variété", "Duolingo", "false" ], [ "computer", "ordinateur", "Uploaded", "true" ], [ "and", "et", "Duolingo", "false" ] ] }';
    alert("in dictionaryModeSwap");
    var pTags = $("p").text();
    alert(JSON.stringify(pTags, null, 4));
    var pTagz = $("p").html();
    alert(JSON.stringify(pTagz, null, 4));
}
