const express = require('express')
const router = express.Router()

console.log("test invoked");
router.get("/testing",(req, res)=>{
    res.send("hello from /accounts/testing route.... nesting of routes successful")
})

module.exports = router