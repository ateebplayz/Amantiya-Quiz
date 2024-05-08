import { MongoClient } from "mongodb"
import dotenv from 'dotenv'
import { User, Admin } from "./types"
dotenv.config()

export const mongoClient = new MongoClient(process.env.MONGOURI || '')
export const db = mongoClient.db('Amantiya')
export const userCollection = db.collection<User>('Users')
export const adminCollection = db.collection<Admin>('Admin')