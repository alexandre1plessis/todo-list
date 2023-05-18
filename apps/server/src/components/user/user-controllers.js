import { TaskModel, ListModel, UserModel } from '../list/list-model.js'
import joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Fonction pour créer un compte utilisateur
export const createUser = async (ctx) => {
  try {
    const schema = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required()
    });
    const { error, value } = schema.validate(ctx.request.body);

    if(error) throw new Error(error);

    // On vérifie si l'email existe déjà
    const existingUser = await UserModel.findOne({ email: value.email });
    if(existingUser) throw new Error('Email already exists');

    // On crypte le mot de passe
    const hashedPassword = await bcrypt.hash(value.password, 10);

    const user = await UserModel.create({
      name: value.name,
      email: value.email,
      password: hashedPassword
    });
    
    // On retourne les informations de l'utilisateur, en excluant le mot de passe
    ctx.ok({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    ctx.badRequest({ message: error.message });
  }
};
  
export const authenticateUser = async (ctx) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required()
    });
    const { error, value } = schema.validate(ctx.request.body);

    if (error) throw new Error(error);

    const user = await UserModel.findOne({ email: value.email });
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(value.password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const authenticatedUser = await UserModel.findById(user._id).select('-password');

    ctx.state.user = authenticatedUser;
    ctx.ok({
      token,
      user: {
        id: authenticatedUser._id,
        name: authenticatedUser.name,
        email: authenticatedUser.email
      }
    });
  } catch (error) {
    ctx.badRequest({ message: error.message });
  }
};

export const updateUser = async (ctx) => {
  try{
    if (!ctx.request.body.user.name) throw new Error('Name is missing')
    if (!ctx.request.body.user.email) throw new Error('Email is missing')
    if (!ctx.request.body.user.password) throw new Error('Password is missing')
    const user = await UserModel.findOne({ _id: ctx.state.auth.userId });

    const userSave = await TaskModel.findOneAndUpdate({ _id: user._id }, ctx.request.body.user, { new: true })
    if (!userSave) throw new Error('User not found')
    ctx.ok(userSave)
  }catch (e) {
    ctx.badRequest({ message: e.message })
  }

};
