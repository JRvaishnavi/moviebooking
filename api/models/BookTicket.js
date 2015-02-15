/**
* BookTicket.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    userEmail:{
      type:"email",
      required:true
    },
    userName:"string",
    movieName:"integer",
    theatreName:"integer",
    screenName:"integer",
    showDate:"date",
    NumberOfTickets:"integer"
  }
};

