import React, { useState } from 'react'
import Header from '../Header/Header'

function FriendList() {
    const[friends, setFriends] = useState([
        {
            name: "Alikhesh Varubai",
            img: "https://img.freepik.com/free-photo/photo-young-attractive-man-blanc-t-shirt-cheerful-looks-camera-stands-pink-background-smiles_295783-3306.jpg?t=st=1654175953~exp=1654176553~hmac=2d8515ebe2ee3b874cc32f36e3bbcdb4f95191374e2870eef57e48657e5a3ed7&w=740"
        },
        {
            name: "Eilias Taug",
            img: "https://img.freepik.com/free-photo/photo-young-attractive-man-blanc-t-shirt-cheerful-looks-camera-stands-pink-background-smiles_295783-3306.jpg?t=st=1654175953~exp=1654176553~hmac=2d8515ebe2ee3b874cc32f36e3bbcdb4f95191374e2870eef57e48657e5a3ed7&w=740"
        },
        {
            name: "Haringar Mathul",
            img: "https://img.freepik.com/free-photo/photo-young-attractive-man-blanc-t-shirt-cheerful-looks-camera-stands-pink-background-smiles_295783-3306.jpg?t=st=1654175953~exp=1654176553~hmac=2d8515ebe2ee3b874cc32f36e3bbcdb4f95191374e2870eef57e48657e5a3ed7&w=740"
        },
        {
            name: "Kalp Merais",
            img: "https://img.freepik.com/free-photo/photo-young-attractive-man-blanc-t-shirt-cheerful-looks-camera-stands-pink-background-smiles_295783-3306.jpg?t=st=1654175953~exp=1654176553~hmac=2d8515ebe2ee3b874cc32f36e3bbcdb4f95191374e2870eef57e48657e5a3ed7&w=740"
        },
        {
            name: "Kalp Merais",
            img: "https://img.freepik.com/free-photo/photo-young-attractive-man-blanc-t-shirt-cheerful-looks-camera-stands-pink-background-smiles_295783-3306.jpg?t=st=1654175953~exp=1654176553~hmac=2d8515ebe2ee3b874cc32f36e3bbcdb4f95191374e2870eef57e48657e5a3ed7&w=740"
        },
        {
            name: "Kalp Merais",
            img: "https://img.freepik.com/free-photo/photo-young-attractive-man-blanc-t-shirt-cheerful-looks-camera-stands-pink-background-smiles_295783-3306.jpg?t=st=1654175953~exp=1654176553~hmac=2d8515ebe2ee3b874cc32f36e3bbcdb4f95191374e2870eef57e48657e5a3ed7&w=740"
        }
    ])
  return (
      <div>
            <Header />
            <div className="friends_list w-3/5 shadow-2xl py-8 px-10 rounded-md mx-auto my-4 md:w-10/12 sm:w-11/12">
            <h1 className='text-xl font-thin border-b-2'>FRIENDS</h1>
            {
                friends.map((friend) => (
                    <div className='flex justify-between items-center my-8'>
                        <div className='flex items-center gap-4 text-lg font-thin'>
                            <img className='w-16 h-16' style={{borderRadius: "50%"}} src={friend.img} alt="" />
                            <h2>{friend.name}</h2>
                        </div>
                        <button className='flex items-center gap-2 border-2 p-1 rounded-sm text-lg font-thin'><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#A4A7A6" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                        </svg><div className='sm:hidden'>Remove</div></button>
                    </div>
                ))
            }
            </div>
      </div>
  )
}

export default FriendList