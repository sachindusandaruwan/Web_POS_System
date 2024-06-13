import { getAllCustomers } from "../model/customerModel.js";
import { getAllItems, update } from "../model/itemModel.js";
import { getAllOrders, saveOrder } from "../model/orderModel.js";

var itemQty;
var orderQty;
var tempItem;
let getItems = [];

$(document).ready(function() {
    refresh();
});

function refresh() {
    $('#ordersSection #OrderId').val(generateId());
    $('#ordersSection #date-picker').val(new Date().toISOString().split('T')[0]);
    loadCustomer();
    loadItems();
}

function loadCustomer() {
    let allCustomers = getAllCustomers();
    let customerCmb = $('#customer-select-field');
    let option = [];
    option.unshift('');
    for (let i = 0; i < allCustomers.length; i++) {
        option.push(allCustomers[i].customerId);
    }

    $.each(option, function(index, value) {
        customerCmb.append($('<option>').val(value).text(value));
    });
}

$('#customer-select-field').change(function() {
    let customer = getAllCustomers().find(c => c.customerId === $(this).val());
    if (customer) {
        $('#ordersSection #CustomerId').val(customer.customerId);
        $('#ordersSection #CustomerName').val(customer.customerName);
        $('#ordersSection #CustomerSalary').val(customer.customerSalary);
        $('#ordersSection #CustomerAddress').val(customer.customerAddress);
    }
});

function loadItems() {
    let allItems = getAllItems();
    let itemCmb = $('#item-select-field');
    let option = [];
    option.unshift('');
    for (let i = 0; i < allItems.length; i++) {
        option.push(allItems[i].itemCode);
    }

    $.each(option, function(index, value) {
        itemCmb.append($('<option>').val(value).text(value));
    });
}

$('#item-select-field').change(function() {
    let item = getAllItems().find(i => i.itemCode === $(this).val());
    if (item) {
        itemQty = item.itemQty;
        $('#ordersSection #ItemCode').val(item.itemCode);
        $('#ordersSection #ItemName').val(item.itemName);
        $('#ordersSection #ItemPrice').val(item.itemUnitPrice);
        $('#ordersSection #ItemQty').val(item.itemQty);
        tempItem = {
            itemCode: item.itemCode,
            itemName: item.itemName,
            itemPrice: item.itemUnitPrice,
            itemQty: item.itemQty
        };
    }
});

function generateId() {
    let orders = getAllOrders();
    if (orders.length === 0) {
        return 'OD01';
    } else {
        let orderId = orders[orders.length - 1].orderId;
        let number = extractNumber(orderId);
        number++;
        return 'OD0' + number;
    }
}

function extractNumber(id) {
    var match = id.match(/OD(\d+)/);
    if (match && match.length > 1) {
        return parseInt(match[1], 10);
    }
    return null;
}

function clear(tableCount) {
    if (tableCount === 1) {
        $('#ordersSection #ItemCode').val('');
        $('#ordersSection #ItemName').val('');
        $('#ordersSection #ItemPrice').val('');
        $('#ordersSection #ItemQty').val('');
        $('#ordersSection #OrderQuantity').val('');
        $('#ordersSection .SubTotal').text('');
        $('#ordersSection .Cash').val('');
        $('#ordersSection .Total').text('');
        $('#ordersSection .Discount').val('');
        $('#ordersSection #item-select-field').val('');
    } else {
        $('#ordersSection #CustomerId').val('');
        $('#ordersSection #CustomerName').val('');
        $('#ordersSection #CustomerAddress').val('');
        $('#ordersSection #CustomerSalary').val('');
        $('#ordersSection #ItemCode').val('');
        $('#ordersSection #ItemName').val('');
        $('#ordersSection #ItemPrice').val('');
        $('#ordersSection #ItemQty').val('');
        $('#ordersSection #OrderQuantity').val('');
    }
}

