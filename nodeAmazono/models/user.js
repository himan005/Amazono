const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema({
    email: { type:String, required:true, unique:true, lowercase:true},
    name : { type:String, required:true },
    password : {type:String, required:true},
    picture : {type:String},
    isSeller : {type:Boolean, default:false},
    address : {
        addr1 : {type:String},
        addr2 : {type: String},
        city : {type: String},
        state : {type : String},
        country : {type: String},
        postalCode : {type : String},
    },
    created : { type:Date, default: Date.now}
});


UserSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err,hash){
        if(err) return next(err);

        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.gravatar = function(size){
    if(!this.size) size = 200;
    if(!this.email){
        return 'http://gravatar.com/avatar/?s' + size + '&d=retro';
    } else{
        var md5 = crypto.createHash('md5').update(this.email).digest('hex');
        return 'http://gravatar.com/avatar/?s' +md5 + '?s' + size + '&d=retro';
    }  
    
}

module.exports = mongoose.model('User',UserSchema);

