import React from 'react';

const Friends = ({friend}) => {
  console.log('friend:', friend); // Add this line
  return (
       <div className='friend'>
            <div className='friend-image'>
                 <div className='image'>
                 <img src={`./image/${friend.fndInfo.image}`} alt='' />
                 </div>
            </div>

            <div className='friend-name-seen'>
                 <div className='friend-name'>
                       <h4>{friend.fndInfo.username}</h4>
                 </div>
            </div>
       </div>
  )
};

export default Friends;