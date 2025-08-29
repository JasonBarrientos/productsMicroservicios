import  "dotenv/config";
import * as Joi from "joi";

interface  EnVars{
    PORT:number,
    DATABASE_URL:string
}

export const envsSchema = Joi.object({
    PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().required()
})
.unknown(true)

const {error, value} = envsSchema.validate(process.env)
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnVars= value;

export const envs={
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL
}