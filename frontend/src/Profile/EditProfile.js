import axios from 'axios';
import React, { useState } from 'react';
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import Header from '../Header/Header';
import './Profile.css';

function EditProfile() {
    const[i, setI] = useState();
    const[name, setName] = useState();
    const[gender, setGender] = useState();
    const[religion, setReligion] = useState();
    const[political, setPolitical] = useState();
    const[address, setAddress] = useState();
    const[studies, setStudies] = useState();
    const[work, setWork] = useState();
    const[relation, setRelation] = useState();
    const[interested, setInterested] = useState();
    // const[i, setI] = useState();
    function getImageFileObject(imageFile) {
        var a = imageFile.dataUrl;
        console.log(imageFile);
        setI(a);
    }
    function runAfterImageDelete(file) {
        console.log({ file })
    }

    async function getUsersData(ele){
        ele.preventDefault();
        const user_data = localStorage.getItem('user') ?
              JSON.parse(localStorage.getItem('user')) : 
              '';
        console.log(user_data);
        const user = {
            profile_pic: i,
            name,
            gender,
            religion,
            political,
            address,
            studies,
            work,
            relation,
            interested_in: interested,
            userId: user_data.id
        }
        console.log(user);
        const user_rsponse = await axios.post('http://localhost:5000/profile', {user});
        console.log(user_rsponse);
    }

  return (
      <div>
            <Header />
            <div className='edit_profile py-8'>
            <div className="a flex flex-col justify-center rounded-md items-center w-2/4 mx-auto py-2 lg:w-11/12" style={{backgroundColor: "#FFF"}}>
                    <div className='py-4 lg:py-0'>
                        <ImageUploader
                            onFileAdded={(img) => getImageFileObject(img)}
                            onFileRemoved={(img) => runAfterImageDelete(img)}
                        />
                        <p className='py-2 text-lg font-thin'>Change profile photo</p>
                    </div>
                    <div className="form w-4/5 flex justify-center align-middle md:w-full md:justify-center">
                    <div className='flex flex-col justify-center w-full lg:w-4/5'>
                        {/* <h1 className='text-4xl py-4'>Sign Up</h1> */}
                        <form action="" className='flex flex-col' onSubmit={getUsersData}>
                            <div className='w-full flex items-center gap-4 text-lg font-thin justify-between'>
                                <p className='lg:hidden'>Name</p>
                                <input className='inpt py-2 my-4 w-4/5 rounded-md px-4 lg:w-full' type="text" placeholder='Name' onChange={(ele) => setName(ele.target.value)} />
                            </div>
                            <div className='w-full flex items-center gap-4 text-lg font-thin justify-between'>
                                <p className='lg:hidden'>Gender</p>
                                <input className='inpt py-2 my-4 w-4/5 rounded-md px-4 lg:w-full' type="text" placeholder='Gender' onChange={(ele) => setGender(ele.target.value)} />
                            </div>
                            <div className='w-full flex items-center gap-4 text-lg font-thin justify-between'>
                                <p className='lg:hidden'>Religion</p>
                                <input className='inpt py-2 my-4 w-4/5 rounded-md px-4 lg:w-full' type="text" placeholder='Religion' onChange={(ele) => setReligion(ele.target.value)} />
                            </div>
                            <div className='w-full flex items-center gap-4 text-lg font-thin justify-between'>
                                <p className='lg:hidden'>Politivs</p>
                                <input className='inpt py-2 my-4 w-4/5 rounded-md px-4 lg:w-full' type="text" placeholder='Politics' onChange={(ele) => setPolitical(ele.target.value)} />
                            </div>
                            <div className='w-full flex text-lg font-thin items-center gap-4 justify-between'>
                                <p className='lg:hidden'>Address</p>
                                <input className='inpt py-2 my-4 w-4/5 rounded-md px-4 lg:w-full' type="text" placeholder='Address' onChange={(ele) => setAddress(ele.target.value)} />
                            </div>
                            <div className='w-full flex items-center gap-4 text-lg font-thin justify-between'>
                                <p className='lg:hidden'>Works</p>
                                <input className='inpt py-2 my-4 w-4/5 rounded-md px-4 lg:w-full' type="text" placeholder='Works' onChange={(ele) => setWork(ele.target.value)} />
                            </div>
                            <div className='w-full flex font-thin text-lg items-center gap-4 justify-between'>
                                <p className='lg:hidden'>Study</p>
                                <input className='inpt py-2 my-4 w-4/5 rounded-md px-4 lg:w-full' type="text" placeholder='Study' onChange={(ele) => setStudies(ele.target.value)} />
                            </div>
                            <div className='w-full flex items-center gap-4 text-lg font-thin justify-between'>
                                <p className='lg:hidden'>Relationship</p>
                                <input className='inpt py-2 my-4 w-4/5 rounded-md px-4 lg:w-full' type="text" placeholder='Relationship' onChange={(ele) => setRelation(ele.target.value)} />
                            </div>
                            <div className='w-full flex items-center gap-4 text-lg font-thin justify-between'>
                                <p className='lg:hidden'>Interested In</p>
                                <input className='inpt py-2 my-4 w-4/5 rounded-md px-4 lg:w-full' type="text" placeholder='Interested In' onChange={(ele) => setInterested(ele.target.value)} />
                            </div>
                            <button className='w-28 py-2 mx-auto my-4 text-lg font-thin text-white' style={{backgroundColor: "#1b2e35", borderRadius: "28px"}}>Submit</button>
                        </form>
                        </div>
                </div>
            </div>
            </div>
      </div>
  )
}

export default EditProfile