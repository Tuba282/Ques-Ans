import express from 'express';
const router = express.Router();
import { middlewareToProtect } from '../middleware/authMiddleware.js';
import { createBlog, getMyBlogs ,getSingleBlog , updateMyBlog , deleteMyBlog} from '../controllers/userBlogController.js';
import { upload_image_contoller } from '../controllers/uploadController.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { deleteAnyBlog, getBlogs , getBlogByUser, updateAnyBlog, getAllBlogStats } from '../controllers/adminBlogController.js';


// admin: get number of blogs per user

router.get('/stats', middlewareToProtect, isAdmin, getAllBlogStats);

// ye just image upload ke liye hai
router.post("/upload", upload_image_contoller);


// user blog routes
router.post('/create', middlewareToProtect , createBlog) 
router.get('/my-blogs', middlewareToProtect, getMyBlogs) 
router.get('/:id', middlewareToProtect, getSingleBlog) 
router.put('/update/:id', middlewareToProtect, updateMyBlog) 
router.delete('/delete/:id', middlewareToProtect, deleteMyBlog) 


// public route
router.get('/',middlewareToProtect, getBlogs) 

// admin blog routes
router.get('/getAnyUser/:userId', middlewareToProtect, isAdmin, getBlogByUser);// yaha user ki id jayegi
router.put('/updateAnyBlog/:id', middlewareToProtect, isAdmin, updateAnyBlog);// yaha blog ki id jayegi
router.delete('/delete/:id', middlewareToProtect, isAdmin, deleteAnyBlog);// yaha bhi blog ki id jayegi



export default router;