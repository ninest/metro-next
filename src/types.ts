export enum RouteType {
  light_rail = 0,
  subway = 1,
  rail = 2,
  bus = 3,
  ferry = 4,
  cable_tram = 5,
  aerial_lift = 6,
  funicular = 7,
  trolleybus = 11,
  monorail = 12,
}

export type Line = {
  id: string;
  longName: string;
  color: string;
  type: RouteType;
};
