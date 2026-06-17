import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "./firebase";

let recaptcha;

export const getRecaptcha = () => {
  if (!recaptcha) {
    recaptcha = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );
  }
  return recaptcha;
};