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
                            // if (index == 0){
                            //     // When at beginning of sentence, we don't need to add a space in the front
                            //     htmlString = htmlString.replace(key + " ", '<element style="color:red; id="translation">' +  dictionary[key].translation + " " + "</element>");
                            // } else if (index == pText.length) {
                            //     // When at end of sentence, we don't need to add a space at the back
                            //     htmlString = htmlString.replace(" " + key, '<element style="color:red; id="translation">' + " " +  dictionary[key].translation + "</element>");
                            // } else{
                            //     // When in the middle of a sentence, we need to add a space at the front and back
                            //     htmlString = htmlString.replace(" " + key + " ", '<element style="color:red; id="translation">' + " " + dictionary[key].translation + " " + "</element>");
                            // }
                            // htmlString = htmlString.replace(key + " ", '<element style="color:red; id="translation">' +  dictionary[key].translation + "</element>");
                            var translatedWord = '<element style="color:red; id="translation">' +  dictionary[key].translation + "</element>"
                            var regex = new RegExp("[>]([^<]*)(" + key + ")([^<]*)", "gi");
                            // alert(JSON.stringify(regex, null, 2));
                            let paragraphMatches = getMatches(htmlString, regex);
                            if (paragraphMatches.length > 0){
                                for (var i = 0; i < paragraphMatches.length; i++){
                                    // alert(JSON.stringify(paragraphMatches[i], null, 2));
                                    var match = paragraphMatches[i];
                                    var fullTextToSwap = ">" + match[1] + translatedWord + match[3];
                                    // alert("Swapping " + match[0] + "\n\nwith " + fullTextToSwap);
                                    htmlString = htmlString.replace(match[0], fullTextToSwap);
                                }
                            }
                            // var match;
                            // for (match in paragraphMatches){
                            //     if (match != 0){
                            //         alert(JSON.stringify(match[1], null, 2));
                            //     }
                            //     htmlString = htmlString.replace(key + " ", '<element style="color:red; id="translation">' +  dictionary[key].translation + "</element>");
                            // }
                        }
                    });

                    paragraph.html(htmlString);

                    // alternate way of replacing using regex and avoiding html tags
                    /*
                     *  var regex = /[>]([^<]*)(computer)([^<]*)/g
                     *  var translateWord = "ordinateur";
                     *   let result;
                     *   while(result = regex.exec(str)){
                     *     str = str.replace(result[1], ">" + translateWord);
                     *   }
                     *   console.log(str);
                     *
                     * */
                    // var pString = $paragraph.text();
                    // pString = pString.split(" ");
                    // // assuming the pString isn't empty...
                    // if (pString[0] != "") {
                    //     for (var wordIndex = 0; wordIndex < pString.length; wordIndex++){
                    //         var word = pString[wordIndex];
                    //         word = word.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
                    //         if (word.length > 0){
                    //             if (word in dictionary){
                    //                 alert("The word (" + word + ") translates to " + dictionary[word].translation);
                    //             }
                    //         }
                    //     }
                    // }
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
