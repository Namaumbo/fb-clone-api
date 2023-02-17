const HttpStatusCode = Object.freeze( {
    OK :200,
    BAD_REQUEST : 400,
    NOT_FOUND : 404,
    INTERNAL_SERVER :500,
    UNPROCESSED_ENTITIES :422,
    ENTITY_CONFLICT:409,
   })

module.exports = HttpStatusCode