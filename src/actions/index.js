/**
 * @file actionsindex
 * All dispatch actions defined here
 */ 
import * as types from './actionTypes'

export const postMessage = (message,avatar,from) => ({type: types.POST_MESSAGES,message,avatar,from})
export const initialUser=(userlist) => ({type:types.INIT_USER,userlist})
export const addUser= (user) => ({type:types.ADD_USER,user})
export const deleteUser= (user) => ({type:types.DELETE_USER,user})