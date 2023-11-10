function myFunction() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r","s", "t", "u", "v", "w", "x", "y", "z"];
    var pq = document.getElementById("pqinput").value;
    var e = document.getElementById("einput").value;
    var input = document.getElementById("letterinput").value;

    var output = Math.pow(alphabet.indexOf(input),e)%pq;

    document.getElementById("calculate").innerHTML = output;
  }