
import express from 'express';
import {Book} from '../models/bookModels.js'
const router=express.Router()

// Route for save a new  book

router.post('/',async(request,response)=>{
try{
    if(
        !request.body.title||
        !request.body.author||
        !request.body.publishYear
    ){
        return response.status(400).send({message:"All fields title,author,publishYear required"

        });
    }
        const newBook={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        };
        const book=await Book.create(newBook);
        return response.status(201).send(book);
}
catch(error){
console.log(error)
    console.log(error.message);
    response.status(500).send({message:error.message})
}
});

//get all books  from database
router.get('/', async (req, res) => {
    console.log("GET /books called");

  try {
    const books = await Book.find({});
    return res.status(200).json(
        {
            counts:books.length,
            data:books
        }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


//get 1 books  from database
router.get('/:id', async (req, res) => {
    console.log("GET /books called");

  try {
    const {id} = req.params;
    const book=await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


//update book

router.put('/:id', async (request, response) => {
    console.log("GET /books called");

  try {
   if(
        !request.body.title||
        !request.body.author||
        !request.body.publishYear
    ){
        return response.status(400).send({message:"All fields title,author,publishYear required"

        });
    }
    const {id}=request.params;
    const  result=await Book.findByIdAndUpdate(id,request.body,{
            new: true, // return updated book
            runValidators: true
    });
    if(!result){
        return response.status(404).json({message:'Book not found'});
    }

    return response.status(200).json({
            message: "Book updated successfully",
            book:result
        });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//delete book
router.delete('/:id', async (request, response) => {
    console.log("GET /books called");

  try {
  const {id}=request.params;
  const result=await Book.findByIdAndDelete(id);
  if(!result){
    return response.status(404).json({messages:'Book not found'});
  }
   return response.status(200).json({
            message: "Book deleted successfully",
            deletedBook: result
        });
  }
 catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
