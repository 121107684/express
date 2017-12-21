/**
 * Created by baiy on 2016/1/7.
 */

var mongoose = require('mongoose');
var schema = mongoose.Schema;
var models = require('./models');




for (var m in models){
    mongoose.model(m , new schema(models[m]));
}
models.article.usertab = {
    type: schema.Types.ObjectId,
    ref: 'usertab'
}
models.usertab.article = {
    type: schema.Types.ObjectId,
    ref: 'article'
}
module.exports = {
    getModel: function(type){
        return _getModel(type);
    }
};

var _getModel = function(type){
    return mongoose.model(type);
};
