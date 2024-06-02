import Headlines from "./components/Headlines";
function App() {
  return (
    <div className="App">
      <header className="bg-blue-500 p-4 flex justify-between items-center">
        <h1 className="text-white text-4xl font-semibold">
          DailyNews - Built using NewsAPI
        </h1>
      </header>
      <main>
        <Headlines />
      </main>
    </div>
  );
}

export default App;
