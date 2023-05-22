//not using lodash in this project
//does not handle database operation errors

const bodyParser = require('body-parser');
const express = require('express');
const { redirect } = require('express/lib/response');
const app = express();
const date = require(__dirname + '/date.js');
const mongoose = require("mongoose");
/////////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'))
mongoose.connect("mongodb+srv://shashwat:pvA0u3cA7M5Jtx01@cluster0.gobnuc1.mongodb.net/todolistV3").then((x)=>{
    // console.log(x);
});
/////////////////////////////////////////////////////////////////////////////////

let arr = []
let lastURL = ""

//db structures

const itemSchema = new mongoose.Schema({
    name: String
})

const ListSchema = new mongoose.Schema({
    ListName: String,
    Items: [itemSchema]
})

const Item = new mongoose.model('Item', itemSchema)
const List = new mongoose.model('List', ListSchema)


app.get('/', (req, res) => {
    res.redirect('/manage');
})

app.get('/lists/:listName', (req, res) => {
    lastURL = req.params.listName
    // console.log(lastURL);
    let listID = 0;
    List.findOne({ListName:req.params.listName}).then((x) => {
        if(x == null){
            List.create({ListName:req.params.listName})
            res.render('list', { dayvalue: req.params.listName, taskArray: [], routeName: '/lists/' + req.params.listName })
        }
        else{
            res.render('list', { dayvalue: req.params.listName, taskArray: x.Items, routeName: '/lists/' + req.params.listName })
        }
    })
    
})

app.post('/checked', (req, res)=>{
    let newArr = []
    
    List.findOneAndUpdate({ListName:lastURL}, {$pull:{Items:{name:req.body.item}}}).then((UpdateResult)=>{})
    res.redirect('/lists/' + lastURL);
})

app.post('/lists/:listName', (req, res) => {
    const ListName = req.params.listName;
    lastURL = ListName;
    List.findOne({ ListName: ListName }).then((x)=>{
        let newItem = new Item({
            name:req.body.task
        })
        x.Items.push(newItem);
        
        List.findOneAndUpdate({ListName: ListName}, {Items:x.Items}).then((y)=>{
            // console.log("updation>>> " + y);
        }).then(()=>{
            res.redirect('/lists/' + ListName)
        })
    })
})

let arr2 = [];

app.get('/manage', (req, res)=>{
    List.find().then((x)=>{
        res.render('manage', {ItemArray:x})
    })
})

app.post('/deletelist', function (req, res) {
    List.deleteOne({ListName:req.body.deletename}).then((x)=>{
        res.redirect('/manage')
    })
})

app.get('/about', (req, res)=>{
    res.render('about');
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`online`);
});


// const item1 = new Item({
//     name: "item1"
// })
// const item2 = new Item(
//     {
//         name:"item2"
//     }
// )

// Item.create(item1).then((x)=>{
    //     console.log("insertion succesful");
    // }).catch((z)=>{
        //     console.log("something went wrong... " + z);
        // // })
        
        
        
        // List.create({ListName:"list1", Items:[item1, item2]}).then((x)=>{
            //     console.log("insertion succesful");
            // }).catch((z)=>{
//     console.log("something went wrong... " + z);
// })

// List.updateOne()