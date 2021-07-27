import  * as mongoose from 'mongoose'
import { conectionString } from './conectionString'

const initDB = () => { 
  mongoose.connect(conectionString);
  mongoose.connection.once('open', () => { 
    console.log('connected to database'); 
  }); 

  mongoose.connection.on('error', console.error); 
} 

export default initDB
