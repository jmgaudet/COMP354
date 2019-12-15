import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        maxWidth: 325,
    },
    media: {
        height: 200,
    },
});

export const MediaCard = props => {
    const classes = useStyles();

    return (
        <Card className="cards">
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.person.image}
                    title="Team 2"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.person.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.person.program}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small">
                    Share
                </Button>
                <a href={props.person.website} target="_blank"><Button size="small">
                    Website
                </Button></a>
            </CardActions>
        </Card>

    );
};
