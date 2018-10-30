document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById("click-this");
    link.addEventListener("click", function() {
        hellYeah('xxx');
    });
});

function hellYeah(text) {
  document.getElementById("text-holder").innerHTML = text;
}

$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": "data/dummy_dictionary.txt",
        "scrollY": "200px",
        "scrollCollapse": true,
        "paging": false
    } );
} );
