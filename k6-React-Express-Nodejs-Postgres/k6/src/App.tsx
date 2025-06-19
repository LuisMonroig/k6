import './App.css'
import Page from "./pages/k6Page"

function App() {
  return (
    <>
      <div className='text-5xl'> K6</div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <Page></Page>
        </div>
      </div>    
    </>
  )
}

export default App
