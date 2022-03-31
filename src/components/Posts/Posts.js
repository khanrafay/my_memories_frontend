import React from 'react'
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { selectPosts } from '../../features/postSlice';

function Posts() {

  const classes = useStyles();
  const posts = useSelector(selectPosts)

  console.log('postsss', posts)
  return (
    <>
      <div>Posts</div>
      <Post />
      <Post />
      <Post />
    </>
  )
}

export default Posts