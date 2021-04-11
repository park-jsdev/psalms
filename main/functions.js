/* COMP 2681 Final Project
T00625144
Junsoo Park
4/4/2021
*/

// Hide all elements with class="containerTab", except for the one that matches the clickable grid column
function openTab(tabName) {
    var i, x;
    x = document.getElementsByClassName("containerTab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "inline-block";

    // Scroll tab into view
    // TODO: Add curtain dropdown or smoother transition
    scrollToTab(tabName);
  }

function scrollToTab(tabName){
      var element = document.getElementById(tabName);
      element.scrollIntoView();
}

// Scroll Event Listener
// function scrollEventListener(){
//   window.addEventListener('scroll', () => {
//     document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
//   }, false);
// }


// Multiple Step Form functions
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  if (!valid) {
    // Window alert, only once:
    alert("Invalid input!");
  }

  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}


// Scrolling Video Script
// From https://www.reddit.com/r/webdev/comments/2krge1/codepens_killer_html5_video_scrolling_controls_w/
function scrollingVideo(){
  var vid = document.getElementById('containerAVideo');
// var vid2 = document.getElementById('containerBVideo');
// var vid3 = document.getElementById('containerCVideo');

var targetscrollpos = window.pageYOffset-50;
var scrollpos = targetscrollpos;
// var scrollpos2 = targetscrollpos - 200;
// var scrollpos3 = targetscrollpos - 400;

var accelamount = 0.07;

vid.pause();
// vid2.pause();
// vid3.pause();

window.onscroll = function(){
    targetscrollpos = window.pageYOffset-50;
};

setInterval(() => {  
      scrollpos += (targetscrollpos - scrollpos)*accelamount;
      vid.currentTime = scrollpos / 1100;
      vid.pause();

      // scrollpos2 += ((targetscrollpos - 200) - scrollpos2)*accelamount;
      // vid2.currentTime = scrollpos2 / 1000;
      // vid2.pause();
      
      // scrollpos3 += ((targetscrollpos - 400) - scrollpos3)*accelamount;
      // vid3.currentTime = scrollpos3 / 1000;
      // vid3.pause();

}, 40);
}