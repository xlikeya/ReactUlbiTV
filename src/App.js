import React, {useMemo, useState} from "react";
import FormPost from "./components/FormPost";
import PostList from "./components/PostList";
import './styles/App.css'
import MySelect from "./components/UI/select/MySelect";

function App() {
    const [posts,setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Description1'},
        {id: 2, title: 'Python', body: 'Description2'},
        {id: 3, title: 'Ruby', body: 'Description3'},
        {id: 4, title: 'Java', body: 'Description4'},
        {id: 5, title: 'Scala', body: 'Description5'},
        {id: 6, title: 'HTML о.О', body: 'Description6'},
    ])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSort, setSelectedSort] = useState('')

    const sortedPosts = useMemo(() =>{
        console.log('Отработал хук useMemo')
        if(selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts;
    }, [selectedSort, posts])


    const sortedAndSearchedPosts = useMemo(() =>{
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }
const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
}

const sortPosts = (sort) => {
    setSelectedSort(sort);
}



  return (
    <div className="App">
        <FormPost create={createPost}></FormPost>
        <hr style={{margin: '15px'}}/>
        <div>
            <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                plaseholder="Поиск..."
            />
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue="Сортировка"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]}
            ></MySelect>
        </div>
        {sortedAndSearchedPosts.length
            ?<PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Мой список"}></PostList>
            : <h1 style={{textAlign: 'center'}}>
                Список записей пуст
            </h1>
        }
    </div>
  );
}

export default App;
