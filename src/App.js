import React, {useState} from "react";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import './styles/App.css'

function App() {
    const [posts,setPost] = useState([
        {id: 1, title: 'Javascript', body: 'Description'},
        {id: 2, title: 'Python', body: 'Description'},
        {id: 3, title: 'Ruby', body: 'Description'},
        {id: 4, title: 'Java', body: 'Description'},
        {id: 5, title: 'Scala', body: 'Description'},
        {id: 6, title: 'HTML о.О', body: 'Description'},
    ])


  return (
    <div className="App">
        <form>
            <input type="text" placeholder="Заголовок"/>
            <input type="text" placeholder="Описание"/>
            <button>Создать пост</button>
        </form>
        <PostList posts={posts} title={"Мой список"}></PostList>
    </div>
  );
}

export default App;
