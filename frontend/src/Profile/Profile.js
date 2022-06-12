import { useEffect, useState } from 'react';
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import Friends from '../Friends/Friends';
import Requests from '../Friends/Requests';
import Post from '../Posts/Post';
import './Profile.css';
import AllPosts from './AllPost';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../Posts/CreatePost';
import Header from '../Header/Header';
import axios from 'axios';

const Profile = () => {
    const[imag, setImah] = useState("https://img.freepik.com/free-vector/vector-photographer-character-camera-professional-operator-correspondent-man-illustration_1284-42379.jpg?size=338&ext=jpg");
    // const[imag, setImah] = useState(null);
    const[name, setName] = useState("Pratik Dhar");
    const[adderss, setAddress] = useState("Dhanbad");
    const[work, setWork] = useState("ASI Lab");
    const[study, setStudy] = useState("MAKAUT");
    const[relationship, setRelationship] = useState("Single");
    const[politics, setPolitics] = useState(null);
    const[show, setShow] = useState("friends");
    const[userName, setUserName] = useState("@dhar_1234abc");
    const[post, setPost] = useState(false);
    const[todo, setTodo] = useState();
    const[original_post, setOriginal_post] = useState();
    const[user, setUser] = useState([]);

    const navigate = useNavigate();

  function getImageFileObject(imageFile) {
    console.log({ imageFile })
  }
  function runAfterImageDelete(file) {
    console.log({ file })
  }

  function changeShow(ele){
      setShow(ele);
  }

  function getData(data){
    console.log(data);
    if(data.response === false){
        setPost(false);
    }
    else{
        setOriginal_post({data});
        setPost(false);
    }
    console.log(original_post);
  }

  useEffect(() => {
    const user_data = localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user')) : 
    '';
    console.log(user_data);
      const get_user_details = async () => {
          const data = await axios.post('http://localhost:5000/showprofile', {userId: user_data.id});
          setUser(data.data[0]);
      }
      get_user_details();
  }, [])

  console.log(user ? user : "jhgeh");

  return (
      <div style={{backgroundColor: "#FCFCFC"}}>
          <Header />
        <div className="profile flex sm:flex-col">
            <div className='h-80 w-2/5 sm:w-full flex flex-col justify-center items-center'>
                {/* <div style={{display: imag===null ? "block" : "none"}}>
                    <ImageUploader
                        onFileAdded={(img) => getImageFileObject(img)}
                        onFileRemoved={(img) => runAfterImageDelete(img)}
                    />
                </div> */}
                <div className='shadow-lg' style={{display: imag===null ? "none" : "block"}}>
                    <img className="uploader__placeholder" src="blob:http://localhost:3000/8977b1ff-062b-42dc-a11d-95a360ceb25d" alt="" />
                    {/* <img className='w-24 h-52' src="blob:http://localhost:3000/efdbbc92-662b-4ba1-8bd9-a56a7a72c886" alt="" /> */}
                </div>
                <div className='pt-4 text-xl font-thin'>
                    <p>{userName}</p>
                </div>
            </div>
            <div className="data w-3/5 sm:w-full flex flex-col justify-center sm:items-center">
                <div className='flex sm:flex-col sm:gap-4'>
                    <h2 className="name text-4xl font-thin">{name}</h2>
                    <button className='btn_1' onClick={() => {
                        navigate('updateprofile');
                    }}>Edit Profile</button>
                </div>
                <div className='des w-full'>
                    <h2 className='address flex justify-start sm:justify-center font-thin text-lg tracking-wide my-4 items-center gap-4'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg> From {adderss}</h2>
                    <h2 className='address flex justify-start sm:justify-center font-thin text-lg tracking-wide my-4 items-center gap-4'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg> Works at {work}</h2>
                    <h2 className='address flex justify-start sm:justify-center font-thin text-lg tracking-wide my-4 items-center gap-4'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg> Studied at {study}</h2>
                    <h2 className='address flex justify-start sm:justify-center font-thin text-lg tracking-wide my-4 items-center gap-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg> {relationship}</h2>
                    <h2 className='address flex justify-start sm:justify-center font-thin text-lg tracking-wide my-4 items-center gap-4' style={{display: politics===null ? "none" : "block"}}><i class="fa fa-flag"></i> {politics}</h2>
                    <div className='flex justify-start'><button className='border-2 rounded-md py-1 px-2 bg-white shadow-lg text-lg font-thin'>Connect</button></div>
                </div>
            </div>
        </div>
        <div className='mx-auto my-8' style={{backgroundColor: "#e4e4e4", minHeight: "1px", minWidth: "180px", maxWidth: "200px"}}></div>
        <div>
            <div className='flex justify-center my-6 gap-8'>
                <div className="sw flex gap-2" style={{color: show==="friends" ? "black" : "#8E939F"}} onClick={() => changeShow("friends")}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <p>Friends</p>
                </div>
                <div className="sw flex gap-2" style={{color: show==="requests" ? "black" : "#8E939F"}} onClick={() => changeShow("requests")}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                    <p>Requests</p>
                </div>
            </div>
            <div className="friens" style={{display: show==="friends" ? "block" : "none"}}>
                {/* <p>kfhwehf</p> */}
                <Friends />
            </div>
            <div className="requests" style={{display: show==="requests" ? "block" : "none"}}>
                <Requests />
            </div>
        </div>
        <div className='mx-auto my-8' style={{backgroundColor: "#e4e4e4", minHeight: "1px", minWidth: "180px", maxWidth: "50vw"}}></div>
        <div className="posts">
            <div className='flex justify-center items-center gap-16'>
                <h2 className='text-2xl' style={{color: "#8E939F"}}>POSTS</h2>
                <div className='p-1 rounded-md' onClick={() => setPost(!post)} style={{backgroundColor: "#E4E4E4", color: "#9FA09E", cursor: "pointer"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
            <div className="post w-3/6 mx-auto my-8 sm:w-5/6">
                {
                    AllPosts.map((post) => (
                        <div className='shadow-md'>
                            <div className='items-center gap-4 p-2' style={{backgroundColor: "#EEF2EA", display: imag===null ? "none" : "flex", borderRadius: "4px 4px 0px 0px"}}>
                                <img className="w-14" style={{borderRadius: "50%"}} src={imag} alt="" />
                                <h2 className='text-lg'>{name}</h2>
                            </div>
                            <Post info={post} />
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="create_post_sec fixed top-0" style={{display: post ? "block" : "none"}}>
            <CreatePost onSubmit={getData} />
        </div>
      </div>
  )
}

export default Profile
