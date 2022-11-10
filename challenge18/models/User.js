const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      id: Number,
      type: String,
      required: true,
      trimmed: true,
      unique: true,
  },
    email: {
      type: String,
      required: true,
      //look at mongoose's matching email address validation
      validate: {
        validator: function(v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      unique: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],,
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
