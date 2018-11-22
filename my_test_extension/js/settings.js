// When page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to checkboxes
    var checkboxes = document.querySelectorAll('input.subOption'),
        checkall = document.getElementById('tooltip');

    for(var i=0; i<checkboxes.length; i++) {
        checkboxes[i].onclick = function() {
            var checkedCount = document.querySelectorAll('input.subOption:checked').length;

            checkall.checked = checkedCount > 0;
            checkall.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
        }
    }

    checkall.onclick = function() {
        for(var i=0; i<checkboxes.length; i++) {
            checkboxes[i].checked = this.checked;
        }
    }

    rememberPreviousSettings();

    // Add event listener to Save button
    document.getElementById("save").addEventListener("click", function() {
        saveChanges();
    });
});

function saveChanges() {
    alert("Changes Saved!");
    chrome.storage.sync.set({'tooltip': $('#tooltip').is(":checked"),
        'audioLink': $('#audioLink').is(":checked"),
        'pronounciationGuide': $('#pronounciationGuide').is(":checked"),
        'addWord': $('#addWord').is(":checked"),
        'changeWordColor': $('#changeWordColor').is(":checked"),
        'wordColor': document.getElementById("wordColor").value
    });
}

function rememberPreviousSettings(){
    chrome.storage.sync.get(null, function(storage) {
        // alert(JSON.stringify(storage, null, 4));

        // Get the elements values from when we last loaded the checkboxes
        var tooltip = $('#tooltip');
        var audioLink= $('#audioLink');
        var pronounciationGuide = $('#pronounciationGuide');
        var addWord = $('#addWord');
        var changeWordColor = $('#changeWordColor');
        var wordColor = document.getElementById("wordColor");

        // Get the values from when we last loaded the checkboxes and set all checkboxes except tooltip
        audioLink.prop("checked", storage.audioLink);
        pronounciationGuide.prop("checked", storage.pronounciationGuide);
        addWord.prop("checked", storage.addWord);
        changeWordColor.prop("checked", storage.changeWordColor)
        wordColor.value = storage.wordColor;
        // Determine if we need to set tooltip to indeterminate or just set it to a boolean true/false
        if ((storage.audioLink === false || storage.addWord === false || storage.pronounciationGuide === false) && (storage.audioLink === true || storage.addWord === true || storage.pronounciationGuide === true)){
            // alert("We have deduced that tooltip was indeterminate on last load");
            tooltip.prop("indeterminate", true);
        }
        else{
            tooltip.prop("checked", storage.tooltip);
        }
    });
}
