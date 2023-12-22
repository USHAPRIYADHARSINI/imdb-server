import Joi from "joi";

export const movieSchema = (request, response, next)=>{
  const {name, yor, description, actors, producer, poster} = request.body
  const input = {
    name: name,
    actors: actors,
    producer: producer,
    yor: yor,
    poster: poster,
    description:description
  }
  const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(50).required(),
  yor: Joi.number().integer(),
  description: Joi.string(),
  actors: Joi.array().required(),
  producer:Joi.array().required(),
  poster: Joi.link()
})
try{
  schema.validateAsync(input)
  console.log("validation passed")
  next();
}catch(error){
  response.status(422).send({msg:"validation error", error: error})
}
}

export const actorSchema = (request, response, next)=>{
  const {name,picture, dob, bio} = request.body
  const input = {
    name: name,
    picture:picture,
    dob:dob,
    bio:bio
  }
  const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(50).required(),
  dob: Joi.number().integer(),
  bio: Joi.string(),
  picture: Joi.link()
})
try{
  schema.validateAsync(input)
  console.log("validation passed")
  next();
}catch(error){
  response.status(422).send({msg:"validation error", error: error})
}
}

export const producerSchema = (request, response, next)=>{
  const {name,picture, dob, bio} = request.body
  const input = {
    name: name,
    picture:picture,
    dob:dob,
    bio:bio
  }
  const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(50).required(),
  dob: Joi.number().integer(),
  bio: Joi.string(),
  picture: Joi.link()
})
try{
  schema.validateAsync(input)
  console.log("validation passed")
  next();
}catch(error){
  response.status(422).send({msg:"validation error", error: error})
}
}
