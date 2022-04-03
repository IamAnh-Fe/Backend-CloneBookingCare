import db from '../models/index';
import CRUDservice from "../services/CRUDService"
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
    
    return res.render('homepage.ejs', {
        data: JSON.stringify(data)

    });
    } catch (e) {
        console.log(e)
    }

}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')

}
let getCRUD = (req, res) => {
    return res.render('test/crud.ejs');
}

let postCRUD = async (req, res) => {
let message = await CRUDservice.createNewUser(req.body);
console.log(message)
return res.send('post crud from server');
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
return res.render('test/displayCRUD.ejs', {
    dataTable: data
}) 
}
let getEditCRUD = async(req, res) => {
    let userId =  req.query.id;
    if(userId) {
        let UserData = await CRUDservice.getUserInfoById(userId);
        return res.render('test/editCRUD.ejs', {
            user: UserData
        })
    } else {
        return res.send('users not found!')

    }
}
let putCRUD = async(req, res) => {
    let data = req.body;
   let allUsers = await CRUDservice.updateUserData(data);
   return res.render('test/displayCRUD.ejs', {
       dataTable: allUsers
   })  
}
let deleteCRUD = async(req, res) => {
    let id = req.query.id;
    if(id){
        await CRUDservice.deleteUserById(id)
        return res.send('delete the user success')

    } else {
        return res.send('user not found')
    }

}
module.exports  = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}