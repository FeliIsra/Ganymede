import * as dotenv from 'dotenv'
import * as fs from 'fs'

const envConfig = dotenv.parse(fs.readFileSync('.env'));


export const getConfig = (key: string): string => {
	if (key in process.env) {
		return process.env[key];
	}

	return envConfig[key];
}