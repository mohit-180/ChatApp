import {React,  useState ,useEffect} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { userLogin } from '../store/actions/authAction';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';

const Login = () => {


    const { authenticate, error, successMessage} = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state,setState] = useState({
        email : '',
        password : ''
    });

    const inputHandle = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        dispatch(userLogin(state))
    }

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
                    <h3>Login</h3>
                </div>

                <div className='card-body'>
                    <form onSubmit={login}>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" onChange={inputHandle} name = "email" value={state.email} className="form-control"
                                id="email" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" onChange={inputHandle} name = "password" value={state.password} className="form-control"
                                id="password" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <input type="submit" value="login" className="btn" />
                        </div>

                        <div className="form-group">
                            <span><Link to="/chatapp/register" >Don't Have Any Account</Link></span>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
};

export default Login;
