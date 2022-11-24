import React, {useState} from "react";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import './styles/App.css'
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import {useRef} from "react";

function App() {
    const [posts,setPost] = useState([
        {id: 1, title: 'Javascript', body: 'Description'},
        {id: 2, title: 'Python', body: 'Description'},
        {id: 3, title: 'Ruby', body: 'Description'},
        {id: 4, title: 'Java', body: 'Description'},
        {id: 5, title: 'Scala', body: 'Description'},
        {id: 6, title: 'HTML о.О', body: 'Description'},
    ])

    const [title, setTitle] = useState('')
    const [body, setDescription] = useState('')
    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            id: Date.now(),
            title,
            body
        }
        setPost([...posts, newPost])
        setTitle('')
        setDescription('')
    }

  return (
    <div className="App">
        <form>
            <MyInput
                value={title}
                onChange={e => setTitle(e.target.value)}
                type="text"
                placeholder="Заголовок"
            />
            <MyInput
                value={body}
                onChange={e => setDescription(e.target.value)}
                type="text"
                placeholder="Описание"
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
        <PostList posts={posts} title={"Мой список"}></PostList>
    </div>
  );
}

export default App;
