export interface Xinfo {
  IsSuccess: boolean;
  InAddress: string;
  InSRS: string;
  InFuzzyType: string;
  InFuzzyBuffer: string;
  InIsOnlyFullMatch: boolean;
  InIsLockCounty: boolean;
  InIsLockTown: boolean;
  InIsLockVillage: boolean;
  InIsLockRoadSection: boolean;
  InIsLockLane: boolean;
  InIsLockAlley: boolean;
  InIsLockArea: boolean;
  InIsSameNumber_SubNumber: boolean;
  InCanIgnoreVillage: string;
  InCanIgnoreNeighborhood: string;
  InReturnMaxCount: string;
  OutTotal: string;
  OutMatchType: string;
  OutMatchCode: string;
  OutTraceInfo: string;
}
