import { filterLines, getLineRouteTypes, getRouteTypeDisplayName } from "@/entities/line";
import { metroApiClient } from "@/metro-api";
import { routes } from "@/routes";
import { Line, RouteType } from "@/types";
import Link from "next/link";

export default async function IndexPage({ params }: { params: { locationCode: string } }) {
  const lines = filterLines(await metroApiClient.getLinesByLocation(params));
  const lineRouteTypes = getLineRouteTypes(lines);

  const metroLines = lines.filter((line) =>
    [RouteType.subway, RouteType.light_rail, RouteType.cable_tram].includes(line.type)
  );
  const busLines = lines.filter((line) => [RouteType.bus, RouteType.trolleybus].includes(line.type));
  const regionalLines = lines.filter((line) => [RouteType.rail].includes(line.type));

  return (
    <>
      <div className="space-y-3">
        {lineRouteTypes.map((routeType) => {
          return (
            <Link
              key={routeType}
              href={routes.location(params.locationCode).routeType(routeType).index()}
              className="block bg-gray-100 border p-3 rounded-md font-bold"
            >
              {getRouteTypeDisplayName(routeType)}
            </Link>
          );
        })}
      </div>
      {/* 
      <LineList lines={metroLines} />
      <Spacer className="h-5" />
      <LineList lines={regionalLines} /> */}
    </>
  );
}

