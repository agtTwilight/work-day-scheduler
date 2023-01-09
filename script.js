// Grabbing the HTML variable that we need to update the text content of
var currentDayEl = $("#currentDay")

// Initializing a dayjs variable that we can format as needed
var currentDate = dayjs()

// Initializing an hour variable in a 24hour format to use in future calls to the object variable below
var currentTime = dayjs().format("H")

// Grabbing all of our div elements with a class of time-block 
var timeBlocks = $(".time-block")

// Initializing a counter for use in our function below
var count = 9

// Initializing an empty storage object that we can update when text is added
var textStorage = {
  "9": "",
  "10": "",
  "11": "",
  "12": "",
  "13": "",
  "14": "",
  "15": "",
  "16": "",
  "17": "",
  "date": "",
}

$(function scheduler() {
  // Using the .each() method in jquery essentially starts a for loop that will iterate over each of the items within the timeBlocks variable. Thus, we iterate throught the following function for each of our timeBlock divs 
  timeBlocks.each(function(){
    // Grabbing the button, text area, and hour data attribute of the current time block.
    var btnEl = $(this).children().eq(2)
    var textArea = $(this).children().eq(1)
    var hour = $(this).data("hour")
  
    // adding a click event listener to the button of the current time block
    btnEl.on("click", function(){
      // On click, store the text area value as textValue, and then, append the value to the textStorage object at the key that matches the div data-hour value. Save this object to local storage.
      var textValue = textArea.val()
      textStorage[hour] = textValue
      localStorage.setItem("textStorage", JSON.stringify(textStorage))
    })

    // For the current timeblock compare count to the value of currentTime. Assign past, present, or future classes via if conditions below.
    if (count < currentTime) {
      $(this).addClass("past")
    } else if (count == currentTime) {
      $(this).addClass("present")
    } else {
      $(this).addClass("future")
    }
    // After assigning a condition to the current timeBlock, increase the value of count for future iterations.
    count++
    
    // As long as local storage wasn't reset by the user (resulting in a null value), set textStorage to be equal to the object saved in local storage, and append any saved text to the appropriate time block
    if (JSON.parse(localStorage.getItem("textStorage")) != null) {
      textStorage = JSON.parse(localStorage.getItem("textStorage"))
      textArea.text(textStorage[hour])
    }
  })
  // Display the current date in the header of the page.
currentDayEl.text(currentDate.format("dddd, MMMM D[th]"))
});
  