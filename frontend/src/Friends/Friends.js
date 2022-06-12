import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Friends() {
    const[friends, setFriends] = useState([
        {
            name: "abc",
            img: "https://img.freepik.com/free-photo/photo-young-attractive-man-blanc-t-shirt-cheerful-looks-camera-stands-pink-background-smiles_295783-3306.jpg?t=st=1654175953~exp=1654176553~hmac=2d8515ebe2ee3b874cc32f36e3bbcdb4f95191374e2870eef57e48657e5a3ed7&w=740"
        },
        {
            name: "efg",
            img: "https://img.freepik.com/free-photo/photo-disgusted-dark-skinned-boy-with-clenched-lips-saw-something-repulsive-unpleasant-frowning-stands-pink-background-people-emotion-concept_295783-3272.jpg?size=626&ext=jpg"
        },
        {
            name: "hij",
            img: "https://img.freepik.com/free-photo/man-takes-photos-with-gift-box-holds-it-his-hands-looks-away-his-face-expression-bewilderment_295783-15796.jpg?size=626&ext=jpg"
        },{
            name: "klm",
            img: "https://img.freepik.com/free-photo/photo-young-attractive-man-blanc-t-shirt-cheerful-looks-camera-stands-pink-background-smiles_295783-3306.jpg?t=st=1654175953~exp=1654176553~hmac=2d8515ebe2ee3b874cc32f36e3bbcdb4f95191374e2870eef57e48657e5a3ed7&w=740"
        }
    ])
    const navigate = useNavigate();
  return (
      <div>
        <div className='friends flex w-2/5 justify-between mx-auto md:w-3/5 sm:w-4/5 sm:gap-2'>
            {
                friends ? friends.map((ele, i) => (
                    <div className='flex flex-col'>
                        <img className='w-20 h-20 rounded-full sm:w-16 sm:h-16' src={ele.img} alt="" />
                        <p className='text-lg font-light'>{ele.name}</p>
                    </div>
                        
                ))
                :
                console.log("sdjkfgsjkfh")
            }
        </div>
        <div className='flex justify-end w-2/5 sm:4/5 mx-auto' style={{color: "#9FA09E", cursor: "pointer"}} onClick={() => {
            navigate('friends');
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </div>
      </div>
  )
}

export default Friends