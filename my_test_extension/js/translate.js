chrome.storage.onChanged.addListener(translate);

translate();

function translate() {
    chrome.storage.sync.get(null, function(storage){
        if (storage.dictionaryMode != undefined && storage.dictionaryMode == true){
            dictionary = JSON.parse(storage.dictionary);
            $.each($("p"), function(index, paragraph) {
                var paragraph = $(paragraph);
                htmlString = paragraph.html();
                Object.keys(dictionary).forEach(function(key, index){
                    if (!dictionary[key].skipWord){
                        htmlString = htmlString.replace(key, '<element style="color:red; id="translation">' +  dictionary[key].translation + "</element>");
                    }
                });

                paragraph.html(htmlString);

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
            });
        }
    });
}

