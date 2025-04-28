import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: 'Please enter a valid email address',
      },
    },
    password: {
      type: String,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
        variant: {
          type: Object,
          required: true,
          size: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          portionSize: {
            type: Object,
            required: true,
          },
        },
      },
    ],
    googleId: {
      type: String,
    },
    authType: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    }, role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password before saving to database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);

export default User;