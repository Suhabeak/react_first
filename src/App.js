// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){
  return <header>
    <h1>
      <a href="/" onClick={(event) => {
        event.preventDefault();
        props.click();
      }}>{props.title}</a>
    </h1>
    {props.category}
  </header>
}

function Nav(props){
  const lis = []
  for(let i=0; i<props.list.length; i++){
  const hamin = props.list[i];
  lis.push(<li key={hamin.id}>
    <a id={hamin.id} href={'/read/' + hamin.id} onClick={(event) => {
      event.preventDefault();
      props.click(Number(event.target.id));
    }}>{hamin.title}</a>
    </li>)
  }

  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function Create(props){
  return <article>
    <h2>입력하기</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      props.onCreate(event.target.title.value, event.target.body.value);
    }}>
      <p><input type="text" name="title" placeholder='title'></input></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="입력"></input></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [man, girl] = useState(null);



  const topics=[
    {id:1, title:"html", body:"html is..."},
    {id:2, title:"css", body:"css is..."},
    {id:3, title:"js", body:"js is..."}
  ];

  let poket = null;
  if(mode === "WELCOME"){
    poket = <Article title="WELCOME" body="Hello, WEB"></Article>
  } else if(mode === "READ") {
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, man);
      if(topics[i].id === man) {
        title = topics[i].title;
        body= topics[i].body;
      }
    }
    poket = <Article title={title} body={body}></Article>
  } else if (mode === "CREATE") {
    poket = <Create onCreate={(title, body)=>{
      console.log(title, body);
    }}></Create>
  }

  return (
    <div className="App">
      <Header title="제목" category="목차" click={() => {
        setMode('WELCOME');
      }}></Header>

      <Nav list={topics} click={(id) => {
        setMode('READ');
        girl(id);
      }}></Nav>

      {poket}

      <a href="/create" onClick={event => {
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>
      </div>
  );
}

export default App;
