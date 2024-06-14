import { saveItem ,getAllItems,remove,update} from "../model/itemModel.js";
$(document).ready(function(){

});

clearTable();
loadAllItems();

export function loadAllItems(){
    let items = getAllItems();
    items.forEach(
        item => {
            // alert("mekata awoo")
            $('#item-table').append(`<tr><td>${item.itemCode}</td><td>${item.itemName}</td><td>${item.itemQty}</td><td>${item.itemUnitPrice}</td></tr>`);
            
        }
    );
}


///////////////////////////////////////////////////////////
export function clearTable(){
    let table = document.getElementById("itemSection").querySelector(".tableDive");
    let tbody = table.querySelector("tbody");
    tbody.innerHTML = "";
}
/////////////////////////////////////////////////////////////////

function clearField(){
    $('#itemSection #item_code').val("");
    $('#itemSection #item-name').val("");
    $('#itemSection #item_qty').val("");
    $('#itemSection #unitPrice').val("");
}

/////////////////////---------save------//////////////////////////////////

function saveItemDetails(){
    let itemCode = $('#itemSection #item_code').val();
    let itemName = $('#itemSection #item-name').val();
    let itemQty = $('#itemSection #item_qty').val();
    let itemUnitPrice = $('#itemSection #unitPrice').val();

    alert(itemCode+itemName+itemQty+itemUnitPrice)

    let itemDetals={
        ItemCode : itemCode,
        ItemName : itemName,
        ItemQty : itemQty,
        ItemUnitPrice : itemUnitPrice
    }

    saveItem(itemDetals);

}
$('#save-Item').click(function(){
    saveItemDetails();
});

////////////////////////////////////////////////////////////////////////

// search item
//set values to the input fields when click the table row
document.getElementById("item-table").addEventListener("click",function(event){
    let target = event.target;
   
        let itemcode = target.parentElement.cells[0].textContent;
        let itemName = target.parentElement.cells[1].textContent;
        let itemQty = target.parentElement.cells[2].textContent;
        let itemUnitPrice = target.parentElement.cells[3].textContent;

        document.getElementById("item_code").value = itemcode;
        document.getElementById("item-name").value = itemName;
        document.getElementById("item_qty").value = itemQty;
        document.getElementById("unitPrice").value = itemUnitPrice;
    
});

////////////////////-----------delete---------------------////////////////////////

function deleteItem() {
    let itemcode = $('#itemSection #item_code').val();
    let items = getAllItems();
    alert(itemcode+"mona uttakda")
    alert(items.length)

    for (let i = 0; i < items.length; i++) {
        alert(items[i])
        if (itemcode === items[i].itemCode) {
           
            alert("awwwada")
            remove(i);
            alert("removeee")
            break;

        }
    }
    clearTable();
    loadAllItems();
    clearField();
}

$('#remove-Item').click(function(){
    deleteItem();
});

////////////////////-----------update---------------------////////////////////////

function updateItem(){
    let itemCode = $('#itemSection #item_code').val();
    let items = getAllItems();
    let index = null;
    for(let i=0; i<items.length; i++){
        if(itemCode === items[i].itemCode){
                alert("kiiiii")
            index = i;
            alert(index+"lkjkh")
            break;
        }
    }
    update(index, 
        {
            itemCode : document.getElementById('item_code').value,
            itemName : document.getElementById('item-name').value,
            itemQty : document.getElementById('item_qty').value,
            itemUnitPrice : document.getElementById('unitPrice').value
        }
       
    );
    alert("ho ho ho")
    clearTable();
    loadAllItems();
    clearField();
    
    
}

$('#update-Item').click(function(){
    updateItem();
});