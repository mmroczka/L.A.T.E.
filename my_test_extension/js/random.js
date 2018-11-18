// When page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Settings
    rememberPreviousSettings();

    // Add randomMode Button
    document.getElementById("random_id").addEventListener("click", function() {
        saveChanges();
    });

    // Add languageFrom auto-save
    document.getElementById("languageFrom").addEventListener("click", function() {
        saveChanges();
    });

    // Add languageTo auto-save
    document.getElementById("languageTo").addEventListener("click", function() {
        saveChanges();
    });

    // Add useDictionary auto-save
    document.getElementById("useDictionary").addEventListener("click", function() {
        saveChanges();
    });

    // Add paragraphLimit auto-save
    document.getElementById("paragraphLimit").addEventListener("click", function() {
        saveChanges();
    });

    // Add percent auto-save
    document.getElementById("percent").addEventListener("click", function() {
        saveChanges();
    });

    // Add percent auto-save
    document.getElementById("number").addEventListener("click", function() {
        saveChanges();
    });

    // Add percent auto-save
    document.getElementById("percentValue").addEventListener("click", function() {
        saveChanges();
    });

    // Add percent auto-save
    document.getElementById("percentType").addEventListener("click", function() {
        saveChanges();
    });
});

function saveChanges() {
    // Save it using the Chrome extension storage API.
    // alert(JSON.stringify(v, null, 4));
    var percentOrNumber = "number";
    if(document.getElementById("percent").checked == true){
        // percentage is selected so save it
        percentOrNumber = "percent";
    }
    chrome.storage.sync.set({'randomMode': $('#random_id').is(":checked"),
        'languageFrom': $('#languageFrom option:selected').val(),
        'languageTo': $('#languageTo option:selected').val(),
        'useDictionary': $('#useDictionary').is(":checked"),
        'paragraphLimit': $('#paragraphLimit option:selected').val(),
        'percentOrNumber': percentOrNumber,
        'percentValue': $('#percentValue option:selected').val(),
        'percentType': $('#percentType option:selected').val(),
        'numberValue': $('#numberValue option:selected').val()
    });

}

function rememberPreviousSettings(){
    chrome.storage.sync.get(null, function(storage) {
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
