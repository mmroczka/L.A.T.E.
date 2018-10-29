
var __name__ = "__main__";
var a, b;
a = 10;
b = 30;
function addition() {
    document.getElementById("result").innerHTML = a + b;
}
document.getElementById("computebutton").addEventListener("click", addition());
