/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	 login:function(req,resp){
     if(!req.param('userEmail') && !req.param('userPwd')){
       resp.send('400', {message: 'Bad Request'});
     } else{
         User.findOne(req.allParams()).exec(function(err, res){
            if(res === undefined)
              return resp.send('400', {message: 'Bad Request'});
            else
              return resp.send(res);
         });
     }     
  },
  signUp:function(req,resp){
    if(!req.param('userEmail','userName','userPwd')){
      resp.send("400",{message:"Bad Request"});
    }else{
      User.create(req.params.all(),function(err, res){
        return resp.send(res);
      });
    }
  }
};

