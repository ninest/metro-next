import { LineList } from "@/components/line";
import { Spacer } from "@/components/spacer";
import { filterLines, getRouteTypeDisplayName, getRouteTypeFromSlug } from "@/entities/line";
import { metroApiClient } from "@/metro-api";

export default async function RouteTypePage({ params }: { params: { locationCode: string; routeTypeSlug: string } }) {
  const routeType = getRouteTypeFromSlug(params.routeTypeSlug);

  const lines = filterLines(await metroApiClient.getLinesByLocation(params));
  const linesByRouteType = lines.filter((line) => line.type === routeType);

  return (
    <>
      <h2 className="font-bold text-2xl">{getRouteTypeDisplayName(routeType)}</h2>

      <Spacer className="h-3" />

      <LineList lines={linesByRouteType} />
    </>
  );
}
