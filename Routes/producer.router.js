import express from "express";
import { client } from "../index.js";
import { producerSchema } from "../Middleware/validation.js";
const router = express.Router();

router.get("/", async function (request, response) {
    try{
        const allProducers = await getAllProducer()
        if(!allProducers){
            response.status(400).send({msg: 'notfound'})
        }
        response.status(200).send({allProducers:allProducers, msg: "success"})
    }catch(error){
        response.status(500).send({error: error, msg: "server error"})
    }   
})

router.post("/add", producerSchema ,async function(req, res){
    try{
        const {name, picture, dob, bio} = req.body;
        const newProducer = {
            name: name,
            pp: picture,
            dob:dob,
            bio:bio
        }
        const addProducer = await addNewActor(newProducer)
        if(!addProducer){
            res.status(400).send({msg:"adding failed"})
        }
        const allProducer = await getAllProducer()
        res.status(200).send({msg:"actor successfully added", allProducer: allProducer})
    }catch(error){
        res.status(500).send({msg:"server error", error: error})
    }
})

router.put("/edit/:id",producerSchema, async function (request, response){
    try{
        const {id} = request.params;
        const {name, picture, dob, bio} = request.body;
        const edit = {
            name: name,
            picture: picture,
            dob:dob,
            bio:bio
        }
        
        const getMovie = await getMovieById(id)
        if(getMovie){
            await EditProducer(edit,id)
            const getEdited = await getProducerById(id)
            response.status(200).send({edited: getEdited, msg:"successfully edited"})
        }
    }catch(error){
        response.status(500).send({msg:"server error"})
    }
})

export default router;