import React, {useEffect, useState} from "react";
import FormPost from "./components/FormPost";
import PostList from "./components/PostList";
import './styles/App.css'
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import {useFetching} from "./hooks/useFetching";

function App() {
    const [posts,setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [totalCount, setTotalCount] = useState(0)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll();
        setPosts(response.data)
        setTotalCount(response.headers['x-total-count'])
    })



    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


    useEffect(() => {
        fetchPosts()
    }, [])
  return (
    <div className="App">
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>Добавить</MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <FormPost create={createPost}></FormPost>
        </MyModal>

        <hr style={{margin: '15px'}}/>
        <PostFilter
            filter = {filter}
            setFilter={setFilter}
        ></PostFilter>
        {postError &&
            <h1>Произошла ошибка ${postError}</h1>
        }
        {isPostsLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader></Loader></div>
            :<PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Мой список"}></PostList>

        }
    </div>
  );
}

export default App;
