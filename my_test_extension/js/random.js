// When page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Settings
    rememberPreviousSettings();

    // Add randomMode Button
    document.getElementById("random_id").addEventListener("change", function() {
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

    // Add useDictionary auto-save
    document.getElementById("useDictionary").addEventListener("change", function() {
        saveChanges();
    });

    // Add paragraphLimit auto-save
    document.getElementById("paragraphLimit").addEventListener("change", function() {
        saveChanges();
    });

    // Add percent auto-save
    document.getElementById("percent").addEventListener("change", function() {
        saveChanges();
    });

    // Add percent auto-save
    document.getElementById("number").addEventListener("change", function() {
        saveChanges();
    });

    // Add percent auto-save
    document.getElementById("percentValue").addEventListener("change", function() {
        saveChanges();
    });

    // Add percent auto-save
    document.getElementById("percentType").addEventListener("change", function() {
        saveChanges();
    });
});

function saveChanges() {
    // Save it using the Chrome extension storage API.
    // alert(JSON.stringify(v, null, 4));
    chrome.storage.sync.set({'randomMode': $('#random_id').is(":checked")});
    chrome.storage.sync.set({'languageFrom': $('#languageFrom option:selected').val()});
    chrome.storage.sync.set({'languageTo': $('#languageTo option:selected').val()});
    chrome.storage.sync.set({'useDictionary': $('#useDictionary').is(":checked")});
    chrome.storage.sync.set({'paragraphLimit': $('#paragraphLimit option:selected').val()});

    if(document.getElementById("percent").checked == true){
        // percentage is selected so save it
        chrome.storage.sync.set({'percentOrNumber': "percent"});
    } else {
        chrome.storage.sync.set({'percentOrNumber': "number"});
    }

    chrome.storage.sync.set({'percentValue': $('#percentValue option:selected').val()});
    chrome.storage.sync.set({'percentType': $('#percentType option:selected').val()});
    chrome.storage.sync.set({'numberValue': $('#numberValue option:selected').val()});
}

function rememberPreviousSettings(){
    chrome.storage.sync.get(null, function(storage) {
        if (storage.randomMode === undefined || storage.languageFrom === undefined
            || storage.languageTo === undefined || storage.useDictionary === undefined
            || storage.paragraphLimit === undefined || storage.percentageOrNumber === undefined
            || storage.percentValue === undefined || storage.percentType === undefined
            || storage.numberValue === undefined){
            chrome.storage.sync.set({'randomMode': false});
            chrome.storage.sync.set({'languageFrom': "Detect Language"});
            chrome.storage.sync.set({'languageTo': "French"});
            chrome.storage.sync.set({'useDictionary': true});
            chrome.storage.sync.set({'paragraphLimit': 3});
            chrome.storage.sync.set({'percentOrNumber': "percent"});
            chrome.storage.sync.set({'percentValue': 10});
            chrome.storage.sync.set({'percentType': "words"});
            chrome.storage.sync.set({'numberValue': 5});
        }
        else{
            $('#random_id').prop("checked", storage.randomMode)
            var languageFromDropdown = document.getElementById("languageFrom");
            languageFromDropdown.value = storage.languageFrom;
            var languageToDropdown = document.getElementById("languageTo");
            languageToDropdown.value = storage.languageTo;
            $('#useDictionary').prop("checked", storage.randomMode)
            var paragraphLimit = document.getElementById("paragraphLimit");
            paragraphLimit.value = storage.paragraphLimit;
            if (storage.percentOrNumber === "percent"){
                // we've selected translate by percentage NOT translate by number
                document.getElementById("percent").checked = true;

            } else {
                document.getElementById("number").checked = true;
            }
            var percentValue = document.getElementById("percentValue");
            percentValue.value = storage.percentValue;
            var percentType = document.getElementById("percentType");
            percentType.value = storage.percentType;
            var numberValue = document.getElementById("numberValue");
            numberValue.value = storage.numberValue;
        }

    });
}
