import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux'
import { createPost, selectPosts, updatePost } from '../../features/postSlice';


const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();


  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });


  const post = useSelector((state) => currentId ? state?.post?.posts?.find((p) => p._id === currentId) : null);



  useEffect(() => {
    console.log('post', post)
    if (post) {
      setPostData(post)
    }
  }, [post])



  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(postData))
    } else {
      dispatch(createPost(postData))
    }
    handleClear();
  }

  const handleClear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.route} ${classes.form}`}
        onSubmit={handleSubmit}>
        <Typography variant="h6"> {!currentId ? 'Creating' : 'Editing'} a Memory</Typography>
        <TextField name="creator" variant='outlined' label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant='outlined' label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant='outlined' label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false}
            onDone={({ base64 }) => setPostData({
              ...postData,
              selectedFile: base64
            })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" size="large" color="primary" type="submit" fullWidth> Submit</Button>
        <Button className={classes.buttonSubmit} onClick={handleClear} size="small" variant="contained" color="secondary" fullWidth> Clear</Button>
      </form>
    </Paper>
  )
}

export default Form