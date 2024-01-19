import { useState } from "react";
import "./newproduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
// import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { addProductFailure, addProductStart, addProductSuccess } from "../../redux/productSlice";
import { toast } from "react-toastify";
import { userRequest } from "../../requestMethods";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";

export default function NewProduct() {
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    price: "",
    creatorEmail: "",
    userId: "",
    expiredAt: "",
    img: "",
    color: [],
    cat: [],
    size: []
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat, creatorEmail: user?.email, userId: user?._id, color, size };
           setFile(null)
          addProduct(product);
          setIsLoading(false);
        });
      }
    );
  };

  const addProduct = async(product) => {
    dispatch(addProductStart());
    try {
      const res = await userRequest.post(`/products`, product);
      dispatch(addProductSuccess(res.data));
      setInputs({
        title: "",
      desc: "",
      inStock: "",
      price: "",
      creatorEmail: "",
      expiredAt: "",
      img: "",
      color: [],
      cat: [],
      size: []
      })
      toast.success("Product successfully add")
    } catch (err) {
      console.log(err)
        toast.error("Something went wrong")
      dispatch(addProductFailure());
    }
  }

  return (
    <div>
    <Navbar />
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" >
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={inputs.title}
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            value={inputs.desc}
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Expires Date</label>
          <input
            name="expiredAt"
            type="date"
            value={inputs.expiredAt}
            placeholder="expired date..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            value={inputs.price}
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Colors</label>
          <input 
            type="text" 
            placeholder="red,blue" 
            onChange={handleColor} 
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input 
            type="text" 
            placeholder="xl,sm" 
            onChange={handleSize} 
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input 
            type="text" 
            placeholder="jeans,skirts" 
            onChange={handleCat} 
          />
        </div>
      
       {isLoading ? (
        <button disabled={isLoading} onClick={handleClick} className="addProductButton">
          Processing...
        </button>
       ):(
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
       )} 
      </form>
    </div>
    <Footer />
    </div>
  );
}
