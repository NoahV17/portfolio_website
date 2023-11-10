function myFunction() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r","s", "t", "u", "v", "w", "x", "y", "z"];
    var pq = document.getElementById("pqinput").value;
    var e = document.getElementById("einput").value;
    var input = document.getElementById("letterinput").value;
    var output = "";

    for (let index = 0; index < input.length; index++) {
      const element = input.substr(index, 1);
      output += Math.pow(alphabet.indexOf(element),e)%pq + " ";
    }

    document.getElementById("calculate").innerHTML = output;
  }