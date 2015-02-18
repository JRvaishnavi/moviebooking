/**
 * BookTicketController
 *
 * @description :: Server-side logic for managing booktickets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var ScreenController = require('./ScreenController');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

module.exports = {
  book:function(req,resp){   
    BookTicket.create(req.params.all(),function(err, res){ 
      ScreenController.blockTicket(req);
        transporter.sendMail({
          from: 'bookshow@gmail.com',
          to: req.param('userEmail'),
          subject: 'Booked Tickets',
          text: 'Your Movie Ticket has been booked. Collect your ticket at the theatre counter.'
        });  
        return resp.send(res);
    });
  }
};

