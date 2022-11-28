import React, {useMemo, useState} from "react";
import FormPost from "./components/FormPost";
import PostList from "./components/PostList";
import './styles/App.css'
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
    const [posts,setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Description1'},
        {id: 2, title: 'Python', body: 'Description2'},
        {id: 3, title: 'Ruby', body: 'Description3'},
        {id: 4, title: 'Java', body: 'Description4'},
        {id: 5, title: 'Scala', body: 'Description5'},
        {id: 6, title: 'HTML о.О', body: 'Description6'},
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)

    const sortedPosts = useMemo(() =>{
        if(filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() =>{
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }
    const removePost = (post) => {
            setPosts(posts.filter(p => p.id !== post.id))
    }



  return (
    <div className="App">
        <MyButton onClick={() => setModal(true)}>Добавить</MyButton>
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
