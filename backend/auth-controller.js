const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// get user model registered in Mongoose
const User = mongoose.model("User", userSchema);

exports.signUp = (req, res) => {
  const newuser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  console.log("New user: ");
  console.log(newuser);

  newuser.save((err) => {
    if (err) { return res.send({ success: false }); }
    else { return res.send({ success: true }); }
  });
}

exports.login = (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password;

  User.findOne({ email }, (err, user) => {
    // check if email exists
    if (err || !user) {
      //  Scenario 1: FAIL - User doesn't exist
      console.log("user doesn't exist");
      return res.send({ success: false });
    }

    // check if password is correct
    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        // Scenario 2: FAIL - Wrong password
        console.log("wrong password");
        return res.send({ success: false });
      }

      console.log("Successfully logged in");

      // Scenario 3: SUCCESS - time to create a token
      const tokenPayload = {
        _id: user._id
      }

      const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

      // return the token to the client
      return res.send({ success: true, token, username: user.username, fname: user.fname, lname: user.lname });
    })
  })
}

exports.checkIfLoggedIn = (req, res) => {

  if (!req.cookies || !req.cookies.authToken) {
    // Scenario 1: FAIL - No cookies / no authToken cookie sent
    return res.send({ isLoggedIn: false });
  }

  // Token is present. Validate it
  return jwt.verify(
    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
      if (err) {
        // Scenario 2: FAIL - Error validating token
        return res.send({ isLoggedIn: false });
      }

      const userId = tokenPayload._id;

      // check if user exists
      return User.findById(userId, (userErr, user) => {
        if (userErr || !user) {
          // Scenario 3: FAIL - Failed to find user based on id inside token payload
          return res.send({ isLoggedIn: false });
        }

        // Scenario 4: SUCCESS - token and user id are valid
        console.log("user is currently logged in");
        return res.send({ isLoggedIn: true });
      });
    });
}

exports.findUsers = (req, res) => {
  if (!req.query.name) { return res.send('No user provided') }

  const name = req.query.name.split(" ")
  User.find({ $or: [{fname: {$in: name}}, {lname: {$in: name}}, {username: req.query.name}] }, (err, users) => {
    if(!err) { return res.send(users); }
  })
}

exports.findUsername = (req, res) => {
  if (!req.query.username) { return res.send('No username provided') }

  User.findOne({ username: req.query.username }, (err, user) => {
    if(!err) return res.send(user)
  })
}

exports.addFriend = (req, res) => {
  User.updateOne({ username: req.body.to }, { $addToSet: {pending: req.body.from} }, (err) => {
    if (err) return res.send({ success: false })
    else return res.send({ success: true })
  })
}

exports.acceptFriend = (req, res) => {
  User.updateOne({ username: req.body.from }, { $addToSet: {friends: req.body.to}, $pull: {pending: req.body.to} }, (err) => {
    if (err) return res.send({ success: false })
  })

  User.updateOne({ username: req.body.to }, { $addToSet: {friends: req.body.from}, $pull: {pending: req.body.from} }, (err) => {
    if (err) throw err
    else return res.send({ success: true })
  })
}

exports.rejectFriend = (req, res) => {
  User.updateOne({ username: req.body.from }, { $pull: {pending: req.body.to} }, (err) => {
    if (err) return res.send({ success: false })
    else return res.send({ success: true })
  })
}

const Post = mongoose.model("Post");

exports.addPost = (req, res) => {
  const newPost = new Post({
    author_username: req.body.author_username,
    author_name: req.body.author_name,
    content: req.body.content
  });

  console.log("New post: ", newPost);

  newPost.save((err) => {
    if (err) return res.send({ success: false });
    else  return res.send({ success: true }); 
  });
}

exports.getPost = (req, res) => {
  Post.find({ author_username: { $in: req.body.authors } }, (err, posts) => {
    if (err) return res.send({ success: false });
    else return res.send({ success: true, feed: posts });
  })
}

exports.deletePost = (req, res) => {
  Post.deleteOne({ _id: req.query.id }, (err) => {
    if (err) { return res.send({ success: false }); }
    else { return res.send({ success: true }); }
  })
}

exports.editPost = (req, res) => {
  if(req.body.content !== '') {
    Post.updateOne({ _id: req.body.id }, { content: req.body.content }, (err) => {
      if (err) { return res.send({ success: false }); }
      else { return res.send({ success: true }); }
    })
  }
  else return res.send({ success: false });
}