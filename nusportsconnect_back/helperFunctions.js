module.exports = function getAccountCreationDate(cDate){
    return cDate.getDate() + "/" + cDate.getMonth() + "/" + cDate.getFullYear();
};