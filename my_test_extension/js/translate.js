chrome.storage.onChanged.addListener(translate);

translate();

function translate() {
    chrome.storage.sync.get(null, function(storage){
        if (storage.dictionaryMode != undefined && storage.dictionaryMode == true){
            dictionary = JSON.parse(storage.dictionary);
            $.each($("p"), function(index, paragraph) {
                var paragraph = $(paragraph);
                var pText = paragraph.text();
                pText = pText.split(" ");
                htmlString = paragraph.html();
                if (pText != ""){
                    Object.keys(dictionary).forEach(function(key, index){
                        if (!dictionary[key].skipWord){
                            var regex = new RegExp("[>]([^<]*)(?![^a-z|A-Z])(" + key + ")(?=[^a-r|A-R|t-z|T-Z])([^<]*)", "gi");
                            let paragraphMatches = getMatches(htmlString, regex);
                            if (paragraphMatches.length > 0){
                                for (var i = 0; i < paragraphMatches.length; i++){
                                    var translatedWord = dictionary[key].translation;
                                    var match = paragraphMatches[i];
                                    var beginningElement = '<element style="color:' + storage.wordColor + '; id="translation">' + ' ';
                                    var endingElement = ' ' + '</element>';
                                    if (match[2].charAt(0) == key.charAt(0).toUpperCase()){
                                        // word we are translating is uppercase, so change key to uppercase to match it
                                        translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
                                    }
                                    if (/[^a-z|A-Z]/i.test(match[1].substr(-1))){
                                        // if there is something non-alphanumeric right before our keyword it's probably a hyphenated word or a punction of some type, so don't add a space
                                        beginningElement = '<element style="color:' + storage.wordColor + '; id="translation">';
                                    }
                                    if (match[0].toLowerCase().includes(key+'s')){
                                        // word is most likely plural so don't add space at the end to keep the original word's "s"
                                        endingElement = "</element>";
                                    }

                                    var fullTextToSwap = ">" + match[1] + beginningElement + translatedWord + endingElement + match[3];
                                    htmlString = htmlString.replace(match[0], fullTextToSwap);
                                }
                            }
                        }
                    });

                    paragraph.html(htmlString);
                }
            });
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
