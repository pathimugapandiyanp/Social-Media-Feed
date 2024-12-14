import React from 'react';
import './index.css';
import Button from '../button';
import SvgHiHeart from '../../assets/SvgHiHeart';
import SvgNavigation from '../../assets/SvgNavigation';
import { formatDistanceToNow } from 'date-fns'; 


interface PostData {
  id: string;
  data: {
    validImages: string[];
    textarea: string;
    username: string;
  };
  uploadTime: string; 
}

interface FeedPostProps {
  usersPost: PostData[]; 
}

const FeedPost: React.FC<FeedPostProps> = ({ usersPost }) => {
  console.log(usersPost, "userspost");

  
  const handleShare = (postId: string) => {
    const currentUrl = window.location.href; 
    
    if (navigator.share) {
     
      navigator.share({
        title: 'Check out this post!',
        text: `Post ${postId} - This is an awesome post!`,
        url: currentUrl, 
      }).then(() => {
        console.log('Post shared successfully');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
     
      const encodedUrl = encodeURIComponent(currentUrl);
      const encodedText = encodeURIComponent(`Check out Post ${postId}`);
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
      
     
      window.open(facebookUrl, '_blank', 'width=600,height=400');
      
       window.open(twitterUrl, '_blank', 'width=600,height=400');
    }
  };

 
  const formatUploadTime = (uploadTime: string) => {
    const timeString = formatDistanceToNow(new Date(uploadTime), { addSuffix: true });
    return timeString.replace(/^about /, ''); 
  };

  const defaultColors = ['#F7EBFF', '#FFFAEE'];


  const getRandomColor = () => {
    return defaultColors[Math.floor(Math.random() * defaultColors.length)];
  };

  return (
    <>
      {usersPost.map((post) => (
        <div
          className="feed-layout-overall-container"
          key={post.id}
          style={{ backgroundColor: getRandomColor() }} 
        >
          <div className="feed-layout-header">
            <img
              src="https://i.ibb.co/S6VFmLG/Menu.png"
              alt="Profile"
              className="feed-profile-image"
            />
            <div className="feed-layout-details">
              <h3 className="feed-welcome-text">{post.data.username}</h3>
              <h1 className="feed-user-name">{formatUploadTime(post.uploadTime)}</h1>
            </div>
          </div>

          <p className="feed-post-content">{post.data.textarea}</p>

         
          {post.data.validImages && post.data.validImages.length > 0 && (
            <div
              className={`feed-post-media-container ${post.data.validImages.length === 1 ? 'single-image' : ''}`}
            >
              <div className="feed-post-images-scrollable">
                {post.data.validImages.map((imageSrc, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={imageSrc}
                    alt="test"
                    className="feed-post-media"
                  />
                ))}
              </div>
            </div>
          )}

          
          <div className="feed-post-media-share">
            <span className="but-heart-overview">
              <SvgHiHeart />
              <span className="but-heart">43</span> 
            </span>
            <Button
              labelText="Share"
              backgroundColor="#00000012"
              color="#000000"
              borderRadius="30px"
              className="Button-sharpost"
              leftIcon={<SvgNavigation />}
              onClick={() => handleShare(post.id)} 
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default FeedPost;
