import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react';

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    errors,
  } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/img/logo/login.png' /> Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit(onSubmit)}>
          <Segment stacked>
            <Controller
              as={<Form.Input />}
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name='email'
              type='email'
              rules={{
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
              }}
              control={control}
              defaultValue=''
            />
            {errors.email && <span>Enter valid email</span>}

            <Controller
              as={<Form.Input />}
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              name='password'
              type='password'
              rules={{ required: true }}
              control={control}
              defaultValue=''
            />
            {errors.password && <span>This field is required</span>}

            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>

        <Message>
          New to us? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
