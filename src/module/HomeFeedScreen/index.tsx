import { useEffect } from 'react';
import './index.css';
import FeedPost from '../../component/feedpost';
import SvgVector from '../../assets/Vector';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchData } from '../../slice/reducer';
import { fetchProfileFromFirestore } from '../EditProfileScreen/slice/reducer';


interface PostResponse {
  id: string;
  data: {
    validImages: string[];
    textarea: string;
    username: string;
  };
  uploadTime?: string; 
}

const HomeFeedScreen = () => {
  const navigate = useNavigate();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: any) => state.profile); 

  useEffect(() => {
    dispatch(fetchProfileFromFirestore()); 
  }, [dispatch]);

  const profilename = localStorage.getItem('email');
  const username = profilename?.split('@')[0];

  console.log(username);

  
  const usersPost = useSelector((state: RootState) => state.names.usersPost);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  console.log(usersPost, 'usersPost');

  const handleButtonClick = () => {
    navigate('/cameraacess');
  };

  const handleProfile = () => {
    navigate('/profilescreen');
  };

  const uniquePosts = Array.from(
    new Map(usersPost.map((post) => [post.id, post])).values()
  );


  const transformedPosts = uniquePosts.map((post: PostResponse) => ({
    ...post,
    uploadTime: post.uploadTime || '2024-12-13T00:00:00Z',
  }));

  return (
    <div className='home-profile-layout-overallcontainer'>
      <div className='home-profile-layout-container' onClick={handleProfile}>
        <img
          src={profile.profileImage}
          alt='Profile'
          height={'50'}
          width={'50'}
          className='profile--images'
        />
        <div className='home-profile-layout-detail'>
          <h3>Welcome Back</h3>
          <h1>{profile.name}</h1>
        </div>
      </div>

      <h2>Feeds</h2>
      <FeedPost usersPost={transformedPosts} />
      <div className='home-button-overview'>
        <div className='home-button-overview-icon' onClick={handleButtonClick}>
          <SvgVector />
        </div>
        {/* <Modal isOpen={isModalOpen} onClose={handleModalClose} /> */}
      </div>
    </div>
  );
};

export default HomeFeedScreen;
