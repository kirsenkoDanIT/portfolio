import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import { NavLink } from 'react-router-dom';

export const UserCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia align="center" className={classes.media} title="User">
                <img
                    alt={'user'}
                    className={classes.img}
                    src="https://image.flaticon.com/icons/svg/126/126486.svg"
                />
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <NavLink to={'/profile'}>
                    <Button size="small" color="primary">
                        VIEW PROFILE
                    </Button>
                </NavLink>
            </CardActions>
        </Card>
    );
};
