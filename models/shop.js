const mongoose =require("mongoose");


const shopSchema = new mongoose.Schema(
	{
        token: String,
		shop: String,
		appId: String,
		appSecret: String,
		code: String,
		confirm: {type:Boolean,default:false},
		auto:{type:Boolean,default:false},
		createdAt: {type:Date,default:new Date()},
		orders:[{
			id:Number,
		}]
	},
	{ timestamps: true }
);


const ShopModel = mongoose.model("Shop", shopSchema);

module.exports = ShopModel;