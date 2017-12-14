/**
 * @file questionsOperations
 * File to update store state based on called actions 
 */
import { POST_MESSAGES ,ADD_USER,INIT_USER} from '../actions/actionTypes'
import emoji from 'node-emoji'

var emojified = emoji.emojify('I :unknown_emoji: :star: :another_one:',function(name){return name});

const initialState = {
    user: [],
    message: [{
        message: emojified,
        // message: 'How do I use this messaging app?',
        from: 'right',
        backColor: '#3d83fa',
        textColor: "white",
        avatar: 'http://res.cloudinary.com/technoetics/image/upload/v1491538348/technoetics/profilepenguin.png',
        duration: 2000,
        inbound: true
    }]
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
                    // message:state.message,
                    from: 'right',
                    backColor: "green",
                    textColor: "white",
                    avatar: action.avatar,
                    duration: 2000,
                    inbound: false
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
            return{
                ...state,
                user:action.userlist
            }
        
        default:
            console.log("switch default")
            return state
    }
}