$(document).ready(function() {
    var table = $('#example').DataTable( {
        columns : [
            {data: null, render: 'word'},
            {data: null, render: 'translation'},
            {data: null, render: 'source'},
            {data: null, render: 'skipWord'}
        ],
        "scrollY": "200px",
        "scrollCollapse": true,
        "paging": false
    });

    table.row.add(new Word("the", "et", "Duolingo", false));
    table.row.add(new Word("variety", "variété", "Duolingo", false));
    table.row.add(new Word("computer", "ordinateur", "Upload", true));
    table.draw();
} );

function getDictionary(){
    chrome.storage.sync.get(null, function(storage) {
        if (storage.dictionary === undefined){
            return JSON.parse(storage.dictionary);
        } else{
            return JSON.parse(storage.dictionary);
        }
    });
};

function getDictionaryFromFile(){
};



function Word (word, translation, source, skipWord){
    this._word = word;
    this._translation = translation;
    this._source = source;
    this._skipWord = skipWord;

    this.word = function (){
        return this._word;
    }
    this.translation = function (){
        return this._translation;
    }
    this.source = function (){
        return this._source;
    }
    this.skipWord = function (){
        return this._skipWord;
    }
};

// When page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Settings
    rememberPreviousSettings();

    // Add dictionaryMode Button
    document.getElementById("dictionary_id").addEventListener("click", function() {
        saveChanges();
    });
});


function saveChanges() {
    // Save it using the Chrome extension storage API.
    var dictionaryMode = $('#dictionary_id').is(":checked");
    chrome.storage.sync.set({'dictionaryMode': dictionaryMode});
}

function rememberPreviousSettings(){
    chrome.storage.sync.get(null, function(storage) {
        // alert(JSON.stringify(storage, null, 4));
        if (storage.dictionaryMode === undefined){
            chrome.storage.sync.set({'dictionaryMode': false});
        }
        else{
            $('#dictionary_id').prop("checked", storage.dictionaryMode)
        }

    });
}


// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     for (key in changes) {
//         var storageChange = changes[key];
//         // alert('Storage key ' + key + ' in namespace ' + namespace + ' changed. Old value was ' + storageChange.oldValue + ', new value is ' + storageChange.newValue);
//     }
// });

