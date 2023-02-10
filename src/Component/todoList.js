import React, {useState} from "react";
import styled from 'styled-components';
import { faTimes, faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const List = styled.li`
  margin-bottom: 10px;
  &.done{
    color : rgba(100,100,100);
    text-decoration: line-through rgba(100,100,100);
  }
  >input[type=text]{
    background-color: transparent;
    border: transparent;
    font-size: 1.4rem;
  }
`


const TodoList = ({todoLists, setTodoLists, list, idx}) => {
  const setIsDoneHandler = (e, key) => {
    let selectedData = todoLists[key]
    selectedData = {...selectedData,isDone: !selectedData.isDone }
    setTodoLists([...todoLists.slice(0,key),selectedData,...todoLists.slice(key+1)]) //!
  }
  const eraseList = (key) => {
    let filtered = todoLists.filter((list,idx)=> idx !== key)

    setTodoLists(filtered)
  }
  const [editMode, setEditMode] = useState(false);
  const editModeHandler = () => {
    setEditMode(!editMode)
  }

  const [changedContent, setChangedContent] = useState(list.content)
  const changeContentHandler = (e) => {
    setChangedContent(e.target.value)
  }
  const changeTaskHandler = (idx) => {
    const seletedTodo = todoLists.filter((ele,idx1)=> idx1 === idx)[0]
    seletedTodo.content = changedContent
    setTodoLists([...todoLists.slice(0,idx),seletedTodo,...todoLists.slice(idx+1)])
    setEditMode(!editMode)
  }


  return(
    <>
      <List className={list.isDone ?"done" :null}>
        <input type='checkbox' checked={list.isDone} onChange={(e)=>setIsDoneHandler(e, idx)} />
        {editMode === true
        ? <input 
            type="text"
            value={changedContent}
            placeholder={changedContent}
            onChange={changeContentHandler}  
          />
        : ` ${list.content}`
        }
        {editMode === true
        ? <button onClick={()=>changeTaskHandler(idx)}><FontAwesomeIcon icon={faCheck} size="lg" /></button>
        : <button onClick={editModeHandler}><FontAwesomeIcon icon={faPenToSquare} size="lg" /></button>
        }
        <button onClick={()=>eraseList(idx)}><FontAwesomeIcon icon={faTimes} size="lg" /></button>
      </List>
    </>

  )
}


export default TodoList;