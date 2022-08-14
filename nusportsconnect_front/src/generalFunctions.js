//Function to set page title
export function setPageTitle(title) {
    return document.title = title;
}

//Function to convert date into AM/PM
export function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  //function to retreive average rating of reviews from a list of reviews
export function getRating(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum = sum + array[i];
    }
    const average = sum/array.length;
    return Math.round(average * 10)/10 ;
}

