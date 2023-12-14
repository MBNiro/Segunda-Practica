import mongoose from "mongoose";

try {
  await mongoose.connect(
    "mongodb+srv://maria:muD3iMBZz7IPpxu6@cluster23.c2zreja.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  console.log("Conectado a la base de datos");
} catch (error) {
  console.log(error);
}