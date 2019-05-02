//import React from "react";
//import axios from "axios";

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const PORT = (5000);
const app = express();
let db;
const router = express.Router();
//const state = require('./Form.js');

// this is the first test route
app.get("/test", function(request, response){
    console.log('in get /test');
    const location = request.location;

    // our query!
    const query = {
        zipcode: request.query.location,
        cuisine_type: request.query.foodPreference,
        borough: request.query.walkingTime,  
    
    };
    console.log(query);
    // where we query the user inputs in db
   
    //User enters their zipcode, which is not immediately used to search the query
    //Based on whether the user enters info in zipcode or food preference fields
    //Handle the query search in db

    //This is if there's no zipcode, no preference/blank for cuisine type, no walking time pref/blank
    if(query.zipcode == "" && (query.cuisine_type == "" || query.cuisine_type == "No Preference") && (query.borough == "" || query.borough == "No Preference")){
        db.collection("restaurantData").find().limit(5).toArray(function(err, docs)
        {
            if (err)
            {
                console.log("err");
            }
            else{ // if no error is encountered
                // response object that is sending back the db info
            console.log("Server encountered no errors");
            console.log(docs);
                response.status(200).json(docs);
            }
        });
    }

    //This is if there's no zipcode, a food pref, and no walking time pref/blank
    else if(query.zipcode == "" && (query.cuisine_type != "" && query.cuisine_type != "No Preference") && (query.borough == "No Preference" || query.borough == "")){
        const newQuery ={
            cuisine_type: request.query.foodPreference,
        };
        db.collection("restaurantData").aggregate([{$match: newQuery}, {$sample: {size: 5}}]).toArray(function(err, docs)
        {
            if (err)
            {
                console.log("err");
            }
            else{ // if no error is encountered
                // response object that is sending back the db info
                console.log("Server encountered no errors");
                console.log(docs);
                response.status(200).json(docs);
            }
        });
    }

    //This is if there's a zipcode, no preference/blank for cuisine type, no walking Time/no pref
    else if(query.zipcode != "" && (query.cuisine_type == "" || query.cuisine_type == "No Preference") && (query.borough == "No Preference" || query.borough == "")){
        const newQuery ={
            zipcode: request.query.location,
        };
        db.collection("restaurantData").aggregate([{$match: newQuery}, {$sample: {size: 5}}]).toArray(function(err, docs)
        {
            if (err)
            {
                console.log("err");
            }
            else{ // if no error is encountered
                // response object that is sending back the db info
                console.log("Server encountered no errors");
                console.log(docs);
                response.status(200).json(docs);
            }
        });
    }
    
    //This is if there's a zipcode, a food pref, and no walking time pref
    else if(query.zipcode != "" && (query.cuisine_type != "" && query.cuisine_type != "No Preference") && (query.borough == "No Preference" || query.borough == "")){
        const newQuery ={
            cuisine_type: request.query.foodPreference,
            zipcode: request.query.location,
        };
        db.collection("restaurantData").aggregate([{$match: newQuery}, {$sample: {size: 5}}]).toArray(function(err, docs)
        {
            if (err)
            {
                console.log("err");
            }
            else{ // if no error is encountered
                // response object that is sending back the db info
                console.log("Server encountered no errors");
                console.log(docs);
                response.status(200).json(docs);
            }
        });
    }

    //This is if there's a zipcode, no food pref, and nearby
    //Nearby and zipcode should always go together
    else if(query.zipcode != "" && (query.cuisine_type == "" || query.cuisine_type == "No Preference") && query.borough == "Nearby"){
        const newQuery ={
            zipcode: request.query.location,
        };
        db.collection("restaurantData").aggregate([{$match: newQuery}, {$sample: {size: 5}}]).toArray(function(err, docs)
        {
            if (err)
            {
                console.log("err");
            }
            else{ // if no error is encountered
                // response object that is sending back the db info
                console.log("Server encountered no errors");
                console.log(docs);
                response.status(200).json(docs);
            }
        });
    }

    //This is for zipcode and food pref, and nearby
    else if(query.zipcode != "" && (query.cuisine_type != "" && query.cuisine_type != "No Preference") && query.borough == "Nearby"){
        const newQuery ={
            cuisine_type: request.query.foodPreference,
            zipcode: request.query.location,
            //borough: request.query.walkingTime,
        };
        db.collection("restaurantData").aggregate([{$match: newQuery}, {$sample: {size: 5}}]).toArray(function(err, docs)
        {
            if (err)
            {
                console.log("err");
            }
            else{ // if no error is encountered
                // response object that is sending back the db info
                console.log("Server encountered no errors");
                console.log(docs);
                response.status(200).json(docs);
            }
        });
    }

    //This is for zipcode and food pref, and no preference
    // else if(query.zipcode != "" && (query.cuisine_type != "" && query.cuisine_type != "No Preference") && query.borough == "Nearby"){
    //     const newQuery ={
    //         cuisine_type: request.query.foodPreference,
    //         zipcode: request.query.location,
    //         //borough: request.query.walkingTime,
    //     };
    //     db.collection("restaurantData").aggregate([{$match: newQuery}, {$sample: {size: 5}}]).toArray(function(err, docs)
    //     {
    //         if (err)
    //         {
    //             console.log("err");
    //         }
    //         else{ // if no error is encountered
    //             // response object that is sending back the db info
    //             console.log("Server encountered no errors");
    //             console.log(docs);
    //             response.status(200).json(docs);
    //         }
    //     });
//}

    //This is going to be obsolete, but until we figure out the nearby/zipcode thing, 
    //this allows for freeform entry and reminds the user to make sure zipcode is in borough
    // else{
    //     db.collection("restaurantData").aggregate([{$match: query}, {$sample: {size: 5}}]).toArray(function(err, docs)
    //     {
    //         if (err)
    //         {
    //             console.log("err");
    //         }
    //         else{ // if no error is encountered
    //             // response object that is sending back the db info
    //             console.log("Server encountered no errors");
    //             console.log(docs);
    //             response.status(200).json(docs);
    //         }
    //     });
    // }
});

const url = "mongodb://localhost/restaurant";
mongoose.connect(url, function(error, database)
{
    if (error)
    {
        console.log(error);
    } else { // if no error was detected
        db = database;
        console.log("database is good to go!");
    }
});

// this should always be at the bottom of the file, listening on the port that we define
app.listen(PORT, function(){
    console.log("Running on port: " + PORT);
})
