// var usertab = {
//     user:{
//         account:{type:String,required:true},
//         username:{type:String,required:true},
//         email:{type:String,required:true},
//         password:{type:String,required:true},
//         confirmPassword:{type:String,required:true}
//     }
// }

module.exports ={
    usertab:{
        account:{type:String,required:true,unique:true},
        username:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
    },
    userinfo:{
        account:{type:String,required:true,},
        appellation:{type:String,required:false,default:""},
        phoneNumber:{type:String,required:false,default:""},
        address:{type:String,required:false,default:""},
        qq:{type:String,required:false,default:""},
        leave:{type:String,required:false,default:""},
        onlysee:{type:String,required:false,default:""},
        userimg:{type:String,required:false,default:""}
    },
    messages:{
        account:{type:String,required:true},
        mesTitle:{type:String,required:true},
        mesText:{type:String,required:true},
        mesTime:{type:Date,default:Date.now},
        adminText:{type:String,required:false},
        adminTime:{type:Date,default:Date.now}
    },
    htmlparser:{
        account:{type:String,required:true},
        htmlName:{type:String},
        htmlLogoUrlClass:{type:String},
        htmlurl:{type:String},
       // htmlTime:{type:Date,default:new Date(Date.now()+(8*60*60*1000)).getTime()},
        htmlTime:{type:Number,default:Date.now()+(8*60*60*1000)},
        htmlNum:{type:Number,default:0},
        toUrl:{type:String},
    },
    htmlcontent:{
        account:{type:String,required:true,ref:'htmlparser'},
        htmlForm:{type:String},
        htmlUrl:{type:String},
        htmlTitle:{type:String},
        htmlcontents:{type:String},
        htmllike:{type:[Number],default:0},
        htmlUnlike:{type:[Number],default:0},
        htmlReadNum:{type:[Number],default:0},
        htmldate:{type:Number,default:Date.now()},
        htmlTop:{type:Boolean,default:false}
    },
    moviesinfo:{
        movieId:{type:String},
        movieImg:{type:String},
        movieTitle:{type:String},
        movieDirector:{type:String},
        movieProtagonist:{type:[]},
        movieType:{type:[]},
        movieCountry:{type:String},
        movieFirst:{type:String},
        movieLong:{type:String},
        movieRating:{type:String},
        movieStory:{type:String},
        moviePoster:{type:[]},
        inCinemaId:{type:[]}
    },
    cinemalist:{
        uid:{type:String},
        name:{type:String},
        address:{type:String},
        alias:{type:String},
        city:{type:String},
        area:{type:String},
        longitude:{type:String},
        latitude:{type:String},
        shopHours:{type:String},
        overallRating:{type:String},
        lowestGoodPrice:{type:String},
        lowestOrderPrice:{type:String},
        phone:{type:String}
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