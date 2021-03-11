function globalClickListener(){
  let personModal = document.getElementById("addPersonModal");
  let eventModal = document.getElementById("addEventModal");
  let addPersonSubmission = document.getElementById("add_person_submission");
  let addEventSubmission = document.getElementById("add_event_submission");

  window.onclick = function(event) {

    if (event.target === personModal) {
      personAddHandler(personModal);
    }
    if (event.target === eventModal) {
     eventAddHandler(eventModal);
    }
    if(event.target===addPersonSubmission){
      addPersonActual();
    }
    if(event.target===addEventSubmission){
      addEventActual();
    }
  };


  // Get the button that opens the modal
  var btn = document.getElementById("addPerson");
  var eventBtn = document.getElementById("addEvent");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  var eventSpan = document.getElementsByClassName("close")[1];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    personModal.style.display = "block";
  };
  eventBtn.onclick = function(){
    eventModal.style.display = "block";
  };
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    personGeneralClose(personModal);
  };
  eventSpan.onclick = function(){
    eventGeneralClose(eventModal);
  };


}
//need to *actually* generalize an object-close method, but this'll do.
function personGeneralClose(targetObject){
  let newPerson = document.getElementById("newPerson");
    let email = document.getElementById("emailId");
    let freqAmt = document.getElementById("freqNum");
    let freqSelect = document.getElementById("freqSelect");

    newPerson.value="";
    email.value="";
    freqAmt.value="";
    freqSelect.value=0;

    targetObject.style.display = "none";
}

function eventGeneralClose(targetObject){
  let textArea = document.getElementById("eventText");
  let eventSubject = document.getElementById("eventSubject");
  let charCount = document.getElementById("charCount");
  textArea.value = "";
  eventSubject.innerHTML = "";
  charCount.innerHTML = "0";

  targetObject.style.display = "none";
}

function personAddHandler(personModal){
  let newPerson = document.getElementById("newPerson");
  let email = document.getElementById("emailId");
  let freqAmt = document.getElementById("freqNum");
  let freqSelect = document.getElementById("freqSelect");

  newPerson.value="";
  email.value="";
  freqAmt.value="";
  freqSelect.value=0;

  personModal.style.display = "none";
}
function eventAddHandler(eventModal){
  let textArea = document.getElementById("eventText");
  let eventSubject = document.getElementById("eventSubject");
  let charCount = document.getElementById("charCount");
  textArea.value = "";
  eventSubject.innerHTML = "";
  charCount.innerHTML = "0";

  eventModal.style.display = "none";
}
function addPersonActual(){
  let ary = document.getElementById("newPerson").value.split(" ");
  let count = document.getElementById("newPerson").value.length;

  let firstName = ary[0];
  let lastName = document.getElementById("newPerson").value.substring(firstName.length+1,count);
  let userId = getCookie(document.cookie, "userid");
  let intervalAmount = document.getElementById("freqNum").value;
  let intervalType = document.getElementById("freqSelect").value;
  let channelName = "email"; 
  let channelValue = document.getElementById("emailId").value;


  addPerson(firstName,lastName,userId,intervalAmount,intervalType,channelName,channelValue);
}
function addEventActual(){
  let EventTopic  = document.getElementById("eventSubject").value;
  let EventListing = document.getElementById("eventText").value;
  addEvent(EventListing, EventTopic);

}

function addEvent(EventListing, EventTopic) {
  let values = {
    "EventTopic" : EventTopic, 
    "EventListing": EventListing, 
    "userId" : getCookie(document.cookie, "userid")
  };
  let data = JSON.stringify(values);
 
  postRequest('resources/addEvent.php', 
    function(response){
      console.log("addevent response "+response);
      let d = "";
      try{
        d = JSON.parse(response);
        eventGeneralClose(document.getElementById("addEventModal"));
        alert(d);
      }catch(error){
        console.log("error "+error);
      }
  },
    function(response){
      console.log("error "+response);
      //resultDiv.innerHTML = 'An error occurred during your request: ' +  response.status + ' ' + response.statusText;
  },
  data);
}

