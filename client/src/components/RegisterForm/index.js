import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form';

import { useStyles } from './styles';

export const RegisterForm = (props) => {
    const classes = useStyles();

    const [confirmError, setConfirmError] = useState(false);

    const { register, errors, handleSubmit } = useForm();
    const onSubmit = (data) => {
        if (data.password === data.confirmedPassword) {
            setConfirmError(false);
            delete data.confirmedPassword;
            console.log(data);
            props.history.push('/');
        } else setConfirmError(true);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={register({
                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                                    required: true,
                                })}
                                variant="outlined"
                                fullWidth
                                id="email"
                                name="email"
                                type="email"
                                label={
                                    (errors.email && 'Enter valid email') ||
                                    'Email Address'
                                }
                                error={!!errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={register({
                                    required: true,
                                    minLength: 5,
                                })}
                                variant="outlined"
                                fullWidth
                                name="password"
                                type="password"
                                id="password"
                                label={
                                    (errors.password &&
                                        'Enter password, 5 or more chracters') ||
                                    'Password'
                                }
                                error={!!errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={register({ required: true })}
                                variant="outlined"
                                fullWidth
                                name="confirmedPassword"
                                type="password"
                                id="confirmedPassword"
                                label={
                                    (confirmError &&
                                        'Passwords does not match') ||
                                    'Confirm password'
                                }
                                error={confirmError}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <NavLink to="/login" variant="body2">
                                Already have an account? Sign In
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};
