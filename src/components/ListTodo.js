import React ,{useState , useEffect} from 'react'
import PropTypes from 'prop-types';
import Item from './Item';
import firebase from "firebase";
import { db , storage} from '../firebase' ;
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from 'notistack';



function ListTodo(props) {
   // console.log(props);
   const [listItem , setListItem] = useState([]);
   const [refreshItem , setRefreshItem] = useState(false);
   const [idItem , setIdItem] = useState('');
   const [author , setAuthor] = useState('');
   const [title , setTitle] = useState('');
   const [summary , setSummary] = useState('');
   const [content , setContent] = useState('');
   const [imageUrl , setImageUrl] = useState('');
   const [isActionUpdate , setIsActionUpdate] = useState(false);
   const { enqueueSnackbar, closeSnackbar } = useSnackbar();


   useEffect(() => {
      db.collection('posts').orderBy("create_at", "desc").onSnapshot(snapshot => {
      const postsNew =  snapshot.docs.map( doc => ({id: doc.id , post: doc.data()}));
      setListItem(postsNew);
     });
    }, [refreshItem]);

     
    function randomNumber(min, max) {  
        return Math.random() * (max - min) + min; 
    }

    async function addItem(){
       
        const authorInput = document.getElementById('author-item').value.trim();
        const titleInput = document.getElementById('title-item').value.trim();
        const summaryInput = document.getElementById('summary-item').value.trim();
        const contentInput = document.getElementById('content-item').value.trim();
        const imageUrlInput = document.getElementById('image-url-item').value.trim() !== '' ?  document.getElementById('image-url-item').value.trim() : 'http://i.ytimg.com/vi/vzchjdTNWa0/maxresdefault.jpg';
       
        if( authorInput !== '' && titleInput !== '' && summaryInput !== '' && contentInput !== '' && imageUrlInput !== ''){
            
            const data = {
                author: authorInput,
                title: titleInput,
                summary: summaryInput,
                content: contentInput,
                cover: imageUrlInput,
                create_at: firebase.firestore.FieldValue.serverTimestamp(),
                update_at: firebase.firestore.FieldValue.serverTimestamp(),
                status: true,
                total_view: randomNumber(3,6)
              };
              
            const res = await db.collection('posts').add(data);
            if(res.id){
                enqueueSnackbar('Successfully added item ', { anchorOrigin: {vertical: 'top',horizontal: 'left'} ,variant: 'success',autoHideDuration: 3000 });
            }
            return;
            //text.focus();
        }else{
            enqueueSnackbar('Please do not empty input in the fields have *', { anchorOrigin: {vertical: 'top',horizontal: 'left'} ,variant: 'warning',autoHideDuration: 3000 });
        }
       
       
    };
    function clearItem(){ 
        setAuthor('');
        setTitle('');
        setSummary('');
        setContent('');
        setImageUrl('');
        setIsActionUpdate(false) ;
        setIdItem('');
       // setListItem([]);  
       // document.getElementById('text-item').focus();
    };
    function handdleRefreshItem(){
        setRefreshItem(true);  
       // document.getElementById('text-item').focus();
    }
       
    async function handleDeleteItem(indexItem){
       if(indexItem.trim() !== ''){
        const res = await db.collection('posts').doc(indexItem).delete();
        enqueueSnackbar('Successfully delete item ', { anchorOrigin: {vertical: 'top',horizontal: 'left'} ,variant: 'success',autoHideDuration: 3000 });
       }else{
        enqueueSnackbar('Delete item Error , Please try again!', { anchorOrigin: {vertical: 'top',horizontal: 'left'} ,variant: 'warning',autoHideDuration: 3000 });
       }
    };

    let handleUpdateItem = item => {

        item.authorText && setAuthor(item.authorText);
        item.titleText && setTitle( item.titleText);
        item.summaryText && setSummary(item.summaryText);
        item.contentText && setContent(item.contentText);
        item.coverImage && setImageUrl(item.coverImage);
        item.indexItem && setIdItem(item.indexItem);
        item &&  setIsActionUpdate(true) ;
    };

    async function updateItem(idItemUpdate){
        if(idItemUpdate.trim() !== '' && author.trim() !== '' && summary.trim() !== '' && content.trim() !== '' ){
            const data = {
                author: author,
                title: title,
                summary: summary,
                content: content,
                cover: imageUrl,
                update_at: firebase.firestore.FieldValue.serverTimestamp(),
                status: true,
                total_view: randomNumber(3,6)
            };
            const res = await db.collection('posts').doc(idItemUpdate).update(data);
            enqueueSnackbar('Successfully updated item ', { anchorOrigin: {vertical: 'top',horizontal: 'left'} ,variant: 'success',autoHideDuration: 3000 });

        }else{
            enqueueSnackbar('Dont update item erorr  ', { anchorOrigin: {vertical: 'top',horizontal: 'left'} ,variant: 'warning',autoHideDuration: 3000 });
        }
        
    }


    return (
    <div className="list-todo">
        <div className="posision-r"style={{ top: 0 ,zIndex: 99 ,backgroundColor: '#fff'}}>
        <h4>ToDo List News</h4>
        <div style={{width:'100%'}}> <button className="btn-clear" onClick={() => clearItem() }>Clear 🌿</button> <button className="btn-refresh" onClick={() => handdleRefreshItem() }>ReFresh ⚒️</button>   </div>
        <div style={{width:'100%', paddingBottom: 10}}>
        <input name="author" placeholder="Author*" id="author-item" value={author} className="input-item" onChange={(e) =>{setAuthor(e.target.value)}}/>   <input name="title" placeholder="Title*" id="title-item" value={title} className="input-item" onChange={(e) =>{setTitle(e.target.value)}}/> <input name="summary" placeholder="Summary*" value={summary} id="summary-item" className="input-item" onChange={(e) =>{setSummary(e.target.value)}} /> <input name="content" placeholder="Content*" id="content-item" value={content} className="input-item" onChange={(e) =>{setContent(e.target.value)}}/> <input name="image-url" placeholder="Url Image Cover" id="image-url-item" value={imageUrl} className="input-item" onChange={(e) =>{setImageUrl(e.target.value)}} /> <button className="btn" onClick={() => addItem() }>Add 🌻</button> {isActionUpdate && (<button className="btn btn-update" onClick={() => updateItem(idItem) }>Update ⚔️</button>) }   
        </div>
         </div>
        <ul>
            
            {
                listItem.map( (item , index) => <Item  key={index} titleText={item.post.title} coverImage={item.post.cover} summaryText={item.post.summary} contentText={item.post.content} authorText={item.post.author} indexItem={item.id}  handleDelete={handleDeleteItem} handleUpdate={handleUpdateItem} />)
            }
           
       </ul>
    </div>
      
    );
}

ListTodo.propTypes = {

}

export default ListTodo

