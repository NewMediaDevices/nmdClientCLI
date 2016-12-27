

module.exports = function(local){
  var Ω = {};
  Ω.inputPort = 46697;
  Ω.outputPort = 12345;
  Ω.address = "127.0.0.1";
  Ω.serverAddress = "http://nmdserver.herokuapp.com";

  return Ω;
}
