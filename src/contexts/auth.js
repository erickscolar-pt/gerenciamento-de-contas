import { useState, createContext, useEffect } from 'react'
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';


export const AuthContext = createContext({});

function AuthProvider({children}){
    const[user, setUser] = useState(null);
    const[loadingAuth, setLoadingAuth] = useState(false);
    const[loading, setLoading] = useState(true);

    useEffect(()=>{

        function loadStorage(){
            const storageUser = localStorage.getItem('LoginDoUsuario')

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }

        loadStorage();

    },[])

    //Fazendo login do usuario
    async function signIn(email, password){
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                salario: userProfile.data().salario,
                avatarUrl: userProfile.data().avatarUrl,
                password: userProfile.data().password,
                email: value.user.email
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem vindo de volta!");
        })
        .catch((error)=>{
            console.log(error);
            toast.error("Usuario e senha incorretos");
            setLoadingAuth(false);
        })
    }

    // Cadastrando usuario
    async function signUp(email, password, nome, salario){
        // setLoadingAuth verifica se tem alguem logando
        setLoadingAuth(true);
        //codigo para entrar no banco
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        // .then é caso exista um usuario no banco
        .then( async (value)=>{
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: nome,
                email: email,
                password: password,
                salario: Number(salario),
                avatarUrl: null,
            })
            .then( ()=> {


                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    password: password,
                    salario: Number(salario),
                    avatarUrl: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);

            })
        })
        .catch((error)=>{
            console.log(error);
            setLoadingAuth(false);
        })
    }



    function storageUser(data){
        localStorage.setItem('LoginDoUsuario', JSON.stringify(data));
    }

  //Logout do usuario
  async function signOut(){
    await firebase.auth().signOut();
    localStorage.removeItem('LoginDoUsuario');
    setUser(null);
  }

    return(
        <AuthContext.Provider value={{ 
            signed: !!user,
            user,
            loading,
            signUp,
            signIn,
            loadingAuth,
            setUser,
            signOut,
            storageUser
            }}
            >

            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;