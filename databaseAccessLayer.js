const database = include('/databaseConnection');


async function getAllRestaurants() { 	
	let sqlQuery = `
		SELECT name, description
		FROM restaurant_review;
	`;

	try {
		const results = await database.query(sqlQuery);
		console.log(results[0]);
		return results[0];
	}
	catch (err) {
		console.log("Error selecting from todo table");
		console.log(err);
		return null;
	}
}

async function getAllReviews() {
	let sqlQuery = `
		SELECT details, reviewer_name, rating,
		FROM review;
	`;

	try {
		const results = await database.query(sqlQuery);
		console.log(results[0]);
		return results[0];
	}
	catch (err) {
		console.log("Error selecting from todo table");
		console.log(err);
		return null;
	}
}


const passwordPepper = "SeCretPeppa4MySal+";

async function addRestaurant(postData) {
	let sqlInsertSalt = `
   INSERT INTO restaurant (name, description, password_salt)
   VALUES (:first_name, :last_name, :email, sha2(UUID(),512));
   `;
	let params = {
		first_name: postData.first_name,
		last_name: postData.last_name,
		email: postData.email
	};
	console.log(sqlInsertSalt);
	try {
		const results = await database.query(sqlInsertSalt, params);
		let insertedID = results.insertId;
		let updatePasswordHash = `
   UPDATE restaurant
   SET password_hash = sha2(concat(:password,:pepper,password_salt),512)
   WHERE restaurant = :userId;
   `;
		let params2 = {
			password: postData.password,
			pepper: passwordPepper,
			userId: insertedID
		}
		console.log(updatePasswordHash);
		const results2 = await database.query(updatePasswordHash, params2);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

async function addReview(postData) {
	let sqlInsertSalt = `
   INSERT INTO review (restaurant, reviewer_name, details, rating, password_salt)
   VALUES (:first_name, :last_name, :email, :last_name, sha2(UUID(),512));
   `;
	let params = {
		first_name: postData.first_name,
		last_name: postData.last_name,
		email: postData.email
	};
	console.log(sqlInsertSalt);
	try {
		const results = await database.query(sqlInsertSalt, params);
		let insertedID = results.insertId;
		let updatePasswordHash = `
   UPDATE review
   SET password_hash = sha2(concat(:password,:pepper,password_salt),512)
   WHERE review = :userId;
   `;
		let params2 = {
			password: postData.password,
			pepper: passwordPepper,
			userId: insertedID
		}
		console.log(updatePasswordHash);
		const results2 = await database.query(updatePasswordHash, params2);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

async function deleteRestaurant(webUserId) {
	let sqlDeleteUser = `
   DELETE FROM restaurant
   WHERE restaurant_id = :userID
   `;
	let params = {
		userID: webUserId
	};
	console.log(sqlDeleteUser);
	try {
		await database.query(sqlDeleteUser, params);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

async function deleteReview(webUserId) {
	let sqlDeleteUser = `
   DELETE FROM restaurant_review
   WHERE restaurant_review_id = :userID
   `;
	let params = {
		userID: webUserId
	};
	console.log(sqlDeleteUser);
	try {
		await database.query(sqlDeleteUser, params);
		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}


module.exports = { getAllRestaurants, getAllReviews, addRestaurant, deleteRestaurant, deleteRestaurant, addReview }
