// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentDayEl = $("#currentDay")
var currentDate = dayjs()
var currentTime = dayjs().format("H")
var timeBlocks = $(".time-block")
var count = 9
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
  // TODO: Add a listener for click events on the save button. This code should
  timeBlocks.each(function(){
    var btnEl = $(this).children().eq(2)
    var textArea = $(this).children().eq(1)
    var hour = $(this).data("hour")
  
    btnEl.on("click", function(){
      var textValue = textArea.val()
      textStorage[hour] = textValue
      localStorage.setItem("textStorage", JSON.stringify(textStorage))
    })

    // TODO: Add code to apply the past, present, or future class to each time
    if (count < currentTime) {
      $(this).addClass("past")
    } else if (count == currentTime) {
      $(this).addClass("present")
    } else {
      $(this).addClass("future")
    }
    count++
    
    // TODO: Add code to get any user input that was saved in localStorage and set
    if (JSON.parse(localStorage.getItem("textStorage")) != null) {
      textStorage = JSON.parse(localStorage.getItem("textStorage"))
      textArea.text(textStorage[hour])
    }
  })
  // TODO: Add code to display the current date in the header of the page.
currentDayEl.text(currentDate.format("dddd, MMMM D[th]"))
});
  