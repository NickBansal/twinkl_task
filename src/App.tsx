import Posts from "./components/posts";
import { SearchBar } from "./components/search-bar";
import { DataProvider } from "./context/dataContext";

const App = () => {
  return (
    <DataProvider>
      <div className="mx-auto my-8 lg:w-5xl w-full">
        <SearchBar />
        <Posts />
      </div>
    </DataProvider>
  );
};

export default App;