$('#ordersSection .add-item-button').click(function() {
    if ($('#ordersSection .add-item-button').text() === 'delete') {
        dropItem();
    } else {
        let getItem = {
            itemCode: tempItem.itemCode,
            itemName: tempItem.itemName,
            itemPrice: tempItem.itemPrice,
            itemQty: parseInt($('#ordersSection #OrderQuantity').val(), 10),
            total: parseFloat($('#ordersSection #ItemPrice').val()) * parseInt($('#ordersSection #OrderQuantity').val(), 10)
        };

        let orderQty = parseInt($('#ordersSection #OrderQuantity').val(), 10);

        if (itemQty >= orderQty) {
            if ($('#ordersSection #CustomerId').val() !== '' && $('#ordersSection #CustomerName').val() !== null) {
                if (orderQty > 0) {
                    let item = getItems.find(I => I.itemCode === getItem.itemCode);
                    if (!item) {
                        getItems.push(getItem);
                        loadTable();
                        clear(1);
                        setTotal();
                    } else {
                        alert('Already Added');
                    }
                } else {
                    alert('Invalid Quantity');
                }
            } else {
                alert('Invalid Customer');
            }
        } else {
            alert('Not Enough Quantity');
        }
    }
});

function loadTable() {
    $('#ordersSection #order-table-body').empty();
    for (let i = 0; i < getItems.length; i++) {
        $('#ordersSection #order-table-body').append(
            '<tr> ' +
                '<td>' + getItems[i].itemCode + '</td>' +
                '<td>' + getItems[i].itemName + '</td>' +
                '<td>' + getItems[i].itemPrice + '</td>' +
                '<td>' + getItems[i].itemQty + '</td>' +
                '<td>' + getItems[i].total + '</td>' +
            '</tr>'
        );
    }
}

function setTotal() {
    let total = 0;
    for (let i = 0; i < getItems.length; i++) {
        total += getItems[i].total;
    }
    $('#ordersSection .total').text(total.toFixed(2));
    alert(total+"  hoooooo");
}

$('#ordersSection .purchase-button').click(function() {
    let cash = parseFloat($('#ordersSection #Cash').val());
    let total = parseFloat($('#ordersSection .total').text());
    let discount = parseFloat($('#ordersSection #Discount').val());

    if (cash >= total) {
        if (discount >= 0 && discount <= 100) {
            let subTotal = total - (total * discount / 100);
            $('#ordersSection .sub-total').text(subTotal.toFixed(2));
            alert("sub total is  "+subTotal);

            let balance = cash - subTotal;
            $('#ordersSection #Balance').val(balance.toFixed(2));

            let Order = {
                orderId: $('#ordersSection #OrderId').val(),
                orderDate: $('#ordersSection #date-picker').val(),
                custId: $('#ordersSection #CustomerId').val(),
                items: getItems,
                total: total,
                discount: discount,
                subTotal: subTotal,
                cash: cash,
                balance: balance
            };

            saveOrder(Order);
            updateItemData();
            getItems = [];
            loadTable();
            clear(2);
            alert('Order Placed');
            refresh();
        } else {
            alert('Invalid Discount');
        }
    } else {
        alert('Not Enough Cash');
    }
});

function updateItemData() {
    alert("update wenawada")
    let items = getAllItems();
    for (let i = 0; i < getItems.length; i++) {
        let item = items.find(I => I.itemCode === getItems[i].itemCode);
        alert("sanuuuuu"+item)
        if (item) {
            item.itemQty -= getItems[i].itemQty;
            alert("mekat awada qty kiyada adu unam"+"  "+item.itemQty)
            let index = items.findIndex(I => I.itemCode === getItems[i].itemCode);
            if (index !== -1) {
                update(index, item);
            }
        }
    }
}

$('.mainTable .tableRows').on('click', 'div', function() {
    let itemCode = $(this).children('div:eq(0)').text();
    let itemName = $(this).children('div:eq(1)').text();
    let price = $(this).children('div:eq(2)').text();
    let qty = $(this).children('div:eq(3)').text();

    $('#ordersSection #ItemCode').val(itemCode);
    $('#ordersSection #ItemName').val(itemName);
    $('#ordersSection #ItemPrice').val(price);
    $('#ordersSection #OrderQuantity').val(qty);

    $('#ordersSection .add-item-button').text('delete').css('background-color', 'red');
});

function dropItem() {
    let itemCode = $('#ordersSection #ItemCode').val();
    let index = getItems.findIndex(I => I.itemCode === itemCode);
    if (index !== -1) {
        getItems.splice(index, 1);
        loadTable();
        clear(1);
        setTotal();
        alert('Item Removed');
    }
}
