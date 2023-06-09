import Head from 'next/head'
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const chatRef = useRef(null)
  const socketRef = useRef({ emit: () => {} })

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token')
    if (!storedToken) {
      router.push('/login')
    }

    if (storedToken) {
      setToken(storedToken)
      const newSocket = io(process.env.NEXT_PUBLIC_WS_URL, { query: { token: storedToken } })
      socketRef.current = newSocket
      newSocket.on('message', (message) => {
        setChat((chat) => [...chat].concat(message))
      })
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  const handleSendMessage = (e) => {
    e.preventDefault()
    const event = { token, message }
    socketRef.current.emit('message', event)
    setMessage('')
  }

  return (
    <>
      <Head>
        <title>Edutech</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='container-fluid'>
          <div className='row my-4'>
            <div className='col-12 col-md-8 mb-3 mb-md-0'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Clase de hoy: Ayra Starr - Rush</h5>
                  <div className='ratio ratio-16x9'>
                    <iframe
                      src='https://www.youtube-nocookie.com/embed/crtQSTYWtqE?controls=0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-4'>
              <div className='card h-100'>
                <div className='card-header'>
                  <h5 className='card-title mb-0'>Chat</h5>
                </div>
                <div className='card-body'>
                  {chat && <Chat msgRef={chatRef} messages={chat} />}
                  <div className='bd-highlight align-items-end'>
                    <form onSubmit={handleSendMessage}>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          id='message'
                          name='message'
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          autoComplete='off'
                          placeholder='Escribe tu mensaje'
                          required
                        />
                        <label htmlFor='message'>Mensaje</label>
                      </div>
                      <div className='d-grid'>
                        <button type='submit' className='btn btn-primary'>
                          Enviar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function Chat({ msgRef, messages }) {
  const [msgs, setMsgs] = useState(null)

  useEffect(() => {
    setMsgs((msgs) => messages)

    return () => {
      setMsgs(null)
    }
  }, [messages])

  return (
    <div
      className='overflow-auto d-flex flex-column flex-grow-1'
      style={{
        maxHeight: 'calc(88vh - 210px)',
        minHeight: 'calc(88vh - 210px)',
        marginBottom: 'auto'
      }}
      ref={msgRef}>
      {msgs &&
        msgs.map((msg, index) => (
          <div key={index} className='mb-2'>
            <h6 className={`mb-1 small text-${msg.user.typeId === 1 ? 'warning' : 'primary'}`}>
              {`${msg.user.userName}`}
              {msg.typeId === 1 && <small className='text-muted'> moderador</small>}
            </h6>
            <p className='mb-0 mt-1'>{msg.message}</p>
          </div>
        ))}
    </div>
  )
}
