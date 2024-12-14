import React, { useEffect, useState } from 'react'
import './index.css'
import { mockData } from './mock'
import Button from '../../component/button'
import SvgVector from '../../assets/Vector'
import { auth, provider } from '../../firebase/config'
import { signInWithPopup } from 'firebase/auth'
import CreatePostScreen from '../CreatePostScreen'
import HomeFeedScreen from '../HomeFeedScreen'


const SignUp = () => {

  const [email, setEmail] = useState<string | null>(null);


  const handleSignup = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const userEmail = data.user.email;
        if (userEmail) {
          setEmail(userEmail);
          localStorage.setItem('email', userEmail);
        }
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
  };


  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <>
      {email ? <HomeFeedScreen /> :

        <div className="signup-overall-zigzag-container">
          <div className="signup-zigzag-container">
            {mockData.map((row, rowIndex) => (
              <div className="signup-three-layer-container" key={rowIndex}>
                {row.map((item, itemIndex) => (
                  <div className={`signup-layer ${item.layerClass}`} key={itemIndex}>
                    <img src={item.imgSrc} alt={`signup-Layer ${item.layerClass}`} className="img" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="signup-bottom-container">
            <div className="signup-bottom-container-logo">
              <img src={"https://i.ibb.co/h8QXhDC/2de875e6142d3dde26f7cea380c77837-1.png"} alt="IMage" height={"34"} width={"46"} />
              <p>Vibesnap</p>
            </div>
            <div className="signup-bottom-container-txt">Moments That Matter, Shared Forever.</div>
            <Button
              backgroundColor="#292929"
              color="#ffff"
              leftIcon={<img src="https://i.ibb.co/grrtvLF/Group-1171276158.png" alt="icon" style={{ width: '20px', height: '20px' }} />}
              labelText="Continue with Google"
              borderRadius="26px"
              onClick={handleSignup}
              className='signup-but-signup'
            />
          </div>
        </div>
      }
    </>
  )
}

export default SignUp
