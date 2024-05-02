const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name has to have 3 characters minimun'],
    required: true
  },
  number: {
    type: String,
    minLength: [8, 'Number has to have 8 characters minimun'],
    required: true,
    validate: {
      validator(val) {
        return /\b\d{2,3}-\d+$/.test(val);
      },
      message: 'Phone number format invalid',
    },
  },
});
  
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
module.exports = mongoose.model('Person', personSchema);