export default function ResourceStats({stats}:{stats: {name: string, value: string | number}[]}) {

  function formatStat({name, value}: {name: string, value: string | number}) {
    switch(name) {
      default:
        return value;
      case ('Temperature'):
        return `${value} °F`;
      case ('Fertility'):
        return `${value} ppm`;
      case ('pH'):
        return `${value}`;
      case ('Moisture'):
        return `${value} %`;
      case ('Total Water'):
        return `${value} gals`;
      case ('Total Daylight'):
        return `${value} hours`;
      case ('Total Fertalizer'):
        return `${value} ml`;
    }
  }

  return (
    <div className="custom-bg-background">
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="flex flex-col justify-start py-6">
              <p className="text-sm font-medium leading-6 header-header">{stat.name}</p>
              <p className="mt-2 flex gap-x-2 flex-col">
                <span className="text-4xl font-semibold tracking-tight custom-text ">
                  {formatStat({name:stat.name,value:stat.value})}
                </span>
              </p> 
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}  