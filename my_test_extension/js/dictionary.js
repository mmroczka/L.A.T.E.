$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": "data/dummy_dictionary.txt",
        "scrollY": "200px",
        "scrollCollapse": true,
        "paging": false
    } );
} );

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

