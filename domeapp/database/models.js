// var usertab = {
//     user:{
//         account:{type:String,required:true},
//         username:{type:String,required:true},
//         email:{type:String,required:true},
//         password:{type:String,required:true},
//         confirmPassword:{type:String,required:true}
//     }
// }
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports ={
    usertab:{
        openid:{type:String,required:true,unique:true},
        avatarUrl:{type:String,required:false},
        city:{type:String,required:false},
        country:{type:String,required:false},
        gender:{type:String,required:false},
        language:{type:String,required:false},
        nickName:{type:String,required:false},
        province:{type:String,required:false},
        gender:{type:String,required:false},
        usernametrue:{type:String,required:false},
        age:{type:String,required:false},
        cartype:{type:String,required:false},
        phonenum:{type:String,required:false},
        carcode:{type:String,required:false},
        creattime:{type:Number,default:Date.now()+(8*60*60*1000)}
    },
    article:{
        areadata:{type:Array,required:true,},
        arttext:{type:String,required:false,default:""},
        imagesArr:{type:Array,required:false,default:""},
        openidu:{type:String,required:false,default:""},
        like:{type:Array,required:false},
        see:{type:Number,required:false,default:0},
        translate:{type:Object,required:false},
        times:{type:Number,default:Date.now()+(8*60*60*1000)}
    },
    messages:{
        account:{type:String,required:true},
        mesTitle:{type:String,required:true},
        mesText:{type:String,required:true},
        mesTime:{type:Date,default:Date.now},
        adminText:{type:String,required:false},
        adminTime:{type:Date,default:Date.now}
    },
    cartimelist:{
        id:{type:String,required:true},
        departure:{type:String,required:true},
        destination:{type:String,required:true},
        seatnum:{type:String,required:true},
        place:{type:String,required:true},
        date:{type:String,required:true},
        time:{type:String,required:true},
        memo:{type:String,required:true},
        arrindex:{type:Number,required:true},
        statetime:{type:Number,required:true},
        creattime:{type:Number,default:Date.now()+(8*60*60*1000)}
    },
    carusername:{
        usernametrue:{type:String,required:true},
        age:{type:String,required:true},
        cartype:{type:String,required:true},
        phonenum:{type:String,required:true},
        carcode:{type:String,required:true}
    }
};

//举例：
/*
var ExampleSchema = new Schema({
    name:String,
    binary:Buffer,
    living:Boolean,
    updated:Date,
    age:Number,
    mixed:Schema.Types.Mixed, //该混合类型等同于nested
    _id:Schema.Types.ObjectId,  //主键
    _fk:Schema.Types.ObjectId,  //外键
    array:[],
    arrOfString:[String],
    arrOfNumber:[Number],
    arrOfDate:[Date],
    arrOfBuffer:[Buffer],
    arrOfBoolean:[Boolean],
    arrOfMixed:[Schema.Types.Mixed],
    arrOfObjectId:[Schema.Types.ObjectId]
    nested:{
        stuff:String,
    }
});*/