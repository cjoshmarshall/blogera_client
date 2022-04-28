import React from 'react'
import "./Profile.css"
import avatar from '../assets/avatar.jpg'

function Profile({posts}) {
  console.log(posts)


  return (
    <div className='profile'>
      <div className='profile_title'>ABOUT</div>
      {posts==1?
      <div>
        {posts.map(profile=>(
        <div key={profile._id}>
          {profile.user.dp?
            <img src={profile.user.dp} alt=" " className='profile_image' />
            :<img src={avatar} alt=" " className='profile_image' />
          }
          <p className='profile_user'>{profile.user.name}</p>
          <p className='profile_bio'>{profile.user.bio}</p>
        </div>
        ))}
      </div>:
      <div>
        {posts.splice(0,1).map(profile=>(
        <div key={profile._id}>
          {profile.user.dp?
            <img src={profile.user.dp} alt=" " className='profile_image' />
            :<img src={avatar} alt=" " className='profile_image' />
          }
          <p className='profile_user'>{profile.user.name}</p>
          <p className='profile_bio'>{profile.user.bio}</p>
        </div>
        ))}
      </div>
      }
    </div>
  )
}

export default Profile