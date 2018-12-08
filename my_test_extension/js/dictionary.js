// When page is fully loaded
document.addEventListener('DOMContentLoaded', function () { // Settings
    rememberPreviousSettings();

    // Add dictionaryMode Button action
    document.getElementById("dictionary_id").addEventListener("change", function() {
        saveChanges();
    });

    // Add Upload Button action
    document.getElementById("upload").addEventListener("click", function() {
        window.open("html/popup.html", "Upload Your Dictionary", "height=500,width=500");
    });

    // Add Export Button action
    document.getElementById("export").addEventListener("click", function() {
        chrome.storage.sync.get(null, function(storage) {
            dictionary = JSON.parse(storage.dictionary);
            var data = JSON.stringify(dictionary);
            const filename = 'my_dictionary.txt';
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        })
    });

    // Add Clear Button action
    document.getElementById("clear").addEventListener("click", function() {
        chrome.storage.sync.set({'dictionary': "{}"});
        document.location.reload(true);
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

function saveFile (name, type, data) {
    if (data != null && navigator.msSaveBlob)
        return navigator.msSaveBlob(new Blob([data], { type: type }), name);

    var a = $("<a style='display: none;'/>");
    var url = window.URL.createObjectURL(new Blob([data], {type: type}));
    a.attr("href", url);
    a.attr("download", name);
    $("body").append(a);
    a[0].click();
    setTimeout(function(){  // fixes firefox html removal bug
        window.URL.revokeObjectURL(url);
        a.remove();
    }, 500);
}

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
        // Save initial settings for Dictionary Mode page
        if (storage.dictionaryMode === undefined){
            chrome.storage.sync.set({'dictionaryMode': false});
        }
        else{
            $('#dictionary_id').prop("checked", storage.dictionaryMode)
        }

        // Save initial settings for Random Mode page
        if (storage.randomMode === undefined || storage.languageFrom === undefined
            || storage.languageTo === undefined || storage.useDictionary === undefined
            || storage.paragraphLimit === undefined || storage.percentageOrNumber === undefined
            || storage.percentValue === undefined || storage.percentType === undefined
            || storage.numberValue === undefined){
            chrome.storage.sync.set({'randomMode': false,
                'languageFrom': "Detect Language",
                'languageTo': "French",
                'useDictionary': true,
                'paragraphLimit': 3,
                'percentOrNumber': "percent",
                'percentValue': 10,
                'percentType': "words",
                'numberValue': 5
            });
        }

        // Save initial settings for Settings page
        if (storage.tooltip === undefined || storage.audioLink === undefined
            || storage.pronounciationGuide === undefined || storage.addWord === undefined
            || storage.changeWordColor === undefined || storage.wordColor === undefined
        ){
            chrome.storage.sync.set({'tooltip': true,
                'audioLink': true,
                'pronounciationGuide': true,
                'addWord': true,
                'changeWordColor': true,
                'wordColor': "#FF3400"
            });
        }

    });
}

// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     for (key in changes) {
//         var storageChange = changes[key];
//         // alert('Storage key ' + key + ' in namespace ' + namespace + ' changed. Old value was ' + storageChange.oldValue + ', new value is ' + storageChange.newValue);
//     }
// });
