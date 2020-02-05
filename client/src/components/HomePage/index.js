import React, { useEffect, useState } from 'react';
import { UserCard } from '../';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';

export const HomePage = () => {
	const classes = useStyles();

	return (
		<Grid container className={classes.root} spacing={2}>
			<Grid item xs={12}>
				<Grid container justify="flex-start" spacing={2}>
					{[0, 1, 2, 4, 5, 6, 7, 8, 9, 10].map((value) => (
						<Grid key={value} item xs={12} sm={6} md={4} lg={3}>
							<UserCard />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};
