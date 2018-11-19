// on page load
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("file").addEventListener('change', saveDictionaryFromFile, false);
});


function saveDictionaryFromFile(evt) {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        text = reader.result;
        if (isValidJson(text)){
            alert("VALID JSON! SAVING OBJECT");
            var dictionary = isValidJson(text);
            // if ("and" in dictionary){
            //     alert("this is a good way to look things up ");
            // } else {
            //     alert("not a good way");
            // }
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

// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     for (key in changes) {
//         var storageChange = changes[key];
//         alert('Storage key ' + key + ' in namespace ' + namespace + ' changed. Old value was ' + storageChange.oldValue + ', new value is ' + storageChange.newValue);
//     }
// });
