import './App.css';
import React from "react"
import data from './data.json'
import Comment from './componants/Comment'
import AddComment from './componants/AddComment'

function App() {
  console.log(data)
  const [comments,  setComments] = React.useState(JSON.parse(localStorage.getItem('storedComments')) || data.comments)
  
  function incScore(id){
    setComments(prev => prev.map(el => {
      if (el.id === id) {
        return {...el, score: el.score+1}
      } else{
        if (el.replies.length > 0){
          return {...el, replies: el.replies.map(
            rep => (
              rep.id === id 
              ? {...rep, score: rep.score+1}
              : rep
            )
          )}
        } else{
          return el
        }
      }

    }
    ))
  }
  function decScore(id){
    setComments(prev => prev.map(el => {
      if (el.id === id) {
        return {...el, score: el.score-1}
      } else{
        if (el.replies.length > 0){
          return {...el, replies: el.replies.map(
            rep => (
              rep.id === id 
              ? {...rep, score: rep.score-1}
              : rep
            )
          )}
        } else{
          return el
        }
      }}
    ))
  }

  
  React.useEffect(()=>{
    localStorage.setItem('storedComments', JSON.stringify(comments))
  }, [comments])

  const showComments = comments.map(com => 
    {
      return <>
      <Comment 
      key={com.id}
      data = {com}
      incScore = {incScore}
      decScore = {decScore}

      />
      
      {
      (com.replies.length > 0) && 
        (
          <div className='replies-container'>
            {
              com.replies.map(rep => {
                return <Comment 
                key={rep.id}
                isReply = {true}
                data = {rep}
                incScore = {incScore}
                decScore = {decScore}
                />
              })
            }
          </div>
        )
      }

      </> 
    }
    
  )

  return (
    <div className="App">
      {
        showComments
      }
    </div>
  );
}

export default App;
