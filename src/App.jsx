import "./App.css";
import CustomCard from "./components/Card/CustomCard";

function App() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100%", height: "100vh" }} // Define a altura total da tela
    >
      <CustomCard />
    </div>
  );
}

export default App;
