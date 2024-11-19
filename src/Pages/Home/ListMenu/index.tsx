import './ListMenu.css';
import { ListMenuProps } from './ListMenu.props';

const ListMenu:React.FC<ListMenuProps> = ()=>{
    return <ul className='list-menu'>
        <li className='list-menu__item list-menu__item--edit'>Edit</li>
        <li className='list-menu__item list-menu__item--delete'>Delete</li>
    </ul>
}
export default ListMenu;