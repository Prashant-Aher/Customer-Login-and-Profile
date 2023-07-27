const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Use mysql2 package instead of mysql below to avoid VERSION COMAPTIBILITY ERROR
const mysql = require('mysql2'); 


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'prashant',
  database: 'nodejs',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

const app = express();
const port = 5000;
// Enable CORS
app.use(cors());

app.use(bodyParser.json());

// authenticate customer using mobile number & pin
app.post('/customer', (req, res) => {
    const { mobileno, PIN } = req.body;
  
    const query = 'SELECT * FROM customers WHERE mobileno = ? AND PIN = ?';
    
    db.query(query, [mobileno, PIN], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: 'Authentication Failed' });
      }
  
      const customer = results[0];
      // Remove PIN from the response body for security reasons
      delete customer.PIN; 
  
      return res.json(customer);
    });
  });

// Route to update customer info (unchanged from previous code)
app.put('/customer/:no', (req, res) => {
    const custid = req.params.no;
    const updatedInfo = req.body;
  
    // Update customer info in the database
    const query = 'UPDATE customers SET ? WHERE custid = ?';
    db.query(query, [updatedInfo, custid], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      return res.json({ message: 'Customer updated successfully' });
    });
  });

// Route to add a new customer record
app.post('/customer/add', (req, res) => {
  //body contains custname, mobileno, and PIN for the new record
  const { custname, mobileno, PIN } = req.body;

  if (!custname || !mobileno || !PIN) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const insertQuery = 'INSERT INTO customers (custname, mobileno, PIN) VALUES (?, ?, ?)';
  db.query(insertQuery, [custname, mobileno, PIN], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.json({ message: 'Customer record added successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on 5000`);
});
