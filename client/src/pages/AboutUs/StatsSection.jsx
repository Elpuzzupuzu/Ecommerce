import React from "react";
import StatCard from "./StatCard";

const StatsSection = ({ stats = [], getAnimationClass = () => "" }) => (
  <section className="py-16 px-6 bg-white border-t border-gray-100">
    <div className="max-w-6xl mx-auto">
      {/* Grid de métricas */}
      <div
        className={`grid grid-cols-2 lg:grid-cols-4 gap-10 ${getAnimationClass(
          "stats",
          "scale-in"
        )}`}
        data-animate
        id="stats"
      >
        {stats.map((stat, index) => {
          const { key, ...rest } = stat;
          return <StatCard key={key || index} {...rest} />;
        })}
      </div>
    </div>
  </section>
);

export default StatsSection;
