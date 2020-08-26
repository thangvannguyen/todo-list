import React ,{useState , useEffect} from 'react'
import PropTypes from 'prop-types';
import Item from './Item';
import { db } from '../firebase' ;


function ListTodo(props) {
   // console.log(props);
   const [listItem , setListItem] = useState([]);

   useEffect(() => {
      db.collection('posts').onSnapshot(snapshot => {
      const postsNew =  snapshot.docs.map( doc => ({id: doc.id , post: doc.data()}));
      setListItem(postsNew);
     });
    }, []);

     
    function addItem(){
        let text = document.getElementById('text-item');
        if( text.value.trim() !== ''){
            let listItemNew = [...listItem];
            listItemNew.push(text.value.trim());
            setListItem(listItemNew);
            text.value = '';
            text.focus();
        }else{
            text.focus();
        }
       
       
    };
    function clearItem(){ 
        setListItem([]);  
        document.getElementById('text-item').focus();
    };
       
    let handleRemoveItem = indexItem => {
        let newList  = [...listItem];   
        newList = newList.filter( (item , index)=> { return item.id !== indexItem });
        setListItem(newList);  
        document.getElementById('text-item').focus();

    };

    return (
    <div className="list-todo">
        <h4>ToDo List</h4>
        <input name="item" id="text-item"/> <button className="btn" onClick={() => addItem() }>Add 🌻</button> <button className="btn-clear" onClick={() => clearItem() }>Clear 🌿</button>
        <ul>
            
            {
                listItem.map( (item , index) => <Item  key={index} nameText={item.post.title} coverImage={item.post.cover} indexItem={item.id} handleRemove={handleRemoveItem} />)
            }
           
       </ul>
    </div>
      
    );
}

ListTodo.propTypes = {

}

export default ListTodo

