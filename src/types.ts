export interface User {
  status: string;
  resetPasswordToken: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  userType: string;
  gender: string;
  branch: string;
  createdAt: Date;
  isActive: boolean;
  updatedAt: Date;
  __v: number;
  password: string;
}

export interface Judge {
  createdAt: Date;
  email: string;
  firstName: string;
  gender: string;
  isActive: boolean;
  lastName: string;
  password: string;
  updatedAt: Date;
  userType: string;
  __v: number;
  _id: string;
}
export interface LeadId {
  _id: string;
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  branch: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  teamId: string;
  resetPin: string;
}

export interface Teams {
  _id: string;
  name: string;
  description: string;
  leadId: LeadId;
  members: User[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Invite {
  _id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  leadId: LeadId | undefined;
  members: User[] | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  __v: number | undefined;
}
export interface Vote {
  judge: Judge;
  score: number;
  _id: string;
}
export interface Application {
  _id: string;
  title: string;
  category: string;
  problem: string;
  proposedSolution: string;
  leadId: LeadId;
  status: string;
  teamId: Teams;
  votes: Vote[];
  totalVotedJudges: number;
  totalVotes: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ChallengeStatement {
  _id: string;
  theme: string;
  problem: string;
  problemStatement: string;
  challengeStatement: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}
