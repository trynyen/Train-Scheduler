var database = firebase.database();

$("#submit").click(function(event){
    event.preventDefault();
    
    //Store input info in Add Train form to variables
    var trainNameInput = $("#trainNameInput").val().trim();
    var destinationInput = $("#destinationInput").val().trim();
    var frequencyInput = $("#frequencyInput").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();

    
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years"); // First Time (pushed back 1 year to make sure it comes before current time)
    var currentTime = moment(); // Current Time
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes"); // Difference between the times
    var tRemainder = diffTime % frequencyInput; // Time apart (remainder)
    var minutesAway = frequencyInput - tRemainder; // Minute Until Train
    var nextTrainInput = moment().add(minutesAway, "minutes"); // Next Train
    var nextTrain = moment(nextTrainInput).format("hh:mm A"); //Convert next train time format

  
    // Code for "Setting values in the database"
    database.ref().push({
        trainName: trainNameInput,
        destination: destinationInput,
        frequency: frequencyInput,
        nextTrainInput: nextTrain,
    });

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTime").val("");
    $("#frequencyInput").val("");
});

// Firebase watcher + initial loader
database.ref().on("child_added", function(childSnapshot) {
    var trainNameInput = childSnapshot.val().trainName;
    var destinationInput = childSnapshot.val().destination;
    var frequencyInput = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().nextTrainInput;
    
    
    var firstTimeConverted = moment(nextTrain, "HH:mm").subtract(1, "years"); // First Time (pushed back 1 year to make sure it comes before current time)
    var currentTime = moment(); // Current Time
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes"); // Difference between the times
    var tRemainder = diffTime % frequencyInput; // Time apart (remainder)
    var minutesAway = frequencyInput - tRemainder; // Minute Until Train
    var nextTrainInput = moment().add(minutesAway, "minutes"); // Next Train
    var nextTrain = moment(nextTrainInput).format("hh:mm A"); //Convert next train time format


    // Create the new row
    $("#trainTable > tbody").append("<tr><td>" + trainNameInput + "</td><td>" + destinationInput + "</td><td>" + frequencyInput + "</td><td>" + nextTrain + "</td><td>" + minutesAway + " minutes" + "</td></tr>");


})
