document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById("click-this");
    link.addEventListener("click", function() {
        hellYeah('xxx');
    });
});

function hellYeah(text) {
  document.getElementById("text-holder").innerHTML = text;
}

