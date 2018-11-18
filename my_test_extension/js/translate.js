chrome.storage.onChanged.addListener(translate);

// alert("ran translate page!");
translate();
function translate() {
    // alert("ran translate function!");
    chrome.storage.sync.get(null, function(storage){
        if (storage.dictionaryMode != undefined && storage.dictionaryMode == true){
            dictionaryModeSwap();
        }
    });
}

function dictionaryModeSwap(){
    dictAsString = ' { "data": [ [ "and", "et", "Duolingo", "false" ], [ "variety", "variété", "Duolingo", "false" ], [ "computer", "ordinateur", "Uploaded", "true" ], [ "and", "et", "Duolingo", "false" ], [ "variety", "variété", "Duolingo", "false" ], [ "computer", "ordinateur", "Uploaded", "true" ], [ "and", "et", "Duolingo", "false" ] ] }';

    var pTags = document.querySelectorAll("p");
    // alert(JSON.stringify(pTags, null, 4));
    pTags[0].style.backgroundColor = "red";

    console.log(pTags[0].text());
    alert(pTags.length);
    var test = p[0].text();
    alert("test" + test.split(" "));
    for (var p = 0; p < pTags.length; p++){
        alert("in for loop");
        words = p[i].text();
        alert(words);
    }
}
