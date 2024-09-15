export default function ResourceStats({
  stats,
}: {
  stats: { name: string; value: string | number }[];
}) {
  function formatStat({
    name,
    value,
  }: {
    name: string;
    value: string | number;
  }) {
    switch (name) {
      default:
        return value;
      case "Temperature":
        return `${value} °F`;
      case "Fertility":
        return `${value}`;
      case "pH":
        return `${value}`;
      case "Moisture":
        return `${value} %`;
      case "Total Water":
        return `${value}`;
      case "Total Daylight":
        return `${value}`;
      case "Total Fertilizer":
        return `${value}`;
    }
  }

  return (
    <div>
      <div className="flex flex-col max-w-7xl lg:w-full">
        <div className="flex flex-row flex-wrap gap-10 justify-start">
          {stats.map((stat, index: number) => (
            <div
              key={index}
              className="flex flex-col py-5 items-start w-[35%] lg:w-1/6 custom-header"
            >
              <p className="text-sm font-medium leading-6">{stat.name}</p>
              <p className="mt-2 flex gap-x-2 flex-col">
                <span className="text-4xl font-semibold tracking-tight custom-text">
                  {formatStat({ name: stat.name, value: stat.value })}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
