import DB from '../models/index.js';
const { User } = DB
import { signToken, AuthenticationError } from '../services/auth.js';


// Define types for the arguments
interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    }
}

interface bookInput {
    authors?: string[] | null;
    description?: string | null;
    bookId: string | null;
    title: string | null;
    image: string | null;
    link: string | null;

}

interface LoginUserArgs {
    email: string;
    password: string;
}

const resolver = {
    Query: {
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('Could not authenticate user.');
        },
    },

    Mutation: {
        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.');
            }

            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },

        addUser: async (_parent: any, { input }: AddUserArgs) => {
            const user = await User.create({ ...input });

            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },
        saveBook: async (_parent: any, { input }: { input: bookInput }, context: any) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Could not authenticate user.');
        },

        removeBook: async (_parent: any, { bookId }: {bookId: string}, context: any) => {
            if (context.user) {
            
      
              let user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: {bookId} } },
                { new: true }
              );
      
              return user;
            }
            throw AuthenticationError;
          },

    }
}

export default resolver;