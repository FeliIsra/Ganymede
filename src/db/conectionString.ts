import { getConfig } from "../config/configService"

const password = getConfig('DB_PASSWORD')

export const conectionString = `mongodb+srv://admin:${password}@mongodbtest.wn6bz.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`