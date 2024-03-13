export class Constants {
  public static readonly DobTimeFormat = 'YYYY-MM-DD';

  public static Pagination = {
    limit: 10,
    pageNo: 1,
  };

  public static readonly StatusCode = {
    SUCCESS_CODE: 200,
    ERROR_CODE: 400,
  };

  public static readonly ResponseMessages = {
    SUCCESS: 'Success',
    USER_NOT_FOUNT_WITH_EMAIL: 'There is not any user with email',
    PASSWORD_UPDATED: 'Password succesfully updated',
    USER_NOT_REGISTERED: 'USER_NOT_REGISTERED',
    EMAIL_NOT_VERIFIED: 'Email not verified',
    OTP_SENT_SUCCESS: 'OTP sent successfully',
    BAD_REQUEST: 'Bad Request',
    USER_NOT_FOUND: 'User not found',
    INVALID_OTP: 'Please enter valid OTP',
    ACCESS_REMOVED: 'Access Removed',
    EXPIRE_OTP: 'OTP is expired',
    EMAIL_VARIFIED: 'Email verified successfully',
    LOGIN: 'Login successfully',
    INVALID_CREDENTIALS: 'Invalid credentials',
    ENTER_CORRECT_OLD_PASSWORD: 'Please enter correct old password',
    ENTER_CORRECT_PASSWORD: 'Please enter correct password',
    EMAIL_OR_PASSWORD_NOT_VALID: 'Email or Password not valid',
    FAILED: 'Failed',
    EMAIL_ALREADY_REGISTER: 'Email already registered',
    DATA_NOT_FOUND: 'Bad request. Data not found',
    DATA_NOT_UPDATE: 'Bad request. Data not update',
    OTP_SENT_VERIFY_EMAIL: 'OTP has already been sent to your respective email',
    SOMETHING_WENT_WRONG: 'Something went wrong!',
    EMAIL_VERIFICATION_PENDING: 'Email verification pending',
    OTP_ALREADY_SENT: 'User is already registered and OTP has already been sent',
    USER_REGISTERED_EMAIL_OTP_SENT: 'User is already registered. Email OTP sent Successfully',
    UPDATE_SUCCESS: 'Updated successfully',
    USER_ISREGISTERED: 'User is already registered',
    STEP_SUCCESS: 'Step completed successfully',
    LOGOUT_SUCCESS: 'Logout successfully',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    SCHOOL_ALREADY_EXIST: 'School already exist',
    DEPARTMENT_ALREADY_EXIST: 'Department already exist',
    PERMISSION_DENIED: 'Permission Denied',
    ACADEMIC_YEAR_ALREADY_EXIST: 'Academic Year already exist',
    ACADEMIC_YEAR_UPDATE_SUCCESS: 'Academic Year Updated!',
    ACADEMIC_YEAR_CREATE_SUCCESS: 'Academic Year Created!',
    STANDARD_DELETE_SUCCESS: 'Standard Deleted Successfully',
    INPUTFIELD_ALREADY_EXIST: 'Input Field already exist',
    FORM_ALREADY_EXIST: 'Form already exist',
    STEP_ALREADY_EXIST: 'Step already exist',
    REFERENCE_ALREADY_EXIST: 'Reference already exist',
    CUSTOM_FIELD_ALREADY_EXIST: 'Custom Field already exist',
    GROUP_ALREADY_EXIST: 'Group already exist',
    FIELD_ALREADY_EXIST: 'Field already exist in form',
  };
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum DeviceType {
  Window = 0,
  Ios = 1,
  Android = 2,
}

export enum UserType {
  admin = 1,
  staff = 2,
  student = 3,
}

export enum SortType {
  asc = 'ASC',
  desc = 'DESC',
}
export enum SortTypeMongo {
  asc = 1,
  desc = -1,
}

export enum SortEmail {
  forgotPassword = 'Forgot Password',
  welcome = 'Welcome',
}

export enum TraceType {
  follow_up = 1,
  reporting = 2,
}

export enum statusType {
  default = 0,
  no = 1,
  yes = 2,
}

export enum isAssign {
  no = 1,
  yes = 2,
}

export enum PointType {
  default = 0,
  concluded = 1,
  pending = 2,
  cancelled = 3,
  not_applicable = 4,
}

export enum waveOffType {
  default = 0,
  yes = 1,
}

export enum RedirectionType {
  reporting = 1,
  observation = 2,
}

export enum RedirectionMenuType {
  reporting = 'reporting',
  observation = 'observation',
}

export enum NotificationTitleType {
  observation = 'Observation',
  reporting = 'Reporting',
}

export enum NotificationMessageType {
  new_observation = 'added new observation',
  new_reporting = 'added new reporting',
  reminder_reporting = 'reminder reporting',
  answer_reporting = 'answer reporting',
}

export enum S3FolderList {
  school = 'school',
  staff = 'staff',
  student = 'student',
  school_image = 'school/image',
  document = 'document',
  reporting = 'reporting',
  observation = 'observation',
}

export enum MaterialStatus {
  pending = 'pending',
  publish = 'publish',
}
