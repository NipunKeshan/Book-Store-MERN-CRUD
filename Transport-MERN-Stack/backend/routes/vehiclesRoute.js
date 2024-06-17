import express from 'express';
import {Vehicle} from '../models/vehicleModel.js';

const router = express.Router();

//Route for save a new Vehicle
router.post('/', async (request,response)=>{
    try{
        if(
            !request.body.year ||
            !request.body.vehicle ||
            !request.body.vehicleNumber ||
            !request.body.model ||
            !request.body.renteredCompany ||
            !request.body.rentalFee ||
            !request.body.capacity ||
            !request.body.descriptionOfVehicle
        ){
            return response.status(400).send({
                message: 'Send all required fields:year , vehicle, model,vehicleNumber ,renteredCompany,rentalFee,capacity,descriptionOfVehicle',
            });
        }
        const newVehicle = {
            year : request.body.year,
            vehicle : request.body.vehicle,
            model:request.body.model,
            renteredCompany:request.body.renteredCompany,
            rentalFee:request.body.rentalFee,
            capacity:request.body.capacity,
            vehicleNumber : request.body.vehicleNumber,
            descriptionOfVehicle : request.body.descriptionOfVehicle,
        };

        const vehicle = await Vehicle.create(newVehicle);
        return  response.status(201).send(vehicle);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for get all vehicles from database
router.get('/',async(request,response)=>{
    try{
        const vehicles = await Vehicle.find({});

        return response.status(200).json({
            count : vehicles.length,
            data:vehicles
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for get one vehicles from database
router.get('/:id',async(request,response)=>{
    try{

        const {id} = request.params;
        const vehicle = await Vehicle.findById(id);

        return response.status(200).json(vehicle);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for update a Vehicle
router.put('/:id',async (request,response)=>{
    try{
        if(
            !request.body.year ||
            !request.body.vehicle ||
            !request.body.vehicleNumber ||
            !request.body.model ||
            !request.body.renteredCompany ||
            !request.body.rentalFee ||
            !request.body.capacity ||
            !request.body.descriptionOfVehicle
        ){
            return response.status(400).send({
                message:'Send all required fields:year , vehicle, vehicleNumber ,descriptionOfVehicle',
            });
        }

        const {id} =request.params;

        const result = await Vehicle.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).json({message:'Vehicle not found'});
        }

        return response.status(200).send({message:'Vehicle updated successfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for delete a vehicle
router.delete('/:id', async (request,response)=>{
    try{
        const {id} = request.params;
        const result = await Vehicle.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Vehicle not found'});
        }
        return response.status(200).send({message:'Vehicle delected successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

export default router;
