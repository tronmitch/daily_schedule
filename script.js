// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the 'hour-x' id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  var saveButtonEl = $('.saveBtn')

  var toDoList = []
  if (window.localStorage.getItem('scheduleKey')) {
    toDoList = JSON.parse(window.localStorage.getItem('scheduleKey').valueOf())
  }
  var x
  saveButtonEl.on('click', function () {
    var target = $(this).parent().attr('id')
    var description = $("#" + target).children(".description").val()
    var toDo = {
      hour: target,
      toDoDescription: description
    }
    if (toDoList.some(e => e.hour == target)) {
      toDoList = toDoList.filter(e => e.hour !== target)
      // toDoList.find(e => e.)
    }
    toDoList.push(toDo)

    window.localStorage.setItem('scheduleKey', JSON.stringify(toDoList));
    console.log(toDoList)
  })

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?


  var today = dayjs();
  var currentHour = today.$H;

  //Cycle through hours 9-17(ie 15 = 5pm)
  for (let i = 9; i < 17; i++) {

    var hourBlock = $('#hour-' + i)
    if (currentHour == i) {
      hourBlock.attr('class', 'row time-block present')
    } else if (currentHour < i) {
      hourBlock.attr('class', 'row time-block past')
    } else {
      hourBlock.attr('class', 'row time-block future')
    }

  }
  {

}
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for (let i=0; i < toDoList.length; i++) {
    $("#"+toDoList[i].hour).children('.description').text(toDoList[i].toDoDescription)
  }




  // TODO: Add code to display the current date in the header of the page.
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var ordinal = 'th'
  lastDigitOfDay = today.format('DD').slice(-1)
  if (lastDigitOfDay == 1) {
    ordinal = 'st'
  }
  if (lastDigitOfDay == 2) {
    ordinal = 'nd'
  }
  if (lastDigitOfDay == 3) {
    ordinal = 'rd'
  }
  //Format the date by using the position in arrays of the Days and Months
  var dateString = days[today.$W] + ", " + months[today.$M] + " " + today.$D + ordinal

  //Alternative use dayjs built in formating
  dateString = today.format('dddd') + ", " + today.format('MMMM') + " " + today.$D + ordinal

  //Append the text to the header element
  $('#currentDay').text(dateString)
});
