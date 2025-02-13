import { IUser } from "@/types";
import { QueryOptions } from "mongoose";
import { USER_MODEL } from "@/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Create a new user (encrypt password before saving)
 */
export const createUser = async (user: IUser) => {
    try {
       return await USER_MODEL.create(user);
 
    } catch (error: any) {
        throw new Error(error.message);
    }
};

/**
 * Find users based on query
 */
export const getUsers = async (query: QueryOptions) => {
    try {
        return await USER_MODEL.find(query);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

/**
 * Find a user by ID
 */
export const getUser = async (query: QueryOptions) => {
    try {
        return await USER_MODEL.findOne(query);
    } catch (error: any) {
        throw new Error(error.message);
    }
}


/**
 * Delete a user
 */
export const deleteUser = async (id: string) => {
    try {
        return await USER_MODEL.findByIdAndDelete(id);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
