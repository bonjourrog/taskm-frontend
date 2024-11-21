import { List } from '../../../../Entity/list';
import { Response } from '../../../../Entity/response';
import { userService } from '../../../../services/user';
import useDialogtore from '../../../../store/useDialogStore';
import useListStore from '../../../../store/useListStore';
import './ListMenu.css';
import { ListMenuProps } from './ListMenu.props';

const ListMenu:React.FC<ListMenuProps> = ({listId, setIsEditing})=>{
    const {lists, setLists, setNewList} = useListStore()
    const {setDisplayDialog} = useDialogtore()
    const handleDelete = async()=>{
        try {
            const response: Response = await userService.deleteList(listId);
            if(response.error)throw new Error(response.message);
            const newList: List[] = lists.filter(list=>list._id != listId)
            setLists(newList)
            setDisplayDialog(false)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unkown error';
            console.log(errorMessage);
            
        }
    }
    const hanldeEdit = ()=>{
        const list:List = lists.find(elem=>elem._id == listId) as List;
        setNewList(list)
        setDisplayDialog(false)
        setIsEditing(true);
    }        
    return <ul className='list-menu'>
        <li onClick={hanldeEdit} className='list-menu__item list-menu__item--edit'>Edit</li>
        <li onClick={handleDelete} className='list-menu__item list-menu__item--delete'>Delete</li>
    </ul>
}
export default ListMenu;