
import { signInWithEmailAndPassword } from "firebase/auth";
export const SignInWithEmailAndPassword = async (auth:any,email:string, password:string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth,email, password);
   console.log('from func',userCredential)
  
    return userCredential;
  } catch (error) {
    console.error('Error signing in:', error);
     return error;
  }
};