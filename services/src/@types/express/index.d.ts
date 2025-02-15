import { UserRecord } from "firebase-admin/lib/auth/user-record";

declare global {
  namespace Express {
    interface Request {
      user?: UserRecord;
    }
  }
}
