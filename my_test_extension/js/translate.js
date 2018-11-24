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
            $.each($("p"), function(index, paragraph) {
                var paragraph = $(paragraph);
                htmlString = paragraph.html();
                Object.keys(dictionary).forEach(function(key, index){
                    if (!dictionary[key].skipWord){
                        var regex = new RegExp("[<][^>]*( " + key + " )", "gi");
                        let paragraphMatches = getMatches(htmlString, regex);
                        if (paragraphMatches.length > 0){
                            for (var i = 0; i < paragraphMatches.length; i++){
                                htmlString = htmlString.replace(" " + key + " ", " HACKYWAYTOSOLVEAPROBLEM_"+key+" ");
                                alert("swapping " + key + " for HACKYWAYTOSOLVEAPROBLEM_"+ key+" ");
                            }

                        }

                    }
                });
                Object.keys(dictionary).forEach(function(key, index){
                    var tooltip = "";
                    if (storage.tooltip){
                        tooltip = 'data-tippy="' + key + '" data-tippy-delay="500" data-tippy-animation="perspective"';
                    }
                    var translatedWord = " " + dictionary[key].translation + " ";
                    var beginningElement = '<element ' + changeWordColor + ' id="translation' + dictionaryTranslationsCount + '" ' + tooltip + '>' + ' ';
                    var endingElement = ' ' + '</element>';

                    var fullTextToSwap = beginningElement + translatedWord + endingElement;
                    htmlString = htmlString.replace(key, fullTextToSwap);
                    alert("swapping " + key + " for " + fullTextToSwap);
                    dictionaryTranslationsCount += 1;
                });
                Object.keys(dictionary).forEach(function(key, index){
                    if (!dictionary[key].skipWord){
                        var regex = new RegExp("[<][^>]*( " + "HACKYWAYTOSOLVEAPROBLEM_" + key + " )", "gi");
                        let paragraphMatches = getMatches(htmlString, regex);
                        if (paragraphMatches.length > 0){
                            for (var i = 0; i < paragraphMatches.length; i++){
                                htmlString = htmlString.replace(" HACKYWAYTOSOLVEAPROBLEM_"+key, " " + key + " ");
                                alert("swapping HACKYWAYTOSOLVEAPROBLEM_" + key + " for " + key);
                            }

                        }

                    }
                });
                paragraph.html(htmlString);
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
