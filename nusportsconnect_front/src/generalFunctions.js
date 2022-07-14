export function setPageTitle(title) {
    return document.title = title;
}

export function getRating(array) {
    let sum = 0;
    for (let i =0; i < array.length; i++) {
        sum = sum + array[i];
    }
    const average = sum/array.length;
    return Math.round(average * 10)/10 ;
}