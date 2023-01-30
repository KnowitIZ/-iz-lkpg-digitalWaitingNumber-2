export interface WaitingNumber {
  id: number;
  createdById?: string;
  createdBy?: string;
  createdOn: Date;
  status: string;
  servedById?: string;
  servedBy?: string;
  refNbr?: string;
}
