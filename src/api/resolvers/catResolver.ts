/* eslint-disable @typescript-eslint/no-explicit-any */
import catModel from '../models/catModel';
import {Cat} from '../../interfaces/Cat';

export default {
  Query: {
    cats: async () => {
      return await catModel.find();
    },
    catById: async (_: any, args: {id: string}) => {
      return await catModel.findById(args.id);
    },
    catsByOwner: async (_: any, args: {owner: string}) => {
      return await catModel.find({owner: args.owner});
    },
    catsByArea: async (_: any, args: {area: string}) => {
      return await catModel.find({area: args.area});
    },
  },
  Mutation: {
    createCat: async (_: any, args: Cat) => {
      const newCat = new catModel(args);
      (await newCat.save()).populate('owner');
      return newCat;
    },
    updateCat: async (_: any, args: Cat) => {
      const updatedCat = await catModel.findByIdAndUpdate(
        args.id,
        {...args},
        {
          new: true,
        }
      );
      return updatedCat;
    },
    deleteCat: async (_: any, args: Cat) => {
      return catModel.findOneAndDelete({_id: args.id});
    },
  },
};
