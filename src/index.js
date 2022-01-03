'use strict';

function attachListeners() {
  const operatorRE = /^([+]|[-]|[x]|[÷])$/g;


    function factorialize(num) {
      if (num < 0) 
            return -1;
      else if (num == 0) 
          return 1;
      else {
          return (num * factorialize(num - 1));
      }
    }
    
    function ncr(n, r) {
        r = Math.min(r, n-r);
        var numerator = factorialize(n);
        var denominator = factorialize(r) * factorialize(n-r);
        return numerator/denominator;
    }


    
    function sim () {
        var name = document.getElementById("name").value;
        var region = document.getElementById("region").value;
        var server = document.getElementById("server").value;
        
        var theURL = "https://raider.io/api/v1/characters/profile?region="+region+"&realm="+server+"&name="+name+"&fields=mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_best_runs%2Cmythic_plus_alternate_runs";
        var xhttp = new XMLHttpRequest();

	var dungeons = ["The Necrotic Wake", "Spires of Ascension", "Plaguefall", "Theater of Pain", "De Other Side", "Mists of Tirna Scithe", "Halls of Atonement", "Sanguine Depths"]
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
       			// Typical action to be performed when the document is ready:
			var info_json = JSON.parse(xhttp.responseText)
			var score = info_json.mythic_plus_scores_by_season[0].scores.all;
			var dungeon_score = {};
			for (var x of info_json.mythic_plus_best_runs){
				dungeon_score[x.dungeon] = {"level": x.mythic_level, "score":x.score, "affix":x.affixes[0].id}
			}
       			document.getElementById("output").innerHTML = JSON.stringify(dungeon_score); }
	};
	xhttp.open("GET", theURL, true);
	xhttp.send();
	    
    }
    
    document.querySelector('.simBtn')
        .addEventListener('click', sim);
}
// call attach event listeners function
attachListeners();
