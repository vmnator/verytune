const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tenantSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  logo: {
    type: String
  },
  tenant_id: {
    type: String
  },
  client_id: {
    type: String
  },
  client_secret: {
    type: String
  },
}, {
  collection: 'tenants',
  timestamps: true
})

module.exports = mongoose.model('Tenant', tenantSchema)