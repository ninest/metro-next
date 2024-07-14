import { metroApiClient } from "@/metro-api";
import { Line, RouteType } from "@/types";

export function filterLines(lines: metroApiClient.Line[]): Line[] {
  return lines.filter(hasLongName);
}

function hasLongName(line: metroApiClient.Line): line is metroApiClient.Line & { longName: string } {
  return line.longName !== undefined && line.longName !== null;
}

export function getLineRouteTypes(lines: Line[]): RouteType[] {
  return [...new Set(lines.map((line) => line.type))].toSorted();
}

export function getRouteTypeDisplayName(routeType: RouteType) {
  const display: Record<RouteType, string> = {
    [RouteType.light_rail]: "Light Rail",
    [RouteType.subway]: "Subway",
    [RouteType.rail]: "Rail",
    [RouteType.bus]: "Bus",
    [RouteType.ferry]: "Ferry",
    [RouteType.cable_tram]: "Cable Tram",
    [RouteType.aerial_lift]: "Air Lift",
    [RouteType.funicular]: "Funicular",
    [RouteType.trolleybus]: "Trolleybus",
    [RouteType.monorail]: "Monorail",
  };
  return display[routeType];
}

const routeTypeSlugs: Record<RouteType, string> = {
  [RouteType.light_rail]: "light-rail",
  [RouteType.subway]: "subway",
  [RouteType.rail]: "rail",
  [RouteType.bus]: "bus",
  [RouteType.ferry]: "ferry",
  [RouteType.cable_tram]: "cable-tram",
  [RouteType.aerial_lift]: "air-lift",
  [RouteType.funicular]: "funicular",
  [RouteType.trolleybus]: "trolleybus",
  [RouteType.monorail]: "monorail",
};
export function getRouteTypeSlug(routeType: RouteType) {
  return routeTypeSlugs[routeType];
}

const slugToRouteType: Record<string, RouteType> = Object.fromEntries(
  Object.entries(routeTypeSlugs).map(([key, value]) => [value, parseInt(key) as unknown as RouteType])
);

export function getRouteTypeFromSlug(slug: string) {
  return slugToRouteType[slug];
}
