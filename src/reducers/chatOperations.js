/**
 * @file questionsOperations
 * File to update store state based on called actions 
 */
import { POST_MESSAGES ,ADD_USER,INIT_USER,DELETE_USER} from '../actions/actionTypes'
import emoji from 'node-emoji'

var emojified = emoji.emojify('I :unknown_emoji: :star: :another_one:',function(name){return name});

const initialState = {
    user: ['BroadCast'],
    message: [{
        message: emojified,
        from: 'left',
        backColor: '#3d83fa',
        textColor: "white",
        avatar: 'http://res.cloudinary.com/technoetics/image/upload/v1491538348/technoetics/profilepenguin.png',
        duration: 2000,
        inbound: true
    }]
}

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

export default function chatOperations(state = initialState, action) {
    console.log(state)
    switch (action.type) {
        case POST_MESSAGES:
            console.log("switch post message")
            var a= emoji.emojify(action.message,function(name){return name});
            return {
                ...state,
                message:[...state.message,{
                    message:a,
                    from:"left",
                    backColor: "green",
                    textColor: "white",
                    avatar: action.avatar,
                    duration: 2000,
                    inbound:action.from,
                    src:action.url
                }]
            }
        case ADD_USER:
            console.log("switch add user")
            return{
                ...state,
                user:[...state.user,action.user]
            }
        case INIT_USER:
            console.log("switch init user")
            var user_origin=state.user
            return{
                ...state,
                user:user_origin.concat(action.userlist)
            }
        case DELETE_USER:
            console.log("switch del user")
            console.log(state.user)
            var u=removeA(state.user,action.user)
            console.log(u)
            return{
                ...state,
                user:u
            }
        
        default:
            console.log("switch default")
            return state
    }
}