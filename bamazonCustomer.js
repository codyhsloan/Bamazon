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
  connection.query("SELECT * FROM products", function(err, res) {

  	 console.log("Product Name  |  Department Name  |   Price  | In Stock");
     console.log("---------------------------------")

    for (var i = 0; i < res.length; i++) {
   
      console.log(res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
  });
}

function customerSelection() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to purchase
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What item(s) would you like to purchase?"
        },
        {
          name: "purchase",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }
        // determine if there is enough supply to fill customer order
        if (chosenItem.stock_quantity >= parseInt(answer.choice)) {
          // purchase was successful, so update db, let the user know, and start over
          connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
              {
                stock_quantity: answer.choice
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Purchase successful!");
              
            }
          );
        }
        else {
          // purchase amount too high, so apologize and start over
          console.log("Insufficient Supply!");
          
        }
        // Update mySQL database with reduced inventory
            var newInventory = parseInt(stock_quantity) - parseInt(answer.choice); 
            connection.query('UPDATE Products SET ? WHERE ?', [{stock_quantity: newInventory}], function(err, res){
              if(err) throw err; // Error Handler
            }); 

             // Show customer their purchase total (need to query the price info from database)
            var customerTotal;
            connection.query('SELECT Price FROM Products WHERE ?', function(err, res){
              
              var price = res[0].price;
              customerTotal = stock_quantity*price.toFixed(2);

              console.log('\nYour total is $' + customerTotal + '.');
      		});
  		});
	}
}
