import{customers} from '../database/db.js';

export function saveCustomer(customer){
    customers.push(customer);
    alert(customer.customerId)
}

export function getAllCustomers(){
    return customers;
}

export function remove(index){
    alert("mn awa")
    customers.splice(index,1);
    alert("mn giya")
}

export function update(index, customer){
    alert("update ekata awa")
    customers[index] = customer;
    alert("lllllll")
}