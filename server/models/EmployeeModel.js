import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    jobTitle: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      
      location: {
      type: String,
      required: true,
      
    },






    //pramodhkumar
    age:{
        type:Number,
        required:true,
    
    },
    salary:{
        type:Number,
        required:true
    }, 
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("dashboard", userSchema);