function appendNodes(target,data){

  for(let i = 0; i<data.length; i++)
  {
    let nameContainer = document.createElement("div");
    nameContainer.id = data[i][0];
    let nameTextNode = "";
    if(typeof data[i][2]!=='undefined'){
      nameTextNode = document.createTextNode(data[i][1]+" "+data[i][2]);
    }else{
      nameTextNode = document.createTextNode(data[i][1]);
    }
    nameContainer.appendChild(nameTextNode);
    target.appendChild(nameContainer);
  }

}

function loadPeople(userId, targetDiv){ 
  let resultDiv = document.getElementById(targetDiv);
  resultDiv.innerHTML = "";
  userId = {"userId" : userId};
  let data = JSON.stringify(userId);
 
  postRequest('resources/loadPeople.php', 
    function(response){
      console.log("load people response "+response);
      let d = "";
      try{
        d = JSON.parse(response);
        appendNodes(resultDiv, d);
      }catch(error){
        console.log("load people error "+error);
      }
  },
    function(response){
      console.log("load people error "+response);
      resultDiv.innerHTML = 'An error occurred during your request: ' +  response.status + ' ' + response.statusText;
  },
  data);

}

function loadTodaysPeople(userId, targetDiv){
  let resultDiv = document.getElementById(targetDiv);
  userId = {"userId" : userId};
  let data = JSON.stringify(userId);

  postRequest('resources/loadtodayspeople.php', 
    function(response){
      console.log("load today's people response "+response);
      let d = "";
      try{
        d = JSON.parse(response);
        appendNodes(resultDiv, d);
      }catch(error){
        console.log("load today's people error "+error);
      }
  },
    function(response){
      console.log("load today's people error "+response);
      resultDiv.innerHTML = 'An error occurred during your request: ' +  response.status + ' ' + response.statusText;
  },
  data);

}
function loadAllEvents(userId, targetDiv){
  let resultDiv = document.getElementById(targetDiv);
  userId = {"userId" : userId};
  let data = JSON.stringify(userId);
  resultDiv.innerHTML="";

  postRequest('resources/loadAllEvents.php', 
    function(response){
      let d = "";
      try{
        d = JSON.parse(response);
        appendNodes(resultDiv, d);
      }catch(error){
        console.log("load all events error "+error);
      }
  },
    function(response){
      console.log("load all events error "+response);
      resultDiv.innerHTML = 'An error occurred during your request: ' +  response.status + ' ' + response.statusText;
  },
  data);

}
function loadEventsSinceLastContact(userId, personId, targetDiv){
  let resultDiv = document.getElementById(targetDiv);
  userId = {"userId" : userId};
  let data = JSON.stringify(userId);
  resultDiv.innerHTML="";

 
  postRequest('resources/loadEventsSinceLastContact.php', 
    function(response){
      console.log("load events since last contact "+response);
      let d = "";
      try{
        d = JSON.parse(response);
        appendNodes(resultDiv, d);
      }catch(error){
        console.log("load events since last contact error "+error);
      }
  },
    function(response){
      console.log(response);
      resultDiv.innerHTML = 'An error occurred during your request: ' +  response.status + ' ' + response.statusText;
  },
  data);

}
function addPerson(first_name, last_name, userId, intervalAmount, intervalType, channelName, channelValue){
  let values = {
    "first_name" : first_name, 
    "last_name": last_name, 
    "userId" : userId, 
    "intervalAmount" : intervalAmount,
    "intervalType" : intervalType, 
    "channelName" : channelName, 
    "channelValue" : channelValue
  };
  let data = JSON.stringify(values);
 
  postRequest('resources/addPerson.php', 
    function(response){
      console.log("add person response "+response);
      let d = "";
      try{
        d = JSON.parse(response);
        personGeneralClose(document.getElementById("addPersonModal"));
        loadPeople(getCookie(document.cookie, "userid"), "array_of_people");
        alert(d);
      }catch(error){
        console.log("add person error "+error);
      }
  },
    function(response){
      console.log("add person error "+response);
  },
  data);
}

