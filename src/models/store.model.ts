import { Schema, Document, model } from 'mongoose'

export interface IStore {
  name: string
  description: string
  image: string
}

export default interface IStoreModel extends Document, IStore {}

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Store = model<IStoreModel>('Store', schema)
