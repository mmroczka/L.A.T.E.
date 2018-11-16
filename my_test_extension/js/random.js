// When page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Settings
    rememberPreviousSettings();

    // Add randomMode Button
    document.getElementById("random_id").addEventListener("click", function() {
        saveChanges();
    });

    // Add languageFrom auto-save
    document.getElementById("languageFrom").addEventListener("change", function() {
        saveChanges();
    });

    // Add languageTo auto-save
    document.getElementById("languageTo").addEventListener("change", function() {
        saveChanges();
    });
});

function saveChanges() {
    // Save it using the Chrome extension storage API.
    var v = $('#languageFrom option:selected').val();
    alert(JSON.stringify(v, null, 4));
    chrome.storage.sync.set({'randomMode': $('#random_id').is(":checked")});
    chrome.storage.sync.set({'languageFrom': $('#languageFrom option:selected').val()});
    chrome.storage.sync.set({'languageTo': $('#languageTo option:selected').val()});
}

function rememberPreviousSettings(){
    chrome.storage.sync.get(null, function(storage) {
        alert(JSON.stringify(storage, null, 4));
        if (storage.randomMode === undefined || storage.languageFrom === undefined || storage.languageTo === undefined){
            alert("something undefined");
            chrome.storage.sync.set({'randomMode': false});
            chrome.storage.sync.set({'languageFrom': "Detect Language"});
            chrome.storage.sync.set({'languageTo': "French"});
        }
        else{
            $('#random_id').prop("checked", storage.randomMode)
            $('#languageFrom').value = storage.languageFrom;
            $('#languageTo').value = storage.languageTo;
        }

    });
}
