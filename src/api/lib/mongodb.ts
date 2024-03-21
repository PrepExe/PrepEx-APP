import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error('MONGODB_URI not defined');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URI}`);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;