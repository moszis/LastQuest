import TestServices from './services/testServices';
import AssetServices from './services/AssetServices';

var express = require('express');

export default function(){

    var tstServices = new TestServices();
    var router = express.Router();

    router.route('/test1')
        .get(function(req, res){
            
            console.log(tstServices.runTest());
            res.status(200).send(tstServices.runTest());
        });

    router.route('/assets/zone:zoneCode')
        .get(function(req, res){
           var assetServices = new AssetServices();
           res.status(200).send(assetServices.getAssetsByZone(req.params.zoneCode));
        });
    return router;
}