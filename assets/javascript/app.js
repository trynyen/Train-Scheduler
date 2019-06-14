var database = firebase.database();

$("#submit").click(function(event){
    event.preventDefault();
    
    //Store input info in Add Train form to variables
    var trainNameInput = $("#trainNameInput").val().trim();
    var destinationInput = $("#destinationInput").val().trim();
    var frequencyInput = $("#frequencyInput").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var nextArrivalInput = moment(firstTrainTime,"HH:mm").format("LT")
    // var minutesAway = moment().diff(moment(firstTrainTime,"HH:mm"))

    var newTrain = {
        trainName: trainNameInput,
        destination: destinationInput,
        frequency: frequencyInput,
        nextArrival: nextArrivalInput,
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
    var nextArrivalInput = childSnapshot.val().nextArrival;

    
    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainNameInput),
        $("<td>").text(destinationInput),
        $("<td>").text(frequencyInput),
        $("<td>").text(nextArrivalInput),

    );
    $("#trainTable > tbody").append(newRow);


})
