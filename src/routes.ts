import { getRouteTypeSlug } from "@/entities/line";
import { RouteType } from "@/types";

export const routes = {
  location: (locationCode: string) => ({
    index: () => `/${locationCode}`,
    routeType: (routeType: RouteType) => ({
      index: () => `/${locationCode}/${getRouteTypeSlug(routeType)}`,
    }),
    line: (lineId: string) => ({
      index: () => `/${locationCode}/line/${lineId.toLowerCase()}`,
      direction: (directionId: string) => `/${locationCode}/line/${lineId.toLowerCase()}?direction=${directionId}`,
    }),
  }),
};
