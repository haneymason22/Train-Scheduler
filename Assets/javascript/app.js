var config = {
    apiKey: "AIzaSyDlJKO91V0V4pf3-3gGOPmaZix6HQOxLr4",
    authDomain: "train-scheduler-fd410.firebaseapp.com",
    databaseURL: "https://train-scheduler-fd410.firebaseio.com",
    projectId: "train-scheduler-fd410",
    storageBucket: "train-scheduler-fd410.appspot.com",
    messagingSenderId: "774611419700",
    appId: "1:774611419700:web:fa940527ebf5bbbf5a4061",
    measurementId: "G-G0FSLZ2NBY"
  };
  
  firebase.initializeApp(config);
  firebase.analytics();

  var database = firebase.database();

  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
   
    var nameInput = $("#train-name-input").val().trim();
    var destinationInput = $("#train-destination-input").val().trim();
    var timeInput = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
    var frequencyInput = $("#train-frequency-input").val().trim();
  
    var newTrain = {
      name: nameInput,
      destination: destinationInput,
      time: timeInput,
      frequency: frequencyInput
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#train-time-input").val("");
    $("#train-frequency-input").val("");
  });
  
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    var frequency = parseInt(trainFrequency);
    var currentTime = moment();
    console.log(currentTime)

    var dateConvert = moment(childSnapshot.val().trainTime, "HHmm").subtract(1, "years");

    var time = moment(dateConvert).format("HH:mm");

    var timeConvert = moment(time, "HH:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(timeConvert), "minutes");
    
    var timeRemaining = timeDifference % frequency;

    var minutesAway = frequency - timeRemaining;

    var nextArrival = moment().add(minutesAway, "minutes");

    var arrivalDisplay = moment(nextArrival).format("HH:mm");



  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);
  
    // Create the new row
    var newRow = $("<tr id='newRow'>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(arrivalDisplay),
      $("<td>").text(minutesAway),
      
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  