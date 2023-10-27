const { users } = require("../models");
const userController = require("../Controllers/userController")



// class UserAdminHandler {
//   constructor() {}

//   async isAdmin(user) {
//     console.log(user)
//     const userRecord = await users.findOne({ where: { id: user.id } });
//     return userRecord && userRecord.role === 'admin';
//   }

//   async executeIfAdmin(req, res, user, action) {
//     if (await this.isAdmin(user)) {
//       console.log('User is admin');
//       action(req, res);
//     } else {
//       res.status(401).json({ message: 'Unauthorized to continue' });
//     }
//   }
//   async adminLogin(req, res, user) {
//     this.executeIfAdmin(req, res, user, userController.login);
//   }

//   async getAllUsers(req, res, user) {
//     this.executeIfAdmin(req, res, user, userController.getAllUsers);
//   }

//   async getUserById(req, res, user) {
//     this.executeIfAdmin(req, res, user, userController.getUserById);
//   }

//   async updateUser(req, res, user) {
//     this.executeIfAdmin(req, res, user, userController.updateUser);
//   }

//   async deleteUser(req, res, user) {
//     this.executeIfAdmin(req, res, user, userController.deleteUser);
//   }
// }


 

    async function isAdmin(user) {
      console.log(user)
      const userRecord = await users.findOne({ where: { id: user.id } });
      return userRecord && userRecord.role === 'admin';
    }
  
    async function executeIfAdmin(req, res, user, action) {
      if (await isAdmin(user)) {
        console.log('User is admin');
        action(req, res,{user});
      } else {
        res.status(401).json({ message: 'Unauthorized to continue' });
      }
    }
    async function adminLogin(req, res, {user}) {
      executeIfAdmin(req, res, user, userController.login);
    }
  
    async function getAllUsers(req, res, {user}) {
      executeIfAdmin(req, res, user, userController.getAllUsers);
    }
  
    async function getUserById(req, res, {user}) {
      executeIfAdmin(req, res, user, userController.getUserById);
    }
  
    async function updateUser(req, res, {user}) {
      executeIfAdmin(req, res, user, userController.updateUser);
    }
  
    async function deleteUser(req, res, {user}) {
      executeIfAdmin(req, res, user, userController.deleteUser);
    }
  






module.exports = {isAdmin,adminLogin,
executeIfAdmin,getAllUsers,getUserById,deleteUser,updateUser}
