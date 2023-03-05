const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');

router.get('/', async (req, res) => {
   console.log("page hit");
   let id = req.params.id

   try {
      const result = await dbModel.getAllRestaurants();
      res.render('index', { allUsers: result });

      //Output the results of the query to the Heroku Logs
   }
   catch (err) {
      res.render('error', { message: 'Error reading from MySQL' });
   }
});

router.post('/addUser', async (req, res) => {
   console.log("form submit");
   console.log(req.body);
   try {
      const success = await dbModel.addRestaurant(req.body);
      if (success) {
         res.redirect("/");
      }
      else {
         res.render('error', { message: "Error writing to MySQL" });
         console.log("Error writing to MySQL");
      }
   }
   catch (err) {
      res.render('error', { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
      console.log(err);
   }
});


router.get('/deleteUser/:id', async (req, res) => {
   console.log("delete user");
   let id = req.params
   if (id) {
      const success = await dbModel.deleteRestaurant(id);
      if (success) {
         console.log('hey')
         res.redirect("/");
      }
      else {
         res.render('error', { message: 'Error writing to MySQL' });
         console.log("Error writing to mysql");
      }
   }
});

router.get("/showReview/:id", async (req, res) => {
   let id = req.params
   console.log(id)
   console.log("page hit");
   try {
      const result = await dbModel.getAllReviews();
      console.log(result);

      res.render('review', { allUsers: result });

      //Output the results of the query to the Heroku Logs
   } catch (err) {
      res.render("error", { message: "Error reading from MySQL" });
      console.log("Error reading from mysql");
   }
});

router.post('/addUsername', async (req, res) => {
   console.log("form submit");
   console.log(req.body);
   try {
      const success = await dbModel.addReview(req.body);
      if (success) {
         res.redirect("/");
      }
      else {
         res.render('error', { message: "Error writing to MySQL" });
         console.log("Error writing to MySQL");
      }
   }
   catch (err) {
      res.render('error', { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
      console.log(err);
   }
});

router.get('/deleteReview/:id', async (req, res) => {
   console.log("delete user");
   let id = req.body.id

   if (id) {
      const success = await dbModel.deleteReview(id);
      if (success) {
         res.redirect("/");
      }
      else {
         res.render('error', { message: 'Error writing to MySQL' });
         console.log("Error writing to mysql");
         console.log(err);
      }
   }
});
module.exports = router;
