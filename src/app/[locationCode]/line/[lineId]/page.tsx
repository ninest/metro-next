import { DirectionDisplay } from "@/app/[locationCode]/line/[lineId]/direction";
import { Spacer } from "@/components/spacer";
import { metroApiClient } from "@/metro-api";

export default async function LinePage({
  params,
  searchParams,
}: {
  params: { locationCode: string; lineId: string };
  searchParams: { direction: string };
}) {
  const line = await metroApiClient.getLine({ locationCode: params.locationCode, routeId: params.lineId });
  const stops = await metroApiClient.getStops({ locationCode: params.locationCode });

  const directionIds = Object.keys(line.directions);
  const directions = Object.values(line.directions);

  const currentDirectionId = searchParams.direction ?? directionIds[0];

  return (
    <>
      <div style={{ color: `#${line.textColor}`, backgroundColor: `#${line.color}` }} className="rounded">
        <h2 className="font-bold text-2xl">{line.shortName} {line.longName}</h2>
      </div>

      <Spacer className="h-5" />

      <DirectionDisplay
        locationCode={params.locationCode}
        line={line}
        currentDirectionId={currentDirectionId}
        directions={directions}
        stops={stops}
      />
    </>
  );
}
