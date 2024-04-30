// @ts-nocheck
import mongoose, { ObjectId } from "mongoose"

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type UserType = {
    name: string
    username: string
    email: string
    password: string
    role: "regular" | "organization" | "root"
    status: "active" | "accepted" | "inactive"
    city?: string
    address?: string
    description?: string
    image?: string
    socialLinks?: [string]
    affinities?: [string]
    savedEvents?: [ObjectId]
    followings?: [ObjectId]
}

type EventType = {
    title: string,
    author: ObjectId,
    city: string,
    address: string
    date: Date,
    time: string,
    description: string,
    price: number
}

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: false
    },
    address: {
        type: String
    },
    description: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ["regular", "organization", "root"],
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "accepted", "inactive"],
    },
    image: {
        type: String
    },
    socialLinks: {
        type: [String]
    },
    affinities: {
        type: [String],
        enum: ["music", "art", "sport", "politics", "feminism"]
    },
    savedEvents: {
        type: [ObjectId]
    },
    followings: {
        type: [ObjectId]
    },

})

const event = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

})

const User = model<UserType>("User", user)
const Event = model<EventType>("Event", event)

export {
    UserType,
    User,
    EventType,
    Event
}