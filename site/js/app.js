
function loadWords(){
  postRequest('resources/loadWords.php',
  function(result){
    //console.log(result);
    let res = JSON.parse(result);
    let target=document.getElementById('wordBank');
    //console.log(res);
    for(let partsOfSpeech=0;partsOfSpeech<res.length;partsOfSpeech++){
      for(let wordsInParts=0;wordsInParts<10;wordsInParts++){
        let rand = Math.floor((Math.random() * res[partsOfSpeech].length));

        //console.log(res[i][rand]);        
        //let wordActual = document.createTextNode(res[i][rand]);
        let specWord = document.createElement("h3")
        specWord.id=res[partsOfSpeech][rand];
        specWord.textContent = res[partsOfSpeech][rand];
        if(partsOfSpeech===0){specWord.setAttribute('target',"noun");}
        if(partsOfSpeech===1){specWord.setAttribute('target',"verb");}
        if(partsOfSpeech===2){specWord.setAttribute('target',"adjective");}
        if(partsOfSpeech===3){specWord.setAttribute('target',"adverb");}
        //specWord.appendChild(wordActual);
        target.appendChild(specWord)
        //console.log(specWord);

      }
      
    }


    var divs = Array.from(target.getElementsByTagName('h3'));
    console.log(divs);
    for(var divPull = 0; divPull < divs.length; divPull++) {
      target.removeChild(divs[divPull]);
    }
    
    divs=shuffle(divs);    
    
    for(var shuffleOut = 0; shuffleOut < divs.length; shuffleOut++) {
      let outRand = divs[shuffleOut].cloneNode(true);
      outRand.draggable='true';
      outRand.style='display: inline-flex; margin: 3px; cursor: grabbing; border: 4px solid black; border-radius: 5px;';
      
      outRand.addEventListener('dragstart',function(){
        drag(event);          
      });
      target.appendChild(outRand);
    }

  },
  function(result){console.log(result);},
  null);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var appDiv = document.getElementById(data);
    ev.target.appendChild(appDiv);

    var actualTargetValue = appDiv.getAttribute('target');
    if(actualTargetValue===event.target.id)
    {
        appDiv.style = "display: inline-flex; margin: 3px; cursor: grabbing; border: 4px solid green; border-radius: 5px;";
    }else{
        appDiv.style = "display: inline-flex; margin: 3px; cursor: grabbing; border: 4px solid red; border-radius: 5px;";
    }
    
}


docReady(function() {
  loadWords();

});
