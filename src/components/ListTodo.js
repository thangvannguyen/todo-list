import React ,{useState} from 'react'
import PropTypes from 'prop-types';
import Item from './Item';

function ListTodo(props) {
    const [listItem, setListItem] = useState([]);

    function addItem(){
        let text = document.getElementById('text-item');
        if( text.value.trim() !== ''){
            let listItemNew = [...listItem];
            listItemNew.push(text.value.trim());
            setListItem(listItemNew);
            text.value = '';
            text.focus();
        }
       
    };
    function clearItem(){ 
        setListItem([]);  
        document.getElementById('text-item').focus();
    };
       
    let handleRemoveItem = indexItem => {
        let newList  = [...listItem];   
        newList = newList.filter( (item , index)=> { return index !== indexItem });
        setListItem(newList);  
        document.getElementById('text-item').focus();

    };

    return (
    <div className="list-todo">
        <h4>ToDo List</h4>
        <input name="item" id="text-item"/> <button className="btn" onClick={() => addItem() }>Add 🌻</button> <button className="btn-clear" onClick={() => clearItem() }>Clear 🌿</button>
        <ul>
            {
                listItem.map( (item , index) => <Item  key={index} nameText={item} indexItem={index} handleRemove={handleRemoveItem} />)
            }
           
       </ul>
    </div>
      
    );
}

ListTodo.propTypes = {

}

export default ListTodo

