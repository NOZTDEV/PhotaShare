import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

const GET_START = 'GET_START';
const GET_USER = 'GET_USER';

const getStart = ()=> {

    return async (dispatch) => {

        const users = [];
        const collectionRef = collection(db,'users')
        const snapshot = await getDocs(collectionRef);

        snapshot.forEach(doc => {
            users.push(doc.data())
        });
    
        dispatch({type: GET_START, payload: users})
    }
};

const getUser = (sing) => {

    return async(dispatch) => {

        dispatch({type: GET_USER, payload: sing})


    }
}

export {getStart, getUser};