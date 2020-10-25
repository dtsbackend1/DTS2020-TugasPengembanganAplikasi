const db = require("../models");
const Listpekerjaan = db.list;

exports.create = (req, res) => {
   
    if (!req.body.nama_pekerjaan) {
      res.status(400).send({ message: "Data tidak boleh kosong" });
      return;
    }
  
  
    const list = new Listpekerjaan({
      nama_pekerjaan: req.body.nama_pekerjaan,
      tanggal_perkerjaan: req.body.tanggal_perkerjaan,
      komentar : req.body.komentar,
      status : req.body.status
    });
  
    
    list
      .save(list)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Kesalahan dalam pembuatan list pekerjaan."
        });
      });
  };

exports.findAll = (req, res) => {
    const nama_pekerjaan = req.query.nama_pekerjaan;
    var condition = nama_pekerjaan ? { nama_pekerjaan: { $regex: new RegExp(nama_pekerjaan), $options: "i" } } : {};
  
    Listpekerjaan.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Terjadi kesalahan."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Listpekerjaan.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "data dengan ID = " + id + "tidak ditemukan"});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "data dengan ID = " + id + "tidak ditemukan"});
      });
  };

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data Update tidak boleh kosong"
      });
    }
  
    const id = req.params.id;
  
    Listpekerjaan.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Data list pekerjaan dengan ID=${id}. Tidak ditemukan!`
          });
        } else res.send({ message: "Data List Pekerjaan Berhasil diupdate" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error update List Pekerjaan ID=" + id
        });
      });
  };


exports.delete = (req, res) => {
    const id = req.params.id;
  
    Listpekerjaan.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Data list pekerjaan dengan ID=${id}. Tidak ditemukan!`
          });
        } else {
          res.send({
            message: "Data berhasil dihapus!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Data ID=" + id +"Gagal dihapus"
        });
      });
  };


exports.deleteAll = (req, res) => {
  Listpekerjaan.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Semua Data berhasil dihapus!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Terjadi kesalahan!."
        });
      });
  };


exports.findAllstatus = (req, res) => {
  Listpekerjaan.find({ status: "done" })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Terjadi kesalahan!."
        });
      });
  };