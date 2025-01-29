import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: {
      text: { type: String, required: false },
      images: { type: [String], required: false },
    },
  },
  { timestamps: true }
);

// Pre-save validation to ensure at least one of text or image is provided
messageSchema.pre("save", function (next) {
  const content = this.content;
  if (!content.text && (!content.images || content.images.length === 0)) {
    return next(
      new Error("Either text or at least one image must be provided.")
    );
  }
  next();
});

export const Message = mongoose.model("Message", messageSchema);
