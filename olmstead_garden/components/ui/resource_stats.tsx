const stats = [
    { name: 'Total Plots', value: '8' },
    { name: 'Total Water', value: '50 gals'},
    { name: 'Total Daylight', value: '1000 hours' },
    { name: 'Total Fertalizer', value: '1000 ml' },
  ]
  
export default function ResourceStats() {
    return (
      <div className="bg-primary-dark">
        <div className="max-w-7xl pb-10">
          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-primary-dark px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
                <p className="mt-2 flex items-baseline gap-x-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}  