import React, { useState } from 'react';
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import { useNavigate } from 'react-router-dom';
import './Post.css';

function CreatePost(props) {
    const[val, setVal] = useState(false);
    const[post_img, setPost_img] = useState();
    const[post_body, setPost_body] = useState();
    function getImageFileObject(imageFile) {
        console.log({ imageFile })
        setPost_img({imageFile})
    }
    function runAfterImageDelete(file) {
        console.log({ file })
    }

    function createPost(event){
        event.preventDefault();
        const postData = {
            post_img,
            post_body,
            response: val
        }
        props.onSubmit(postData);
    }

  return (
      <div className='createPost flex justify-center items-center' style={{width: "100vw", height: "100vh"}}>
        <div className="cr_bd w-4/12 mx-auto shadow-2xl flex flex-col justify-center items-center p-8 gap-8 md:w-8/12 sm:w-11/12">
                <ImageUploader
                    onFileAdded={(img) => getImageFileObject(img)}
                    onFileRemoved={(img) => runAfterImageDelete(img)}
                />
                <form action="" className='flex flex-col w-full' onSubmit={createPost}>
                    <textarea className='border-b-2 w-full' name="" id="" cols="20" placeholder='Write something!!' onChange={(event) => setPost_body(event.target.value)}></textarea>
                    <div className='flex gap-8 justify-center mt-4 mb-2'>
                        <button className='p_b text-lg font-medium' style={{color: "#4FBA8C"}} onClick={() => setVal(true)}>Post</button>
                        <button className='p_b text-lg font-medium' style={{color: "#FD4D45"}} onClick={() => setVal(false)}>Discard</button>
                    </div>
                </form>
        </div>
      </div>
  )
}

export default CreatePost