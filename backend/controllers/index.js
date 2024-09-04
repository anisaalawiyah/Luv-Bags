import express from "express";
import { pool } from "../db.js";
import cors from "cors"; // Pastikan Anda mengimpor modul cors
import argon2 from "argon2";
import jwt from "jsonwebtoken";
const router = express.Router();

const app = express();
app.use(express.json()); // middleware bawaan 
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);


// Endpoint untuk mendapatkan semua transaksi
app.get('/api/bisa', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Orders');
    return res.status(200).json({
      status: 'success',
      message: 'Berhasil menampilkan semua data transaksi',
      data: result.rows
    });
  } catch (error) {
    console.error("Error in getAllTransactions:", error);
    return res.status(500).json({
      status: 'error',
      message: 'Gagal menampilkan data transaksi',
    });
  }
});


// Endpoint untuk mengakses keranjang pengguna
app.post('/api/add-to-cart',async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    try {
        await pool.query(
           ` INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3),`
            [user_id, product_id, quantity]
        );
        res.status(200).json({ message: "Item added to cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding item to cart" });
    }
});

// Endpoint untuk checkout
app.post('/api/bisa', async (req, res) => {

  // Validasi data input
  if (!req.body || !req.body.data || req.body.data.length < 1) {
    return res.status(400).json({
      status: "failed",
      message: "Data transaksi tidak boleh kosong!",
    });
  }
  const orderDate = new Date();
  try {
    const orderResult = await pool.query(
      `INSERT INTO Orders (user_id, username, address, quantity, total_price, order_date,payment_method, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7,$8) 
       RETURNING *`,
      [
        req.body.user_id,        // user_id: ID pengguna
        req.body.customer,       // username: Nama pengguna
        req.body.address,        // address: Alamat pengguna
        req.body.quantity,       // quantity: Jumlah produk yang dipesan
        req.body.total_price,    // total_price: Harga total untuk item ini (price * quantity)
        orderDate,  
        req.body.payment_method,             // order_date: Tanggal pesanan (sekarang)
        "pending"                // status: Status pesanan, default "pending"
      ]
    );

    const orderId = orderResult.rows[0].id;
    console.log(orderId);


    // Update stok produk di tabel products
    console.log(req.body.data);
    // Add data detail_order
    for (let i = 0; i < req.body.data.length; i++) {
      const data = req.body.data[i];
    
      // Update product stock
      await pool.query(`UPDATE products SET stock = stock - $1 WHERE product_id = $2`, [
        data.quantity,
        data.id,
      ]);
    }

    return res.status(201).json({
      status: 'success',
      message: 'Berhasil menambahkan data transaksi',
      data: {
        id: transactionId
      }
    });
  } catch (error) {
    console.error("Error in postTransaction:", error);
    return res.status(500).json({
      status: 'error',
      message: 'Gagal menambahkan data transaksi',
    });
  }
});

app.get("/api/products", async (req, res) => {
  try {
      const result = await pool.query("SELECT * FROM products");
      console.log('Products:', result.rows); // Log data produk
      res.json(result.rows);
  } catch (error) {
      console.error('Error retrieving products:', error);
      res.status(500).json({ error: 'An error occurred while retrieving products' });
  }
});

// login
app.post("/api/login", async (req, res) => {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      req.body.username,
    ]);
    if (result.rows.length > 0){
      const user = result.rows[0];
      if (await argon2.verify(user.password, req.body.password)) {
        const token = jwt.sign(user, process.env.SECRET_KEY);
        res.send({
          token,
          message: "Login berhasil.",
        });
      } else {
        res.status(401);
        res.send("Kata sandi salah.");
      }
    } else {
      res.status(404);
      res.send(
        `Pengguna dengan nama pengguna '${req.body.username}' tidak ditemukan.`
      );
      
    }
  });

