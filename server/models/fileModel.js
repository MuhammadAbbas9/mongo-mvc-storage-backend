import { model, Schema } from "mongoose";

const FileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    extension: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    parentDirId: {
      type: Schema.Types.ObjectId,
      ref: `Directory`,
    },
  },
  {
    strict: "throw",
  }
);

const File = model("File", FileSchema);

export default File;
