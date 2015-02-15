/**
 * BookTicketController
 *
 * @description :: Server-side logic for managing booktickets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ScreenController = require('./ScreenController');

module.exports = {
  book:function(req,resp){   
    BookTicket.create(req.params.all(),function(err, res){ 
        ScreenController.blockTicket(req);
        return resp.send(res);
    });
  }
};

