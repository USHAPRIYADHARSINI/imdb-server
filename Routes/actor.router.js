import express from "express";
import { client } from "../index.js";
import { actorSchema } from "../Middleware/validation.js";
const router = express.Router();


router.get("/", async function (request, response) {
    try{
        const allActors = await getAllActors()
        if(!allActors){
            response.status(400).send({msg: 'notfound'})
        }
        response.status(200).send({allActors:allActors, msg: "success"})
    }catch(error){
        response.status(500).send(error)
    }   
    })
    
    router.post("/add",actorSchema, async function(req, res){
        try{
            const {name, picture, dob} = req.body;
            const newActor = {
                name: name,
                pp: picture,
                dob:dob
            }
            const addActor = await addNewActor(newActor)
            if(!addActor){
                res.status(400).send({msg:"adding failed"})
            }
            const allActor = await getAllActors()
            res.status(200).send({msg:"actor successfully added", allActor: allActor})
        }catch(error){
            res.status(500).send({msg:"server error", error: error})
        }
    })

    router.put("/edit/:id",actorSchema, async function (request, response){
        try{
            const {id} = request.params;
            const {name, picture, dob, bio} = request.body;
            const edit = {
                name: name,
                pp: picture,
                dob:dob,
                bio:bio
            }
            
            const getActor = await getActorById(id)
            if(getActor){
                await EditActor(edit,id)
                const getEdited = await getActorById(id)
                response.status(200).send({edited: getEdited, msg:"successfully edited"})
            }
        }catch(error){
            response.status(500).send({msg:"server error"})
        }
    })

    export default router;