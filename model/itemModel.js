import{items} from'../database/db.js'

export function saveItem(item){
    items.push(item);
    alert("2222")
}