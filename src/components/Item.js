import React from 'react';
import PropTypes from 'prop-types';

function Item(props) {

    function handleRemoveItem(indexItem){
       // props.handleRemove(indexItem)
    }
    function handleUpdateItem(item){
         props.handleUpdate(item);
     }
     function handleDeleteItem(indexItem){

        props.handleDelete(indexItem);
    }


    return (
        <li style={{ display: 'flex', alignItems: 'flex-start' , marginBottom:16}}> 
            <img src={props.coverImage} width="50" style={{width:50 ,height:50, marginRight: 20 , borderRadius:50 ,objectFit:'cover' ,border: '2px solid' }}/>
            <div style={{ display: 'flex',  flexDirection: 'column', alignItems: 'flex-start'}}>
                <span style={{paddingTop:3}}>  {props.titleText } <span style={{color:'#80b9e6' , fontSize:10, textTransform: 'uppercase', fontWeight: 700 }}>[{props.authorText.trim()}]</span> </span>  
                <p style={{marginTop: 5 , marginBottom: 5, marginLeft:0 ,fontSize: 13 , color: '#a700d4e3' }}> {props.summaryText }</p>
            </div>
            <button className="btn-show-update"  onClick={(e) => { e.preventDefault();  handleUpdateItem(props) } } >Update ⚔️</button>
            <button className="btn-delete"  onClick={(e) => { e.preventDefault();  handleDeleteItem(props.indexItem) } } >Delete 💎</button>
        
        </li>
    )
}

Item.propTypes = {

}

export default Item