function keypressListener(){
  let textArea = document.getElementById("eventText");
  let eventCount = document.getElementById("charCount");
  
  textArea.addEventListener("keypress",function(){
    if(textArea.value.length+1>400){
      textArea.value = textArea.value.substring(0, 400);
    }
    eventCount.innerHTML = textArea.value.length+1;
  });
}

function loadAllCurrentContacts(){}
function markContactTouched(){}

function loadUI(){
  let showHidePeopleButton = document.getElementById("showHidePeople");
  let showHideEventsButton = document.getElementById("showHideEvents");
  let mainDiv = document.getElementById("body");

  showHidePeopleButton.addEventListener("click", function(){
    toggleHiddenFlex("leftBar");
    if(mainDiv.className==="mainBody full"){ //if nothing is hidden
      mainDiv.className = "mainBodyLeftHidden full";
    }else if(mainDiv.className==="mainBodyLeftHidden full"){//if the left bar is hidden
      mainDiv.className = "mainBody full";
    }else if(mainDiv.className==="mainBodyRightHidden full"){//if the right bar is hidden
      mainDiv.className = "mainBodyAllHidden full";
    }else if (mainDiv.className==="mainBodyAllHidden full"){//if everything is hidden
      mainDiv.className = "mainBodyRightHidden full";
    }

  });

  showHideEventsButton.addEventListener("click", function(){
    toggleHiddenFlex("rightBar");
    if(mainDiv.className==="mainBody full"){ //if nothing is hidden
      mainDiv.className = "mainBodyRightHidden full";
    }else if(mainDiv.className==="mainBodyRightHidden full"){//if the left bar is hidden
      mainDiv.className = "mainBody full";
    }else if(mainDiv.className==="mainBodyLeftHidden full"){//if the right bar is hidden
      mainDiv.className = "mainBodyAllHidden full";
    }else if (mainDiv.className==="mainBodyAllHidden full"){//if everything is hidden
      mainDiv.className = "mainBodyLeftHidden full";
    }
  });


  let uid = getCookie(document.cookie, "userid");

  //loadPeople(uid, "array_of_people");

  //loadTodaysPeople(uid, "array_of_people_today");

  //loadAllEvents(uid, "array_of_events");



  //set up the peopleEventListener
  let peopleList = document.getElementById("array_of_people").children;
  console.log("people list "+peopleList);

  for(let listIndex = 0; listIndex < peopleList.length; listIndex++){
    (function(val){
      if(peopleList[val].tagName.toLowerCase()==="div"){
        let name = document.getElementById(peopleList[val].id);
        name.style.cursor = "pointer";
        peopleList[val].addEventListener("click", function(){
        loadEventsSinceLastContact(uid, peopleList[val].id, "array_of_events");
        });
      }
    })(listIndex);
  }

  //swap between having all people visible, and the due to contact people visible

  //swap between all events, and events 
}
function loadWords(){
  postRequest('resources/loadWords.php',
  function(result){
    //console.log(result);
    let res = JSON.parse(result);
    let target=document.getElementById('wordBank');
    //console.log(res);
    for(let i=0;i<res.length;i++){
      for(let j=0;j<10;j++){
        let rand = Math.floor((Math.random() * res[i].length));

        //console.log(res[i][rand]);        
        //let wordActual = document.createTextNode(res[i][rand]);
        let specWord = document.createElement("h3")
        specWord.id=res[i][rand];
        specWord.textContent = res[i][rand];
        if(i===0){specWord.setAttribute('target',"noun");}
        if(i===1){specWord.setAttribute('target',"verb");}
        if(i===2){specWord.setAttribute('target',"adjective");}
        if(i===3){specWord.setAttribute('target',"adverb");}
        //specWord.appendChild(wordActual);
        target.appendChild(specWord)
        //console.log(specWord);

      }
      
    }


    var divs = Array.from(target.getElementsByTagName('h3'));
    console.log(divs);
    for(var i = 0; i < divs.length; i++) {
      target.removeChild(divs[i]);
    }
    
    divs=shuffle(divs);    
    
    for(var i = 0; i < divs.length; i++) {
      let outRand = divs[i].cloneNode(true);
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
  //globalClickListener();
  //keypressListener();
  loadWords();
  loadUI();

});
