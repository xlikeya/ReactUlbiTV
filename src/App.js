import React, {useEffect, useState} from "react";
import FormPost from "./components/FormPost";
import PostList from "./components/PostList";
import './styles/App.css'
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";

function App() {
    const [posts,setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    async function fetchPosts() {
        const posts = await PostService.getAll();
        setPosts(posts)
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
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Мой список"}></PostList>
    </div>
  );
}

export default App;
