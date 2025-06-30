import { useContext, useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import for jwt-decode@4.x
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecruiterLogin = () => {
  const navigate = useNavigate();

  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const {
    setShowRecruiterLogin,
    backendUrl,
    setCompanyToken,
    setCompanyData,
  } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === 'Sign Up' && !isTextDataSubmited) {
      return setIsTextDataSubmited(true);
    }

    try {
      if (state === 'Login') {
        const { data } = await axios.post(`${backendUrl}/api/company/login`, {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/admin');
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('image', image);

        const { data } = await axios.post(
          `${backendUrl}/api/company/register`,
          formData
        );

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/admin');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Network Error');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // ✅ Fixed
      const { email, name: googleName, picture } = decoded;

      const companyName = prompt('Enter your Company Name to continue:');
      if (!companyName) {
        toast.error('Company name is required!');
        return;
      }

      const { data } = await axios.post(`${backendUrl}/api/company/google-login`, {
        name: companyName,
        email,
        picture,
      });

      if (data.success) {
        setCompanyData(data.company);
        setCompanyToken(data.token);
        localStorage.setItem('companyToken', data.token);
        setShowRecruiterLogin(false);
        navigate('/admin');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Google login failed.');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form
        onSubmit={onSubmitHandler}
        className='relative bg-white p-10 rounded-xl text-slate-500 min-w-[350px]'
      >
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>
          Recruiter {state}
        </h1>
        <p className='text-sm mb-4'>Welcome back! Please sign in to continue</p>

        {state === 'Sign Up' && isTextDataSubmited && (
          <div className='flex items-center gap-4 my-6'>
            <label htmlFor='image'>
              <img
                className='w-16 rounded-full'
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt='upload-logo'
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type='file'
                id='image'
                hidden
              />
            </label>
            <p>Upload Company <br /> logo</p>
          </div>
        )}

        {state !== 'Sign Up' || (state === 'Sign Up' && isTextDataSubmited) ? (
          <>
            {state !== 'Login' && (
              <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-3'>
                <img src={assets.person_icon} alt='' />
                <input
                  className='outline-none text-sm'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type='text'
                  placeholder='Company Name'
                  required
                />
              </div>
            )}

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-3'>
              <img src={assets.email_icon} alt='' />
              <input
                className='outline-none text-sm'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                placeholder='Email Id'
                required
              />
            </div>

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-3'>
              <img src={assets.lock_icon} alt='' />
              <input
                className='outline-none text-sm'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Password'
                required
              />
            </div>
          </>
        ) : null}

        {state === 'Login' && (
          <p className='text-sm text-blue-600 mt-3 cursor-pointer'>
            Forgot password?
          </p>
        )}

        <button
          type='submit'
          className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'
        >
          {state === 'Login'
            ? 'Login'
            : isTextDataSubmited
            ? 'Create Account'
            : 'Next'}
        </button>

        <div className='text-center text-sm mt-4'>
          {state === 'Login' ? (
            <p>
              Don't have an account?{' '}
              <span
                className='text-blue-600 cursor-pointer'
                onClick={() => setState('Sign Up')}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span
                className='text-blue-600 cursor-pointer'
                onClick={() => setState('Login')}
              >
                Login
              </span>
            </p>
          )}
        </div>

        <div className='my-5 text-center'>
          <p className='text-sm text-gray-500 mb-2'>
            Or {state.toLowerCase()} with
          </p>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google Login Failed')}
          />
        </div>

        <img
          onClick={() => setShowRecruiterLogin(false)}
          className='absolute top-5 right-5 cursor-pointer'
          src={assets.cross_icon}
          alt='close'
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;