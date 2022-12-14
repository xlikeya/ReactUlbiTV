import React, {useEffect, useRef, useState} from "react";
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
import {getPageCount} from "./utils/pages";
//import {useObserver} from "./hooks/useObserver";
import MySelect from "./components/UI/select/MySelect";
import Pagination from "./components/UI/pagination/pagination";

function App() {
    const [posts,setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        console.log(totalCount)
        setTotalPages(getPageCount(totalCount, limit))
    })
    const lastElement = useRef()


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    /*useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })*/
    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const changePage = (page) => {
        setPage(page)
    }

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
        <MySelect
            value={limit}
            onChange={value => setLimit(value)}
            defaultValue="Кол-во элементов на странице"
            options={[
                {value: 5, name: '5'},
                {value: 10, name: '10'},
                {value: 25, name: '25'},
                {value: -1, name: 'Показать все'},
            ]}
        />
        {postError &&
            <h1>Произошла ошибка ${postError}</h1>
        }
        {isPostsLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader></Loader></div>
            :<PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Мой список"}></PostList>

        }
        <Pagination
            page={page}
            changePage={changePage}
            totalPages={totalPages}
        />
    </div>
  );
}

export default App;
