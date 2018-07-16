const mysql = require("mysql");
const inquirer = require("inquirer");
const resultsTable = require("cli-table-redemption");

const connection = mysql.createConnection({
	host: "localhost", // Or "127.0.0.1" 
	port: 3306,
	user: "root",
	password: "", // Enter password between the quotes
	database: "bamazon_db"
});

function onlineSales() {
  connection.query("SELECT * FROM products", (err, results, fields) => {

  // Convert query result into format for table module
  var table = new resultsTable({
    head: fields.map(row => {
      return row.name
    })
  });

  results.forEach(row => {
    table.push(
      fields.map(field => {
        return row[field.name]
      })
    )
  });

  // Display the product table
  console.log(table.toString());

  // Prompt users with two messages
  inquirer.prompt([{
      type: "input",
      name: "purchase_id",
      message: "Please enter the ID of the product you would like to buy.",
      validate: value => {
        return results.some(e => e.item_id == value) ? true : "Please enter a valid ID."
      }
    }, ])
    .then(answers => {
      const { purchase_id } = answers;
      var {
        item_id,
        product_name: name,
        department_name: dept,
        price,
        stock_quantity: q
      } = results.find(e => e.item_id == purchase_id)
      
      inquirer.prompt([{
          type: "input",
          name: "quantity",
          message: `How many units of ${name} would you like?`,
          validate: value => {
            return (
              value <= results.find((e, i) => {
                return e.item_id == purchase_id
              }).stock_quantity
            ) ? true : `Insufficient quantity! Sorry, we don't have that many units of ${name} in stock! The number of units in stock is ${q}. Please choose a quantity of ${q} or less`
          }
        }, ])
        .then(answers => {
          const { quantity } = answers;
          console.log(`Your order quantity is ${quantity}.`);
          const newQuantity = q - quantity;
          let queryString;
          if (newQuantity) {
            queryString = `UPDATE \`products\` SET \`stock_quantity\`=\'${newQuantity}\' WHERE \`item_id\`=\'${purchase_id}\'`;
          } else {
            queryString = `DELETE FROM \`products\` WHERE \`item_id\` = \'${purchase_id}\'`
          };
          connection.query(queryString, (err, results, fields) => {
            if (err) {
              throw err
            } else {
                console.log(`Thank you for your purchase! The total is $${Number.parseFloat(price*quantity).toFixed(2)}!`)
                onlineSales();
              }
            });
        });
    });
  });
};

onlineSales();
