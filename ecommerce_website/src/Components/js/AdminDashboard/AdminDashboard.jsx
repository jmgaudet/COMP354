/*
This Dashboard, as well as the corresponding files that make up this dashboard are from a pre made material-ui template
retrieved from https://material-ui.com/getting-started/templates/
code has been modified to suit the needs of this project
*/
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//import Chart from './Chart';
import TotalSales from './TotalSales';
import Sales from './Sales';
import Users from './Users';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',

    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: '100vh'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function Dashboard({sellerId}) {
    const classes = useStyles();


    return (
        <div className={classes.root}>


            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <div align="center">
                    <Typography variant="h4"> Admin Dashboard </Typography>
                </div>

                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        {/* <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart sellerId={sellerId}/>
              </Paper>
            </Grid> */}
                        {/* Recent Deposits */}
                        <Grid container justify="center">
                            <Grid>
                                <TotalSales sellerId={sellerId}/>
                            </Grid>
                        </ Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Sales sellerId={sellerId}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Users sellerId={sellerId}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

            </main>
        </div>
    );
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    sellerId: state.user.sellerId

});
export default connect(mapStateToProps)(Dashboard);