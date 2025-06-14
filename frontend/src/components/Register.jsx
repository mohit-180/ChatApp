import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../store/actions/authAction';
import toast from 'react-hot-toast';
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';

const Register = () => {
    const navigate = useNavigate();

    const { authenticate, error, successMessage, myInfo } = useSelector(state => state.auth);
    console.log('myInfo',myInfo);

    const dispatch = useDispatch();

    const [state, setstate] = useState({
        userName: '', // <-- userName
        email: '',
        password: '',
        confirmPassword: '',
        image: ''
    });

    const [loadImage, setLoadImage] = useState('');

    const inputHandle = e => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const fileHandle = e => {
        if (e.target.files.length !== 0) {
            setstate({
                ...state,
                [e.target.name]: e.target.files[0]
            });
        }

        const reader = new FileReader();
        reader.onload = () => {
            setLoadImage(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const register = e => {
        const { userName, email, password, confirmPassword, image } = state;
        e.preventDefault();
        const formData = new FormData();
        formData.append('userName', userName); // <-- userName
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('image', image);

        dispatch(userRegister(formData));
    };

    useEffect(() => {
        if (authenticate) {
            navigate('/');
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch({ type: SUCCESS_MESSAGE_CLEAR })
        }
        if (error) {
            toast.error(error);
            dispatch({type : ERROR_CLEAR})
        }
    }, [successMessage, error]);

    return (
        <div className='register'>
            <div className='card'>
                <div className='card-header'>
                    <h3>Register</h3>
                </div>

                <div className='card-body'>
                    {successMessage && (
                        <div className="alert alert-success">{successMessage}</div>
                    )}
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" onChange={inputHandle} name="userName"
                                value={state.userName} className="form-control"
                                id="username" placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" onChange={inputHandle} name="email"
                                value={state.email} className="form-control"
                                id="email" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" onChange={inputHandle} name="password"
                                value={state.password} className="form-control"
                                id="password" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" onChange={inputHandle} name="confirmPassword"
                                value={state.confirmPassword} className="form-control"
                                id="confirmPassword" placeholder="Confirm password" />
                        </div>

                        <div className="form-group">
                            <div className='file-image'>
                                <div className='image'>
                                    {loadImage ? <img src={loadImage} alt="Uploaded preview" /> : ''}
                                </div>
                                <div className='file'>
                                    <label htmlFor="image">Select Image</label>
                                    <input type="file" onChange={fileHandle} name="image"
                                        className="form-control"
                                        id="image" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <input type="submit" className="btn" />
                        </div>

                        <div className="form-group">
                            <span><Link to="/chatapp/login" >Login Your Account</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
