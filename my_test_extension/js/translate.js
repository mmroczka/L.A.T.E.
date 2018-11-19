chrome.storage.onChanged.addListener(translate);

// alert("ran translate page!");
translate();
function translate() {
    chrome.storage.sync.get(null, function(storage){
        if (storage.dictionaryMode != undefined && storage.dictionaryMode == true){
            dictionaryModeSwap();
            // buildDictionary();
        }
    });
}

function dictionaryModeSwap(){
    $.each($("p"), function(index, paragraph) {
        var $paragraph = $(paragraph);
        var pString = $paragraph.text();
        pString = pString.split(" ");
        var wordList = [];
        // assuming the pString isn't empty...
        if (pString[0] != "") {
            for (var wordIndex = 0; wordIndex < pString.length; wordIndex++){
                var word = pString[wordIndex];
                word = word.toLowerCase();
                // wordList.push(word);
                if (word in dictionary.data){
                    alert("The word (" + word + ") is in the dictionary!")
                } else{
                    alert("The word (" + word + ") is NOT in the dictionary!")
                }
            }
        }
    });
}

function buildDictionary(){
    dictAsString = ' { "data": [ [ "and", "et", "Duolingo", "false" ], [ "variety", "variété", "Duolingo", "false" ], [ "computer", "ordinateur", "Uploaded", "true" ], [ "and", "et", "Duolingo", "false" ], [ "variety", "variété", "Duolingo", "false" ], [ "computer", "ordinateur", "Uploaded", "true" ], [ "and", "et", "Duolingo", "false" ] ] }';

    dictionaryJson = JSON.parse(dictAsString);
    alert(JSON.stringify(dictionaryJson, null, 4));
    dictionary = {};
    for (var i = 0; i < dictionaryJson.length; i++){
        // var word = dictionaryJson[i].
    }

}
