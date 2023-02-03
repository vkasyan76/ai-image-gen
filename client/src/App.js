import React, { useState } from 'react'
import './index.css'
import './spinner.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState('medium')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt) {
      alert('Please add some text')
      return
    }

    setLoading(true)
    setMessage('')
    setImage('')

    try {
      const response = await fetch(
        'http://localhost:5000/openai/generateimage',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            size,
          }),
        },
      )

      if (!response.ok) {
        throw new Error('That image could not be generated')
      }

      const data = await response.json()
      const imageUrl = data.data

      // console.log(imageUrl)

      setImage(imageUrl)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <header>
        <div className="navbar">
          <div className="logo">
            <h2> OpenAI Image Genrator </h2>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <a
                  href="https://beta.openai.com/docs"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  OpenAI API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main>
        <section className="showcase">
          <form id="image-form" onSubmit={handleSubmit}>
            <h1> Describe An Image </h1>
            <div className="form-control">
              <input
                type="text"
                id="prompt"
                placeholder="Enter Text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="form-control">
              <select
                name="size"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="small"> Small </option>
                <option value="medium"> Medium </option>
                <option value="large"> Large </option>
              </select>
            </div>
            <button type="submit" className="btn">
              Generate
            </button>
          </form>
        </section>
        <section className="image">
          <div className="image-container">
            <h2 className="msg">{message}</h2>
            {/* <img src="" alt="" id="image" /> */}
            {image ? <img src={image} alt="" /> : null}
          </div>
        </section>
      </main>
      {loading ? (
        <div className="spinner show"></div>
      ) : (
        <div className="spinner"></div>
      )}
      {/* <div className="spinner"> </div> */}
    </div>
  )
}

export default App
