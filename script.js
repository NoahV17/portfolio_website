$('#c_code').on('change',function(){
  $('#code').val($(this).val());
});

//Code Block 1. Used for Encryption App

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

    document.getElementById("encrypted_output").innerHTML = output;
  }


//Code block 2. Used for Currency Exchange App

var https = require('https');

function convertCurrency(amount, fromCurrency, toCurrency, cb) {
  var apiKey = 'your-api-key-here';

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  var query = fromCurrency + '_' + toCurrency;

  var url = 'https://free.currconv.com/api/v7/convert?q='
            + query + '&compact=ultra&apiKey=' + apiKey;

  https.get(url, function(res){
      var body = '';  

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          try {
            var jsonObj = JSON.parse(body);

            var val = jsonObj[query];
            if (val) {
              var total = val * amount;
              cb(null, Math.round(total * 100) / 100);
            } else {
              var err = new Error("Value not found for " + query);
              console.log(err);
              cb(err);
            }
          } catch(e) {
            console.log("Parse error: ", e);
            cb(e);
          }
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
        cb(e);
  });
}
