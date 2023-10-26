import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/atoms/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

import styles from './RegisterScreen.module.css';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Row className='justify-content-md-center' style={{ margin: 0, padding: 0 }}>
      <Col sm={12} md={3} className={`card ${styles.form_container}`}>
        <h1 className={styles.title}>新規登録</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>名前</Form.Label>
            <Form.Control type='name' placeholder='名前入力' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='email'>
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control type='email' placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='password'>
            <Form.Label>パスワード</Form.Label>
            <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
          </Form.Group>
          <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label>パスワード確認</Form.Label>
            <Form.Control type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className={styles.signup_button}>
            新規登録
          </Button>

          {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
          <Col>
            アカウントをお持ちですか? <Link to={`/login`}>ログイン</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
