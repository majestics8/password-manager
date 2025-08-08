import './App.css'
import Manager from './component/Manager'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
function App() {

  return (
    <>
  <div className="min-h-screen flex flex-col">
    <Navbar />
    
    <div className="flex-grow bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <Manager />
    </div>
    
    <Footer />
</div>

    </>
  )
}

export default App

