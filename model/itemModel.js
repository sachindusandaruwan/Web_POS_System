import{items} from'../database/db.js'

export function saveItem(item){
    items.push(item);
    // alert("2222")
    alert(items.length)
}

export function getAllItems(){
    return items;
}

export function remove(index){
    
    items.splice(index,1);
    
}

export function update(index,item){
    alert("update ekata awa xx  "+index+item)
    items[index]=item;
    alert( items[index].itemName)
}