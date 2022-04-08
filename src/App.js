import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core"
import memories from './images/memories.png';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './features/postSlice';
import { selectPosts } from './features/postSlice';


const App = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);

    const dispatch = useDispatch();

    const { getPostLoading } = useSelector(selectPosts)

    console.log('get post', getPostLoading)
    useEffect(() => {
        dispatch(getPosts());
        console.log('get post called')
    }, [currentId, dispatch, getPostLoading])
    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.he} variant="h2" align="center">
                    My Memories
                </Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;