import express from "express";
import { client } from "../index.js";
import { CreateMovie, EditMovie, delMovieById, getAllMovies, getMovieById } from "../Services/movie.service.js";
import { movieSchema } from "../Middleware/validation.js";
const router = express.Router();

router.get("/", async function (request, response) {
try{
    const allMovies = await getAllMovies()
    if(!allMovies){
        response.status(400).send({msg: 'notfound'})
    }
    response.status(200).send({allMovies:allMovies, msg: "success"})
}catch(error){
    response.status(500).send(error)
}   
})

router.post("/add",movieSchema, async function (request, response) {
    try{
        const {name, description, actors, producer, yor, poster} = request.body;
        const addMovie = {
            name: name,
            actors: actors,
            producer: producer,
            yor: yor,
            poster: poster,
            time: new Date(),
            description:description
        }
        const movie = await CreateMovie(addMovie)
        if(!movie){
            response.status(400).send({msg: 'notfound'})
        }
        const allMovies = await getAllMovies()
        response.status(200).send({allMovies:allMovies, msg: "success"})
    }catch(error){
        response.status(500).send(error)
    }   
    })

router.put("/edit/:id",movieSchema, async function (request, response){
    try{
        const {id} = request.params;
        const {name, description, actors, producer, yor, poster} = request.body;
        const edit = {
            name: name,
            actors: actors,
            producer: producer,
            yor: yor,
            poster: poster,
            description: description
        }
        
        const getMovie = await getMovieById(id)
        if(getMovie){
            await EditMovie(edit,id)
            const getEdited = await getMovieById(id)
            response.status(200).send({edited: getEdited, msg:"successfully edited"})
        }
    }catch(error){
        response.status(500).send({msg:"server error"})
    }
})

router.delete("/del/:id",async function(request, response){
try{
    const {id} = request.params;
    const movie = getMovieById(id)
    if(!movie){
        response.status(400).send({msg:"failed deleting"})
    }else{
        await delMovieById(id)
        response.status(200).send({msg:"successfully deleted"})
    }
}catch(error){
    response.status(500).send({msg:"server error"})
}
})

export default router;