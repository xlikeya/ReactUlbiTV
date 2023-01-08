import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getPosts as getPostsAction, deletePost as deletePostAction } from '../redux/modules/posts';
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";



function PostsRedux({ posts, getPosts, deletePost }) {
    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div className="App">
            <CreatePost />
            {posts.length && posts.map(item => (
                <Post deletePost={deletePost} id={item.id} key={item.id} title={item.title} body={item.body} />
            ))}
        </div>
    );
}

export default connect(
    ({ posts }) => ({ posts: posts.posts }),
    {
        getPosts: getPostsAction,
        deletePost: deletePostAction,
    }
)(PostsRedux);
