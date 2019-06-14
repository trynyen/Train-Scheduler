var database = firebase.database();

$("#submit").click(function(event){
    event.preventDefault();
    
    //Store input info in Add Train form to variables
    var trainNameInput = $("#trainNameInput").val().trim();
    var destinationInput = $("#destinationInput").val().trim();
    var frequencyInput = $("#frequencyInput").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % frequencyInput;
    
    // Minute Until Train
    var minutesAway = frequencyInput - tRemainder;

    // Next Train & changed time format
    var nextTrainInput = moment().add(minutesAway, "minutes");
    var nextTrain = moment(nextTrainInput).format("hh:mm A");

    var newTrain = {
        trainName: trainNameInput,
        destination: destinationInput,
        frequency: frequencyInput,
        nextTrainInput: nextTrain,
        minutesAwayInput: minutesAway,

    }

    // Code for "Setting values in the database"
    database.ref().push(newTrain);

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
    var minutesAway = childSnapshot.val().minutesAwayInput;
    
    // Create the new row
    $("#trainTable > tbody").append("<tr><td>" + trainNameInput + "</td><td>" + destinationInput + "</td><td>" + frequencyInput + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");


})
