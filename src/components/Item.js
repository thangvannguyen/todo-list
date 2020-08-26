import React from 'react'
import PropTypes from 'prop-types'

function Item(props) {

    function handleRemoveItem(indexItem){
        props.handleRemove(indexItem)
    }

    return (
        <li onClick={() => handleRemoveItem(props.indexItem) }> 
            {props.nameText }
            <img src={props.coverImage} width="50" style={{width:50 , marginRight: 20 }}/>
        </li>
    )
}

Item.propTypes = {

}

export default Item

