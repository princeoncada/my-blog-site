import './App.css';
import BlogPost from "./page/BlogPost";
import Header from "./component/Header";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="App">
        <div className="container">
            <Header />
            <BlogPost />
            <Footer />
        </div>
    </div>
  );
}

export default App;
