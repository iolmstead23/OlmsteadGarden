export default function Home() {
  return (
    <div className="pt-10 flex min-h-screen sm:w-screen flex-col items-center bg-background">
      <div className="flex flex-wrap w-5/6 flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-text drop-shadow-lg">Welcome to the Garden</h1>
        <p className="text-lg text-text drop-shadow-lg">
          <span>Your one stop shop for all things gardening</span>
          <br />
          <span>Weather Updates*</span>
        </p>
          
      </div>
    </div>
  );
}
