const { users } = require("../models");

async function isUserAdmin(req, res, user) {
//   try {
//    console.log(req.user)
//     const userRecord = await users.findOne({ where: { id: user.id } });
//     if (userRecord && userRecord.role === 'admin') {
//       console.log('User is admin');
//     } else {
//      return res.json({ message: 'Unauthorized to continue' });
      
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }


const userRecord = await users.findOne({ where: { id: user.id } });
if (userRecord && userRecord.role === 'admin') {
  console.log('User is admin');
userController.login(req, res, { err, user, info });

} else {
 return res.json({ message: 'Unauthorized to continue' });
  
}
}

module.exports = { isUserAdmin };