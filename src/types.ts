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
  shortName: string;
  longName: string;
  color: string;
  type: RouteType;
};

export type Direction = {
  id: string;
  name: string;
  destination: string;
  stops: { id: string; parentStation: string }[];
  order: { [key: string]: string[] };
};

export type Stop = {
  id: string;
  name: string;
  url: null | string;
  address: null | string;
  parentStation: null | string;
};
