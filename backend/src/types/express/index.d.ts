// backend/src/types/express/index.d.ts

import { UserDocument } from "../../models/user.model";

// This is the core of the solution: Declaration Merging.
// We are telling TypeScript that inside the Express namespace,
// the Request interface should also have an optional 'user' property.
declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument;
    }
  }
}
