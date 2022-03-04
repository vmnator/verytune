const express = require('express');
const mongoose = require('mongoose');

let Tenant = require('../database/models/Tenant');

const router = express.Router();

router.post('/', (req, res, next) => {
  const tenant = new Tenant({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    logo: req.body.logo,
    tenant_id: req.body.tenant_id,
    client_id: req.body.client_id,
    client_secret: req.body.client_secret,
  });

  processDocument(tenant)
  .then(tenant => {
    tenant.save()
    .then(result => {
      res.status(200).json({
        message: "Tenant uploaded successfully!",
        tenant: {
          _id: result._id,
          tenant: tenant,
        }
      })  
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  })
})

// get all Tenants
router.get("/", (req, res, next) => {
  Tenant.find()
  .then(data => {
    res.status(200).json({
      message: "Tenant list retrieved successfully!",
      tenant: data
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  })
});

// get specific document by id
router.get("/:id", (req, res, next) => {
  let tenantId = req.params.id

  Tenant.findOne({ '_id': tenantId})
  .then(data => {
    res.status(200).json({
      message: "Tenant retrieved successfully!",
      tenant: data
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  })
});

// update tenant content based on tenant id
router.put("/:id", (req, res, next) => {
  let tenantId = req.params.id
  
  Tenant.findOneAndUpdate({ '_id': tenantId}, req.body)
  .then(data => {
    res.status(200).json({
      message: "Document updated successfully!",
      document: data
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
    })
});

// delete document based on id
router.delete("/:id", (req, res, next) => {
  let tenantId = req.params.id

  Tenant.deleteOne({ '_id': tenantId})
  .then(data => {
    res.status(200).json({
      message: "Tenant deleted successfully!",
      tenant: data
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  })
});

module.exports = router;