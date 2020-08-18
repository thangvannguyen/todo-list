import React from 'react'
import PropTypes from 'prop-types'

function Item(props) {

    function handleRemoveItem(indexItem){
        props.handleRemove(indexItem)
    }

    return (
        <li onClick={() => handleRemoveItem(props.indexItem) }> 
            {props.nameText }
        </li>
    )
}

Item.propTypes = {

}

export default Item

