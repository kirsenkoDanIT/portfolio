import React from 'react';
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

export const LoginForm = (props) => {
    const classes = useStyles();

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        props.history.push('/');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
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
                                        'Password must contains 5 or more characters') ||
                                    'Password'
                                }
                                error={!!errors.password}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <NavLink to="/register" variant="body2">
                                Don't have an account? Sign Up
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};
