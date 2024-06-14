import { saveCustomer,getAllCustomers,remove,update } from "../model/customerModel.js";
$(document).ready(function(){
    // alert("hiiii mn awa");
    
})
// loadAllCustomers();

export function loadAllCustomers(){
    let customers = getAllCustomers();
    customers.forEach(
        customer => {
            $('#cus-table').append(`<tr><td>${customer.customerId}</td><td>${customer.customerName}</td><td>${customer.customerAddress}</td><td>${customer.customerSalary}</td></tr>`);
            
        }
    );
}

/////////////////////////////////////////////////////

function saveCustomerDetail(){
    let cusId = $('#customerSection #cus-ID').val();
    let cusName = $('#customerSection #cus-name').val();
    let cusAddress=$('#customerSection #cus-address').val();
    let cusSalary = $('#customerSection #cus-salary').val();

    

    // alert(cusId+cusName+cusAddress+cusSalary)
    let customerDetail={
        customerId : cusId,
        customerName : cusName,
        customerAddress : cusAddress,
        customerSalary :cusSalary
    }

    if(isCustomerValidated(customerDetail)){
        saveCustomer(customerDetail);
        clearTable();
        loadAllCustomers();
        clearField();
    }

   
    // let validateCustomer=validate(customerDetail);
    // if(validateCustomer){
    //     saveCustomer(customerDetail);
    //     clearTable();
    //     loadAllCustomers();
    //     clearField();
    // }
   
    
}

function isCustomerValidated(customerDetail){
    let valid = true;
    if (customerDetail.customerId.trim() === "") {
        valid = false;
        // Display error message for empty customer ID
        $('#customerSection .invalidCustId').text('Customer ID is required');
    } else if (!(/^C000[0-9]+$/).test(customerDetail.customerId)) {
        valid = false;
        // Display error message for invalid customer ID format
        $('#customerSection .invalidCustId').text('Invalid Customer ID');
    } else if(isCustomerExist(customerDetail.customerId)){
       valid =false;
       alert('Customer ID already exist');
        
    }else{
        $('#customerSection .invalidCustId').text('');
    }

    if (customerDetail.customerName.trim() === "") {
        valid = false;
        // Display error message for empty customer name
        $('#customerSection .invalidCustName').text('Customer Name is required');
    } else {
        // Clear error message for customer name
        $('#customerSection .invalidCustName').text('');
    }

    if (customerDetail.customerAddress.trim() === "" && customerDetail.customerAddress.isInteger()) {
        valid = false;
        // Display error message for empty customer address
        $('#customerSection .invalidCustAddress').text('Customer Address is required');
    } else {
        // Clear error message for customer address
        $('#customerSection .invalidCustAddress').text('');
    }

    if (customerDetail.customerSalary.trim() === "") {
        valid = false;
        // Display error message for empty customer salary
        $('#customerSection .invalidCustSalary').text('Customer Salary is required');
    } else if (isNaN(customerDetail.customerSalary)) {
        valid = false;
        // Display error message for invalid customer salary format
        $('#customerSection .invalidCustSalary').text('Invalid Customer Salary');
    } else {
        // Clear error message for customer salary
        $('#customerSection .invalidCustSalary').text('');
    }

    return valid;

}

function isCustomerExist(customerId) {
    let customers = getAllCustomers();
    let customerIds = customers.map(customer => customer.customerId);
    return customerIds.includes(customerId);
}

function clearField(){
    $('#customerSection #cus-ID').val("");
    $('#customerSection #cus-name').val("");
    $('#customerSection #cus-address').val("");
    $('#customerSection #cus-salary').val("");
}

function clearTable(){
    let table = document.getElementById("cus-table");
    let rowCount = table.rows.length;

    for(let i = rowCount - 1; i > 0; i--){
        table.deleteRow(i);
    }
}


$('#save-cus').click(function(){
    saveCustomerDetail();
});


// -------------------------------------------------------------------------------------


// search customer
//set values to the input fields when click the table row
document.getElementById("cus-table").addEventListener("click",function(event){
    let target = event.target;
   
        let cusId = target.parentElement.cells[0].textContent;
        let cusName = target.parentElement.cells[1].textContent;
        let cusAddress = target.parentElement.cells[2].textContent;
        let cusSalary = target.parentElement.cells[3].textContent;

        document.getElementById("cus-ID").value = cusId;
        document.getElementById("cus-name").value = cusName;
        document.getElementById("cus-address").value = cusAddress;
        document.getElementById("cus-salary").value = cusSalary;
    
});




// ------------------------------------------------------------------

function deleteCustomer() {
    let cusId = $('#customerSection #cus-ID').val();
    let customers = getAllCustomers();
    alert(cusId+"mona uttakda")
    alert(customers.length)

    for (let i = 0; i < customers.length; i++) {
        alert(customers[i])
        if (cusId === customers[i].customerId) {
           
            alert("awwwada")
            remove(i);
            alert("removeee")
            break;

        }
    }
    clearTable();
    loadAllCustomers();
    clearField();
}

$('#remove-cus').click(function(){
    deleteCustomer();
});



// ----------------------------------------------------------------------
function updateCustomer(){
    let cusId = $('#customerSection #cus-ID').val();
    let customers = getAllCustomers();
    let index = null;
    for(let i=0; i<customers.length; i++){
        if(cusId === customers[i].customerId){

            index = i;
            break;
        }
    }
    update(index, 
        {
            customerId : document.getElementById('cus-ID').value,
            customerName : document.getElementById('cus-name').value,
            customerAddress : document.getElementById('cus-address').value,
            customerSalary : document.getElementById('cus-salary').value
        }
    );
    clearField();
    clearTable();
    loadAllCustomers();
}

$('#update-cus').click(function(){
    updateCustomer();
});


