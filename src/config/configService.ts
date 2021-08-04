import * as dotenv from 'dotenv'
import * as fs from 'fs'

let envConfig: dotenv.DotenvParseOutput;

try{
	envConfig = dotenv.parse(fs.readFileSync('.env'));

} catch (e) {
	console.log(e)
}


export const getConfig = (key: string): string => {
	if (key in process.env) {
		return process.env[key];
	}

	return envConfig[key];
}