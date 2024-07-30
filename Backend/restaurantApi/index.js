const express = require("express"); //third party package
let app = express();
const stripe = require("stripe")(
  "sk_test_51PUpG402Ca2xbOBV3OFc57cuBSUbNBrrkauqcpx1YPz2cgVxRWdMiS1dr3oxPXua0bvLhgeN6PO65SoHEq1BiMsD00J4MK6psW"
);
var cors = require("cors");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
let PORT = 4000;
const MONGO_URL = "mongodb://127.0.0.1:27017";
let db;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(" weilcome to my own server");
});


//get the locations data

app.get("/location", (req, res) => {
  db.collection("locations")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//get the mealtype data

app.get("/mealtype", (req, res) => {
  db.collection("mealType")
    .find()
    .toArray((err, result) => {
      res.send(result);
    });
});

//get the restaurant data through stateid amd mealid
app.get("/restaurant", (req, res) => {
  let query = {};
  let stateId = Number(req.query.state_id);
  let mealId = Number(req.query.mealId);
  if (stateId) {
    query = { state_id: stateId };
  } else if (mealId) {
    query = { "mealTypes.mealtype_id": mealId };
  }

  db.collection("restaurants")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// filter meal by mealId
app.get("/filter/:mealId", (req, res) => {
  let query = {};
  let mealId = Number(req.params.mealId);
  let cuisineId = Number(req.query.cuisineId);
  let lcost = Number(req.query.lcost);
  let hcost = Number(req.query.hcost);
  let sort = { cost: 1 };
  if (req.query.sort) {
    sort = { cost: req.query.sort };
  }
  if (cuisineId) {
    query = {
      "mealTypes.mealtype_id": mealId,
      "cuisines.cuisine_id": cuisineId,
    };
  } else if (lcost && hcost) {
    query = {
      "mealTypes.mealtype_id": mealId,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
    };
  }
  // 1 for ascending order sort and -1 for descending order sort
  db.collection("restaurants")
    .find(query)
    .sort(sort)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// restaurant Details

app.get("/details/:id", (req, res) => {
  let id = Number(req.params.id);
  db.collection("restaurants")
    .find({
      restaurant_id: id,
    })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/menu/:id", (req, res) => {
  let id = Number(req.params.id);
  db.collection("RestaurantMenu")
    .find({ restaurant_id: id })
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.post("/menuItem", (req, res) => {
  console.log("Received request body:", req.body);

  if (req.body && req.body.menu_id && Array.isArray(req.body.menu_id)) {
    const query = { menu_id: { $in: req.body.menu_id } };
    console.log("Executing query:", JSON.stringify(query));

    db.collection("RestaurantMenu")
      .find(query)
      .toArray((err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        console.log("Query result:", result);
        res.json(result);
      });
  } else {
    console.log("Invalid input received");
    res.status(400).json({ error: "Invalid Input" });
  }
});

//placeorder
app.post("/placeorder", (req, res) => {
  console.log(req.body);
  db.collection("OrderList").insertOne(req.body, (err) => {
    if (err) throw err;
    res.send("Order Placed");
  });
});

// get order

app.get("/orders", (req, res) => {
  let query = {};
  let email = req.query.email;
  if (email) {
    query = { email };
  }

  db.collection("OrderList")
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

//update payment Details

app.put("/updateOrder/:id", (req, res) => {
  let oid = Number(req.params.id);

  db.collection("OrderList").updateOne(
    { orderId: oid },
    {
      $set: {
        status: req.body.status,
        bank_name: req.body.bank_name,
        date: req.body.date,
      },
    },
    (err, result) => {
      if (err) throw err;
      res.send("Order Updated Succesfully");
    }
  );
});

//deleted order

app.delete("/deleteOrder/:id", (req, res) => {
  let oid = Number(req.params.id);

  db.collection("OrderList").deleteOne({ orderId: oid }, (err, result) => {
    if (err) throw err;
    res.send(` this order id is (${oid}) deleted Successfully`);
  });
});

// payment

app.post("/api/payment", async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: id,
      confirm: true,
    });

    res.status(200).json({
      success: true,
      message: "Payment successful",
      payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
});
//mongodb connection
MongoClient.connect(MONGO_URL, (err, client) => {
  console.log("mongodb is connected");
  if (err) console.log("error while connecting");
  db = client.db("Zomato-Application");
  app.listen(PORT, () => {
    console.log("Server started successfully");
  });
});
