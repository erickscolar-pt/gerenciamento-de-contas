import Header from '../../components/Header';
import './profile.css'
import { useState } from 'react'
import Title from '../../components/Title';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';
import avatar from '../../assets/avatar.png'
import { FiUpload } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

export default function Profile(){
    const{user, setUser, storageUser} = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [password, setPassword] = useState(user && user.password);
    const [salario, setSalario] = useState(user && user.salario);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e){

      if(e.target.files[0]){
        const image = e.target.files[0];
        
        if(image.type === 'image/jpeg' || image.type === 'image/png'){
  
          setImageAvatar(image);
          setAvatarUrl(URL.createObjectURL(e.target.files[0]))
  
        }else{
          alert('Envie uma imagem do tipo PNG ou JPEG');
          setImageAvatar(null);
          return null;
        }
  
      }
  
    }

    async function handleUpload(){
      const currentUid = user.uid;
  
      const uploadTask = await firebase.storage()
      .ref(`images/${currentUid}/${imageAvatar.name}`)
      .put(imageAvatar)
      .then( async () => {
        console.log('FOTO ENVIADA COM SUCESSO!');
  
        await firebase.storage().ref(`images/${currentUid}`)
        .child(imageAvatar.name).getDownloadURL()
        .then( async (url)=>{
          let urlFoto = url;
          
          await firebase.firestore().collection('users')
          .doc(user.uid)
          .update({
            avatarUrl: urlFoto,
            nome: nome,
            salario: Number(salario)
          })
          .then(()=>{
            let data = {
              ...user,
              avatarUrl: urlFoto,
              nome: nome,
              salario: Number(salario)
            }; 
            setUser(data);
            storageUser(data);
  
          })
  
        })
  
      })
  
    }

    async function handleSave(e){
      e.preventDefault();
  
      if(imageAvatar === null && nome !== ''){
        await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
          nome: nome,
          salario: Number(salario)
        })
        .then(()=>{
          let data = {
            ...user,
            nome: nome,
            salario: Number(salario)
          };
          setUser(data);
          storageUser(data);
          console.log('salvo com sucesso')
          toast.success("Salvo com sucesso");
          
        })
  
      }
      else if(nome !== '' && imageAvatar !== null){
        handleUpload();
        toast('Salvo com sucesso');

      }
  
    }


    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Minha Conta"/>
            </div>

        <div className="container">
        <form className="form-profile" onSubmit={handleSave}>

            <label className="label-avatar">
                      <span>
                        <FiUpload color="#000" size={25} />
                      </span>

                      <input type="file" accept="image/*" onChange={handleFile}  /><br/>
                      { avatarUrl === null ? 
                        <img src={avatar} width="100" height="100" alt="Foto de perfil do usuario" />
                        :
                        <img src={avatarUrl} width="100" height="100" alt="Foto de perfil do usuario" />
                      }
            </label>
            <label>Nome</label>
            <input type="text" value={nome} onChange={ (e) => setNome(e.target.value) } />

            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <label>Senha</label>
            <input type="password" value={password} onChange={ (e) => setPassword(e.target.value) } />

            <label>Renda</label>
            <input type="number" value={salario} onChange={ (e) => setSalario(e.target.value) } />        

            <button type="submit">Salvar</button>       

        </form>
        </div>

        </div>
    )
}