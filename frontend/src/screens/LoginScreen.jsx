import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

import Loader from '../components/atoms/Loader';

import styles from './LoginScreen.module.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const signup = () => {
    navigate('/register');
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Row className='justify-content-md-center' style={{margin: 0, padding: 0}}>
      <Col sm={12} md={3} className={`card ${styles.form_container}`}>
        <h1 className={`mt-2 ${styles.title}`}>サインイン</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='email'>
            <Form.Label className='my-2'>メールアドレス</Form.Label>
            <Form.Control type='email' placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='password'>
            <Form.Label className='my-2'>パスワード</Form.Label>
            <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button disabled={isLoading} type='submit' variant='primary' className={styles.signin_button}>
            ログイン
          </Button>
        </Form>

        {isLoading && <Loader />}

        <Row style={{borderTop: '1px solid #d0d0d0', margin: 0, padding: 0}}>
          <Col style={{padding: 0}}>
            <Button disabled={isLoading} type='button' variant='secondary' className={styles.signup_button} onClick={() => signup()}>
              新規登録
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginScreen;
