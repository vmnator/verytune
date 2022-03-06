const express = require('express');
const mongoose = require('mongoose');

let Tenant = require('../database/models/Tenant');
let msgph = require('../utils/microsoftgraph');

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Please specifiy tenand id to get all devices!"
  });
});

router.get("/:id", (req, res, next) => {
  let tenantId = req.params.id

  Tenant.findOne({ '_id': tenantId})
    .then(data => {
      const auth = {
        clientId: data.client_id,
        authority: "https://login.microsoftonline.com/" + tenantId,
        clientSecret: data.client_secret
      }
      return auth
    })
    .then(auth => {
      msgph.getDevices(auth)
        .then(devices => {
          res.status(200).json({
            message: "Devices retrieved successfully!",
            tenant: devices
          });
        })
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({
        error: "Tenant nod found!"
      });
    })
});

module.exports = router;