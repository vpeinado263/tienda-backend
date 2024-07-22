import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';
import detenv from 'dotenv'

detenv.config();

const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URL as string,
  collection: 'sessions'
});

export const sessionConfig = session({
  secret: process.env.SECRET_KEY as string,
  resave: false,
  saveUninitialized: false,
  store: store
});