const { mongoose } = require('../mongo')

const UserSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  name: { type: String, required: true },
  email: { type: String },
  passwordHash: { type: String },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', UserSchema)
