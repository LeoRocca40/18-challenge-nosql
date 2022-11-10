const { Schema, model } = require('mongoose');
const formatTheDate = require('../utils/formatDate');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: theDate => formatTheDate(theDate)
          }

    }
);

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trimmed: true,
      unique: true,
      minLength: 1,
      maxLength: 280
  },
    createdAt: {
      type: Date,
      default: Date.now,
      get: theDate => formatTheDate(theDate)
    },
    reactions: [ ReactionSchema ],
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

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;