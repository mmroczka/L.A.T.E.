$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": "data/dummy_dictionary.txt",
        "scrollY": "200px",
        "scrollCollapse": true,
        "paging": false
    } );
} );


function saveChanges() {
    // Save it using the Chrome extension storage API.
    var dictionaryMode = $('#dictionary_id').is(":checked");
    chrome.storage.sync.set({'dictionaryMode': dictionaryMode});
}

function rememberPreviousSettings(){
    chrome.storage.sync.get(null, function(storage) {
        // alert(JSON.stringify(storage, null, 4));
        if (storage.dictionaryMode === undefined){
            alert("Undefined");
        } 
        else if (storage.dictionaryMode === true){
            $('#dictionary_id').prop("checked", storage.dictionaryMode)
        } else{
            $('#dictionary_id').prop("checked", storage.dictionaryMode)
        }

    });
}

document.addEventListener('DOMContentLoaded', function () {
    var dictionaryModeButton = document.getElementById("dictionary_id");
    rememberPreviousSettings();
    dictionaryModeButton.addEventListener("click", function() {
        saveChanges();
    });
});


// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     for (key in changes) {
//         var storageChange = changes[key];
//         // alert('Storage key ' + key + ' in namespace ' + namespace + ' changed. Old value was ' + storageChange.oldValue + ', new value is ' + storageChange.newValue);
//     }
// });

