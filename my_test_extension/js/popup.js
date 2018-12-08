// on page load
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("file").addEventListener('change', saveDictionaryFromFile, false);

    // Add Dummy Dictionary Export Button action
    document.getElementById("export_dummy").addEventListener("click", function() {
        var dummy = JSON.parse(createDummyDictionary());
        var data = JSON.stringify(dummy);
        const filename = 'dummy_dictionary.txt';
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });
});

function createDummyDictionary(){
    var dictionary = {
        "and": {
            "translation": "et",
                "source": "Uploaded",
                "skipWord": false
        },
        "computer": {
            "translation": "ordinateur",
            "source": "Uploaded",
            "skipWord": false
        },
        "new": {
            "translation": "nouveau",
            "source": "Uploaded",
            "skipWord": false
        }
    };
    return JSON.stringify(dictionary);
};
function saveDictionaryFromFile(evt) {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        text = reader.result;
        if (isValidJson(text)){
            alert("VALID JSON! SAVING OBJECT");
            var dictionary = isValidJson(text);
            chrome.storage.sync.set({'dictionary': JSON.stringify(dictionary)});
        } else {
            alert("INVALID JSON!");
        }
    }

    reader.onerror = function(err) {
        alert("An error occurred during upload");
    }

    reader.readAsText(evt.target.files[0]);
}

function isValidJson(jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) {
        alert("Not a valid JSON file!");
    }

    return false;
};
