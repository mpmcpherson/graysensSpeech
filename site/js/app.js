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

  loadPeople(uid, "array_of_people");

  loadTodaysPeople(uid, "array_of_people_today");

  loadAllEvents(uid, "array_of_events");



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

function login(){

  let data = JSON.stringify({ 
    "userName" : document.getElementById("username").value,
    "userPass" : document.getElementById("userPass").value
  });
  postRequest('resources/login.php',function(response){
    try{
      let result = JSON.parse(response);
      let loginSignup = document.getElementById("login_signup");
      let container = document.getElementById("container");
      window.localStorage.setItem("userId",result[1]);
      window.localStorage.setItem("sessionToken",result[2]);
      loadUI();

      container.style.display = "flex";
      loginSignup.style.display = "none";
      return true;
    }catch(e){
      console.log(e);
    }
  },function(response){
    try{
      console.log(response);
    }catch(e){
      console.log(e);
    }
  },
  data
  );
  return false;
}

function register(){
  //this is gonna be a little involved
  //and I'm going to need to use the google recaptcha project to 
  //display the recaptcha panel when the user clicks the 
  //btn for signing up

  let data = JSON.stringify({ 
    "userName" : document.getElementById("username").value,
    "userPass" : document.getElementById("userPass").value
  });
  postRequest('resources/createuser.php',function(response){
    try{
      //window.location.reload(false); 
    }catch(e){
      console.log(e);
    }
  },function(response){
    try{
      console.log(response);
      alert("there was an issue creating your account: ".response);
    }catch(e){
      console.log(e);
    }
  },
  data
  );
}

function loginOrRegister(){
  //hide wrapper and its contents; 
  //show login modal; 
  let loginSignup = document.getElementById("login_signup");
  let container = document.getElementById("container");
  container.style.display = "none";
  loginSignup.style.display = "flex";

  let loginBtn = document.getElementById("login_btn");
  let signupBtn = document.getElementById("signup_btn");
  
  loginBtn.addEventListener("click",function(){
    login();
  });

  signup_btn.addEventListener("click",function(){
    register();
    //I should probably set this up to dynamically handle whatever the fuck gets pulled back from the signup process

  });  
}


docReady(function() {
  globalClickListener();
  keypressListener();

  loginOrRegister();

});

//192.168.1.127

//192.168.1.124

