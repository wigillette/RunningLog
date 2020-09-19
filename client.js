/**
* Will Gillette
* 9/18/20
* Handles the front end Javascript of the Running Log
*/

window.onload = init; // Execute init function when the page is loaded

/**
* Properties
*/

var entryObjects = {}; // Store the entry objects in a dictionary

/**
* Constructor
* Instantiates an entry object and initializes the properties and functions 
* @param title The title of the entry
* @param description The description of the entry
* @param distance The length of the run
*/

function Entry(title, description, distance){
  // Initialize the properties
  this.Title = title;
  this.Description = description;
  this.Distance = distance;
  
  // Initialize the functions
  this.display = function(){
    let table = document.getElementById("entries"); // Get the entries table element

    // Table styling
    table.style.border = "1px solid black";

    let row = table.insertRow(-1); // Append a row at the beginning of the table
    
    var titleLabel = row.insertCell(0); // Title Label
    titleLabel.innerHTML = this.Title;
    titleLabel.style.border = "1px solid black";

    var descLabel = row.insertCell(1); // Description Label
    descLabel.innerHTML = this.Description;
    descLabel.style.border = "1px solid black";

    var distanceLabel = row.insertCell(2); // Distance Label
    distanceLabel.innerHTML = this.Distance;
    distanceLabel.style.border = "1px solid black";
  }
  
  // Edit a property of the entry object
  this.edit = function(propertyName, val){
    if (this[propertyName] && (typeof this[propertyName] == typeof val))
      this[propertyName] = val;
  }
  
  // Call the edit function for a dictionary of object properties
  this.editEntries = function(propertiesDict){
    for (var index in propertiesDict){ // Iterate through the dictionary
      if (propertiesDict[index].Name && propertiesDict[index].Value) // Check if the dictionary properties exist
        this.edit(propertiesDict[index].Name, propertiesDict[index].Value); // Edit the current property
    }
  }
}

/**
* Initialize Entries Function
* Initializes the entryObjects table by parsing JSON from a request to the server
* @param callback The callback function to be executed after the request
*/

function intializeEntries(callback){
  // Asynchronous Request
  var req = new XMLHttpRequest(); // Create an HTTP request object
  
  req.open("GET", "https://wigillette-running-log.glitch.me/getEntries", true); // Create a GET request to the server to retrieve JSON information

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200){ // Check if the server response was successful
        callback(JSON.parse(this.responseText)); // Execute the callback function
    }
  }
  
  req.send(null); // Send the request
}

/**
 * Create Header Function
 * Creates the header for the table
 */

function createHeader(){
    var table = document.getElementById("entries");
    if (!table.tHead) {
        // Header Creation
        var header = table.createTHead();
        var row = header.insertRow(0);
        
        // Cell Creation
        var titleCell = row.insertCell(0);
        var descCell = row.insertCell(-1);
        var distCell = row.insertCell(-1);
        
        distCell.innerHTML = "<b>DISTANCE</b>";
        titleCell.innerHTML = "<b>TITLE</b>";
        descCell.innerHTML = "<b>DESCRIPTION</b>";

        // Header Styling
        descCell.style.border = "1px solid black";
        titleCell.style.border = "1px solid black";
        distCell.style.border = "1px solid black";
    }
}

/**
* Initialize Function
* Executes when the page is loaded
* Gets entries from server, creates objects for entries, displays entries
*/

function init(){
    createHeader();

    intializeEntries(function(entryTable){ // Make a request to the server to retrieve entries 
        for (var key in entryTable){
            if (entryTable[key].Title && entryTable[key].Description && entryTable[key].Distance) // Check if properties exist
            {
                // Instantiate an entry object and initialize properties
                entryObjects[key] = new Entry(entryTable[key].Title, entryTable[key].Description, entryTable[key].Distance); 
                entryObjects[key].display(); // Display the entry
            }
        } 
    });  
}