import express from 'express';
import {Transport} from '../models/transportModel.js'

const router = express.Router();

//Route for save a new Transport
router.post('/', async (request,response)=>{
    try{
        if(
            !request.body.job ||
            !request.body.vehicle ||
            !request.body.driver ||
            !request.body.vehicleNumber ||
            !request.body.date ||
            !request.body.time ||
            !request.body.cost ||
            !request.body.description
        ){
            return response.status(400).send({
                message: 'Send all required fields:job , vehicle, driver , vehicleNumber , date , time ,cost,description',
            });
        }
        const newTransport = {
            job : request.body.job,
            vehicle : request.body.vehicle,
            driver : request.body.driver,
            vehicleNumber : request.body.vehicleNumber,
            date : request.body.date,
            time : request.body.time,
            cost: request.body.cost,
            description : request.body.description,
        };

        const transport = await Transport.create(newTransport);
        return  response.status(201).send(transport);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for get all transports from database
router.get('/',async(request,response)=>{
    try{
        const transports = await Transport.find({});

        return response.status(200).json({
            count : transports.length,
            data:transports
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for get one trasports from database
router.get('/:id',async(request,response)=>{
    try{

        const {id} = request.params;
        const transport = await Transport.findById(id);

        return response.status(200).json(transport);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for update a Transport
router.put('/:id',async (request,response)=>{
    try{
        if(
            !request.body.job ||
            !request.body.vehicle ||
            !request.body.driver ||
            !request.body.vehicleNumber ||
            !request.body.date ||
            !request.body.time ||
            !request.body.cost ||
            !request.body.description
        ){
            return response.status(400).send({
                message:'Send all required fields:job , vehicle, driver , vehicleNumber , date , time ,cost,description',
            });
        }

        const {id} =request.params;

        const result = await Transport.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).json({message:'Transport not found'});
        }

        return response.status(200).send({message:'Transport updated successfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for delete a transport
router.delete('/:id', async (request,response)=>{
    try{
        const {id} = request.params;
        const result = await Transport.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Transport not found'});
        }
        return response.status(200).send({message:'Transport delected successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

export default router;
