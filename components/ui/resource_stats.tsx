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
    <div className="bg-primary-dark">
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-primary-dark px-4 py-6 sm:px-6 lg:px-8">
              <p className="text-sm font-medium leading-6 header-primary-dark">{stat.name}</p>
              <p className="mt-2 flex gap-x-2 flex-col">
                <span className="text-4xl font-semibold tracking-tight text-white">
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