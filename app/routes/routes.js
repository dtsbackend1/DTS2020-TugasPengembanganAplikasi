module.exports = app => {
    const list = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    // Pembuatan isi field
    router.post("/", list.create);
  
    // cek semua data dalam list pekerjaan
    router.get("/", list.findAll);
  
    // cek semua data status done
    router.get("/status", list.findAllstatus);
  
    // cek list pekerjaan sesuai dengan id 
    router.get("/:id", list.findOne);
  
    // update data list pekerjaan
    router.put("/:id", list.update);
  
    // Delete data list pekerjaan
    router.delete("/:id", list.delete);
  
    // Delete all data list pekerjaan
    router.delete("/", list.deleteAll);
  
    //url API 
    app.use('/api/listpekerjaan', router);
  };