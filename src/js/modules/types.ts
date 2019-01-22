import { User } from "firebase";
import UpdatePasswordForm from "./core/components/UpdatePasswordForm";
// Misc types

export interface ReduxState {
  core: CoreState;
}

export interface Errors {
  loginError: string;
  logoutError: string;
  registerError: string;
  passwordEmailError: string;
  updatePasswordError: string;
}

export interface Notifications {}

export enum LoadingStates {
  Loading,
  Loaded,
  Failed
}

interface ApplyForm extends Form {
  resumeTimestamp?: string;
  submitTimestamp?: string;
  formData: ApplyFormData;
}

interface UpdatePasswordForm extends Form {}

interface ResetPasswordForm extends Form {}

interface RegisterForm extends Form {}

interface LoginForm extends Form {}

export interface ApplyFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  // race / ethnicity
  isAmericanNative: boolean;
  isAsianPacificIslander: boolean;
  isBlackAfricanAmerican: boolean;
  isHispanic: boolean;
  isWhiteCaucasian: boolean;
  isOther: boolean;
  phoneNumber: string;
  school: string;
  nyuSchool?: string;
  nyuSchoolOther?: string;
  yearOfStudy: string;
  major: string;
  gradYear: string;
  isFirstTime: string;
  timesParticipated: string;
  track: string;
  tshirtSize: string;

  isVeggie: boolean;
  isVegan: boolean;
  isKosher: boolean;
  isHalal: boolean;
  isGlutenFree: boolean;

  otherDietaryRestrictions: string;
  allergies: string;
  codeOfConduct: boolean;
  privacyPolicy: boolean;
  resumeTimestamp: string; // timestamp

  emergencyContactNumber: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
}

interface Form {
  isSubmitting: boolean;
}

export interface CoreState {
  viewportWidth: number;
  viewportHeight: number;
  user: User;
  errors: Errors;
  notifications: Notifications;
  loadingState: LoadingStates;
  applyForm: ApplyForm;
  updatePasswordForm: UpdatePasswordForm;
  resetPasswordForm: ResetPasswordForm;
  registerForm: RegisterForm;
  loginForm: LoginForm;
  passwordEmailSent: boolean;
}
