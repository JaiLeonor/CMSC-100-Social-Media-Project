const authController = require("./auth-controller");

module.exports = (app) => {

  app.post("/signup", authController.signUp);
  app.post("/login", authController.login);
  app.post("/checkifloggedin", authController.checkIfLoggedIn);
  app.get("/find-users", authController.findUsers);
  app.get("/find-username", authController.findUsername);
  app.put("/add-friend", authController.addFriend);
  app.put("/accept-friend", authController.acceptFriend);
  app.put("/reject-friend", authController.rejectFriend);
  app.post("/add-post", authController.addPost);
  app.delete("/delete-post", authController.deletePost);
  app.post("/get-post", authController.getPost);
  app.put("/edit-post", authController.editPost);
}