// register
app.post("/api/register", async (req, res) => {
    try {
        const { username, email, password, phone_number,role} = req.body;

        // Hash password
        const hash = await argon2.hash(password);

        // Insert data ke dalam tabel users
        const result = await pool.query(
            `INSERT INTO users (username, email, password, phone_number,role) 
             VALUES ($1, $2, $3, $4 ,$5) RETURNING *`,
            [username, email, hash, phone_number,role]
        );

        // Mengembalikan respons jika pendaftaran berhasil
        res.status(201).json({
            message: "Pendaftaran berhasil",
            user: result.rows[0]  // Mengembalikan data pengguna yang baru saja terdaftar (tanpa password)
        });
    } catch (error) {
        console.error(error.message);
        if (error.code === '23505') { // Error code untuk pelanggaran unique constraint
            res.status(400).json({ message: "Username atau email sudah terdaftar" });
        } else {
            res.status(500).json({ message: "Terjadi kesalahan saat mendaftarkan pengguna" });
        }
    }
});




// midleware otentikasi
app.use((req, res, next) => {
    const authorization = req.headers.authorization;
    console.log("Authorization Header:",authorization);
    if (authorization) {
      if (authorization.startsWith("Bearer ")) {
        const token = authorization.split(" ")[1];
        // console.log("Token:", token); // Log token
        try {
        //   req.user = jwt.verify(token, process.env.SECRET_KEY);
          next();
        } catch (error) {
          res.send("Token tidak valid.");
        }
      }
      else {
        res.send('Otorisasi tidak valid (harus "Bearer").');
      }
    } 
    else {
      res.send("Anda belum login (tidak ada otorisasi).");
    }
})

// Route untuk menambah produk
app.post("/api/products", async (req, res) => {
    try {
        const { product_name, brand, price, stock, imageurl } = req.body;
        const result = await pool.query(
            "INSERT INTO products (product_name, brand, price, stock, imageurl) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [product_name, brand, price, stock, imageurl]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'An error occurred while adding the product' });
    }
});


// Route untuk mendapatkan semua produk


// Route untuk memperbarui produk
    app.put("/api/products/:id", async (req, res) => {
        const id = parseInt(req.params.id);  // Konversi ID ke integer
        const { product_name, brand, price, stock, imageurl } = req.body;
    
        try {
            // Memastikan nilai default jika stock tidak diberikan
            const result = await pool.query(
                "UPDATE products SET product_name = $1, brand = $2, price = $3, stock = $4, imageurl = $5 WHERE product_id = $6 RETURNING *",
                [product_name, brand, price, stock || 0, imageurl, id] // Gunakan stock || 0 untuk nilai default jika stock adalah null
            );
    
            if (result.rowCount > 0) {
                res.json(result.rows[0]);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'An error occurred while updating the product' });
        }
    });

// Route untuk menghapus produk
app.delete("/api/products/:id", async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM products WHERE product_id = $1 RETURNING *", [req.params.id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product successfully deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'An error occurred while deleting the product' });
    }
});

const createDefaultAdmin = async () => {
  try {
    const userCount = (await pool.query("SELECT * FROM users")).rows.length;

    if (userCount === 0) {
      const hashedPassword = await argon2.hash('bnm123'); // Ganti 'adminpassword' dengan password admin yang diinginkan

     
      const result = await pool.query(
        `INSERT INTO users (username, email, password, phone_number,role) 
         VALUES ($1, $2, $3, $4 ,$5) RETURNING *`,
        ["admin", "admin@gmail.com", hashedPassword, "081268922453","admin"]
    );

      console.log('Admin default berhasil dibuat.');
    } else {
      console.log('User sudah ada. Admin default tidak dibuat.');
    }
  } catch (error) {
    console.error('Error saat membuat admin default:', error);
  }
};
createDefaultAdmin();

// Menjalankan server pada port yang ditentukan
app.listen(3001, () => console.log("Server berhasil dijalankan"));