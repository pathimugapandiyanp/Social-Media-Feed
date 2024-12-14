import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchData } from '../../slice/reducer';
import './index.css';

const ProfilePostes = () => {
  
  const usersPost = useSelector((state: RootState) => state.names.usersPost);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  console.log(usersPost, "usersPost");

  return (
    <div>
      <h2>My Posts</h2>
      <div className="profile-zigzag-container">
     
        {usersPost.map((post, index) => (
          <div
            className={`profile-profilelayer ${index % 2 === 0 ? 'left' : 'right'}`}
            key={post.id}
          >
 
            {post.data.validImages?.length > 0 && (
              <img
                src={post.data.validImages[0]}  
                alt="testimg"
                className="profile-profileimg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePostes;
