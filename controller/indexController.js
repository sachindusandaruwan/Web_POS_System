import {loadAllCustomers} from '../controller/customerController.js';
import {loadAllItems,clearTable} from '../controller/itemController.js';
import{refresh} from'../controller/orderController.js'
    
$(document).ready(function(){
    $('#home').show();

    $('.nav-item').click(function(event){
        event.preventDefault();

        $('section').hide();

        var targetSection = $(this).attr('href');

        $(targetSection).show();
        switch(targetSection){
            case '#customerSection':
                // $('.sectionName').text('Customer Manage');
                loadAllCustomers();
                break;
            case '#itemSection':
                // $('.sectionName').text('Item Manage');
                clearTable();
                loadAllItems();
                break;
            case '#ordersSection':
                refresh();
                // $('.sectionName').text('Order Manage');
                
                break;
            default:
                // $('.sectionName').text('Home Page');
        }
    });
});