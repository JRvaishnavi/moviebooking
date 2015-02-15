/**
 * ScreensController
 *
 * @description :: Server-side logic for managing Screens
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  blockTicket:function(req, fn){
    Screen.update({id:req.param('screenId')},{availableSeats:req.param('availableSeats'),blockedSeats:req.param('blockedSeats')}).exec(function(e,res){
      return res;
    });
  }
};

