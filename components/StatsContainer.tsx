"use client";

import { useQuery } from "@tanstack/react-query";
import { getStatsAction } from "@/utils/actions";
import StatsCard, { StatsLoadingCard } from "./StatsCard";

const StatsContainer = () => {
  const { data, isPending } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  if (isPending)
    return (
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
      </div>
    );

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCard title="trabajos pendientes" value={data?.pending || 0} />
      <StatsCard title="entrevistas citadas" value={data?.interview || 0} />
      <StatsCard title="trabajos rechazados" value={data?.declined || 0} />
    </div>
  );
};

export default StatsContainer;
