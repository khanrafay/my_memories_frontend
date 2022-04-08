import React from 'react'
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { selectPosts } from '../../features/postSlice';
import { CircularProgress, Grid } from '@material-ui/core';

function Posts({ currentId, setCurrentId }) {

  const classes = useStyles();
  const posts = useSelector(selectPosts)

  console.log('postsss', posts)
  return (
    !posts.post.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.post.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts