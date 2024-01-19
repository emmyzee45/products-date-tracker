import { useEffect, useState } from "react";
import "./updateproduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
// import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { addProductFailure, addProductStart, addProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "../../redux/productSlice";
import { toast } from "react-toastify";
import { userRequest } from "../../requestMethods";

export default function Updateproduct({ product, setUpdate }) {
  
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [title, setTitle] = useState(product?.title);
  const [color, setColor] = useState(product?.color);
  const [desc, setDesc] = useState(product?.desc);
  const [price, setPrice] = useState(product?.price);
  const [expiredAt, setExpiredAt] = useState(product?.expiredAt);
  const [cat, setCat] = useState(product?.cat);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

//   const handleChange = (e) => {
//     setInputs((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClose = () => {
    setUpdate(false);
  }

  const uploadFile = (file) => {
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
        //   const product = { ...inputs, img: downloadURL, categories: cat, creatorEmail: user?.email, userId: user?._id };
           setImgUrl(downloadURL)
        //   addProduct(product);
          setIsLoading(false);
        });
      }
    );
  };

  const data = {
    img: imgUrl ? imgUrl : product.img,
    title,
    desc,
    price,
    cat,
    color,
    expiredAt,
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    dispatch(updateProductStart());
    try {
      const res = await userRequest.put(`/products/${product?._id}`, data);
      dispatch(updateProductSuccess(res.data));
      toast.success("Product successfully add")
      setUpdate(false);
    } catch (err) {
      console.log(err)
        toast.error("Something went wrong")
      dispatch(updateProductFailure());
    }
  }

  useEffect(() => {
    file && uploadFile(file);
  }, [file]);

  useEffect(() => {
    if(file) {
        setFileUrl(URL.createObjectURL(file))
    }
  }, [file])

  return (
    <div className="updateProduct">
      <h1 className="updateProductTitle">Update Product</h1>
      <div className="close-update" onClick={handleClose}>X</div>
      <form className="updateProductForm" onSubmit={handleSubmit}>
        <div className="updateProductItem">
          <label htmlFor="file">
            {fileUrl ? (
                <img src={fileUrl} className="imgUrl" />
            ):(
                <img src={product?.img} className="imgUrl" />
            )}
          </label>
          <input
            type="file"
            id="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="updateProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={title}
            placeholder="Apple Airpods"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="updateProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            value={desc}
            placeholder="description..."
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="updateProductItem">
          <label>Expires Date</label>
          <input
            name="expiredAt"
            type="date"
            value={expiredAt}
            placeholder="expired date..."
            onChange={(e) => setExpiredAt(e.target.value)}
          />
        </div>
        <div className="updateProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            value={price}
            placeholder="100"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="updateProductItem">
          <label>Colors</label>
          <input 
            type="text" 
            value={color}
            placeholder="red,blue" 
            onChange={(e) => setColor(e.target.value)} 
          />
        </div>
        <div className="updateProductItem">
          <label>Categories</label>
          <input 
            type="text" 
            value={cat}
            placeholder="jeans,skirts" 
            onChange={(e) => setCat(e.target.value)} 
          />
        </div>
      
       {isLoading ? (
        <button disabled={isLoading} className="updateProductButton">
          Image uploading...
        </button>
       ):(
        <button className="updateProductButton">
          Update
        </button>
       )} 
      </form>
    </div>
  );
}
