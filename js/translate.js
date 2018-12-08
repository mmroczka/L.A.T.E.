chrome.storage.onChanged.addListener(translate);

translate();

function translate() {
    chrome.storage.sync.get(null, function(storage){
        if (storage.dictionaryMode != undefined && storage.dictionaryMode == true){
            dictionary = JSON.parse(storage.dictionary);
            var changeWordColor = "";
            if (storage.changeWordColor == true){
                changeWordColor = 'style="color:' + storage.wordColor + '";';
            }
            var dictionaryTranslationsCount = 0;

            var bodyElement = document.getElementsByTagName("BODY")[0];
            var bodyHTML = bodyElement.outerHTML;
            Object.keys(dictionary).forEach(function(key, index){
                if (!dictionary[key].skipWord){
                    let paragraphMatches = [];
                    var regex = new RegExp("[>]([^<]*)(?![^a-z|A-Z])(" + key + ")([^<]*)", "gi");
                    paragraphMatches = getMatches(bodyHTML, regex);
                    if (paragraphMatches.length > 0){
                        for (var i = 0; i < paragraphMatches.length; i++){
                            var translatedWord = dictionary[key].translation;
                            var match = paragraphMatches[i];
                            var tooltip = "";
                            if (storage.tooltip){
                                tooltip = 'data-tippy="' + match[2] + '" data-tippy-delay="500" data-tippy-animation="perspective"';
                            }
                            var beginningElement = '<element ' + changeWordColor + ' id="translation' + dictionaryTranslationsCount + '" ' + tooltip + '>' + ' ';
                            var endingElement = ' ' + '</element>';
                            if (match[2].charAt(0) == key.charAt(0).toUpperCase()){
                                // word we are translating is uppercase, so change key to uppercase to match it
                                translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
                            }
                            var fullTextToSwap = ">" + match[1] + beginningElement + translatedWord + endingElement + match[3];
                            bodyHTML = bodyHTML.replace(match[0], fullTextToSwap);
                            dictionaryTranslationsCount += 1;
                        }
                    }
                }
            });
            bodyElement.outerHTML = bodyHTML;
        }
    });
}

function getMatches(str, regex) {
    var matches = [];
    var match;

    if (regex.global) {
        regex.lastIndex = 0;
    } else {
        regex = new RegExp(regex.source, 'g' +
            (regex.ignoreCase ? 'i' : '') +
            (regex.multiline ? 'm' : '') +
            (regex.sticky ? 'y' : ''));
    }

    while (match = regex.exec(str)) {
        // If you want to use regex.lastIndex in this loop, you'd need more
        // code here to fix IE < 9

        matches.push(match);

        if (regex.lastIndex === match.index) {
            regex.lastIndex++;
        }
    }

    return matches;
}
