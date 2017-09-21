var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    itemForSale();
});

// Display All Items inside Database 

function itemForSale() {
	console.log("All Products for Sale \n")

    var query = connection.query("SELECT * FROM products", function(err, res) {
    	if (err) { 
    		throw (error);
    	};

    for (var i = 0; i < response.length - 1; i++) {
    	console.log("item ID: " + res[i].item_id + "\n  Product" + res[i].product_name + "\n  Department" + res[i].department_name + "\n $" 
    	+ res[i].price + "\n  Stock" + res[i].stock_quantity);
    	}

	customerSelection();

	});
}

function customerSelection() {
  // query the database for all items being sold
    inquirer
      .prompt([
        {
          name: "itemid",
          type: "input",
          message: "Enter the ID number associated with the product you would like to purchase:"
        },{
          name: "quantity"
          type: "input"
          message: "How many item(s) would you like to buy?"
        }]).then(function(answer) {
        	connection.query("SELECT * FROM products WHERE ?", {item_id: answer.itemid} function(err, results) {
              if (res[0].stock_quantity < answer.quantity) {
              	console.log("Insufficient Supply of that Product");
              }else {
              	var stockLeftOver = res[0].stock_quantity - answer.quantity;

              	console.log("You purchased " + answer.quantity + "of" + res[0].product_name + ".")

              	console.log("Your total is: $" + answer.quantity * res[0].price + ".")

              	connection.query("UPDATE.products SET ? WHERE ?", [
              	{
              		stock_quantity: stockLeftOver
              	},
              	{
              		item_id: answer.itemid
              	}

              	}
              ], function(e, re) {
              	console.log(re,affectedRows + "product(s) updated!");
              	console.log(res[0].stock_quantity - answer.quantity + "left in stock")
              	connection.end();

               });
            }
        });
    });
}

