// When page is fully loaded
document.addEventListener('DOMContentLoaded', function () { // Settings
    rememberPreviousSettings();

    // Add dictionaryMode Button action
    document.getElementById("dictionary_id").addEventListener("click", function() {
        saveChanges();
    });

    // Add Upload Button action
    document.getElementById("upload").addEventListener("click", function() {
        window.open("html/popup.html", "Upload Your Dictionary", "height=500,width=500");
    });

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

    dictionary = {}
    chrome.storage.sync.get(null, function(storage) {
        if (storage.dictionary !== undefined){
            dictionary = JSON.parse(storage.dictionary);
            Object.keys(dictionary).forEach(function(key, index){
                table.row.add(new Word(key, dictionary[key].translation, dictionary[key].source, dictionary[key].skipWord));
            });

            table.draw();

        }
    });

} );

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
