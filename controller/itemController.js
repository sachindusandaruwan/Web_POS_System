import { saveItem ,getAllItems,remove,update} from "../model/itemModel.js";
$(document).ready(function(){

});

clearTable();
loadAllItems();

export function loadAllItems(){
    let items = getAllItems();
    console.log('Items:',items);
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

    $('#itemSection .itemCodeError').text("");
    $('#itemSection .invalidItemName').text("");
    $('#itemSection .invalidItemQty').text("");
    $('#itemSection .invalidItemUnitPrice').text("");    
}

/////////////////////---------save------//////////////////////////////////

function saveItemDetails(){
    
    let ItemCode = $('#itemSection #item_code').val();
    let ItemName = $('#itemSection #item-name').val();
    let ItemQty = $('#itemSection #item_qty').val();
    let ItemUnitPrice = $('#itemSection #unitPrice').val();

   
    let itemDetails={
        itemCode : ItemCode,
        itemName : ItemName,
        itemQty : ItemQty,
        itemUnitPrice : ItemUnitPrice
    }

    if(isItemValidated(itemDetails)){
        saveItem(itemDetails);
        clearTable();
        loadAllItems();
        clearField();   
    }

   

}
$('#save-Item').click(function(){
    saveItemDetails();
});



function isItemValidated(itemDetails){
    let valid = true;
    if (itemDetails.itemCode.trim() === ""){
        valid = false;
     
        $('#itemSection .itemCodeError').text('Item Code is required');

        } else if (!(/^I-\d{4}$/).test(itemDetails.itemCode)) {
        valid = false;
      
        $('#itemSection .itemCodeError').text('Invalid Item Code');
        }if(isItemExist(itemDetails.itemCode)){
            valid = false;
           
            $('#itemSection .itemCodeError').text('Item Code already exist');
    } 

    if (itemDetails.itemName.trim() === "") {
        valid = false;
        // Display error message for empty item name
        $('#itemSection .invalidItemName').text('Item Name is required');
    } else {
        $('#itemSection .invalidItemName').text('');
    }

    if (itemDetails.itemQty.trim() === "") {
        valid = false;
        // Display error message for empty item Qty
        $('#itemSection .invalidItemQty').text('Item Qty is required');
    } else if (!(/^[0-9]+$/).test(itemDetails.itemQty)) {
        valid = false;
        // Display error message for invalid item Qty
        $('#itemSection .invalidItemQty').text('Invalid Item Qty');
    } else {
        $('#itemSection .invalidItemQty').text('');
    }

    if (itemDetails.itemUnitPrice.trim() === "") {
        valid = false;
        $('#itemSection .invalidItemUnitPrice').text('Item Unit Price is required');
    } else {
        $('#itemSection .invalidItemUnitPrice').text('');
    }

    return valid;
}

function isItemExist(itemCode){
    let items = getAllItems();
    let itemExist = false;
    items.forEach(
        item => {
            if(item.itemCode === itemCode){
                itemExist = true;
            }
        }
    );
    return itemExist;
}

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