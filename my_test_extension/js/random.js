// When page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Settings
    rememberPreviousSettings();

    // Add randomMode Button
    document.getElementById("random_id").addEventListener("click", function() {
        saveChanges();
    });
});

function saveChanges() {
    // Save it using the Chrome extension storage API.
    var randomMode = $('#random_id').is(":checked");
    chrome.storage.sync.set({'randomMode': randomMode});
}

function rememberPreviousSettings(){
    chrome.storage.sync.get(null, function(storage) {
        // alert(JSON.stringify(storage, null, 4));
        if (storage.randomMode === undefined){
            chrome.storage.sync.set({'randomMode': false});
        }
        else{
            $('#random_id').prop("checked", storage.randomMode)
        }

    });
}
