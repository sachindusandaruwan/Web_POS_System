import { saveItem } from "../model/itemModel.js";
$(document).ready(function(){
    // alert("pakaya")
});

function saveItemDetails(){
    let itemCode = $('#itemSection #item_code').val();
    let itemName = $('#itemSection #item-name').val();
    let itemQty = $('#itemSection #item_qty').val();
    let itemUnitPrice = $('#itemSection #unitPrice').val();

    alert(itemCode+itemName+itemQty+itemUnitPrice)

    // let itemDetals={
    //     ItemCode : itemCode,
    //     ItemName : itemName,
    //     ItemQty : itemQty,
    //     ItemUnitPrice : itemUnitPrice
    // }

    // saveItem(itemDetals);

}
$('#save-Item').click(function(){
    saveItemDetails();
});