import cx from 'classnames'
import styles from '../styles/Login.module.css'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

const setSessionData = (data) => {
  for (const [key, value] of Object.entries(data)) {
    console.log(key, value)
    sessionStorage.setItem(key, value)
  }
}

export default function Login() {
  const router = useRouter()
  const [user, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password })
    })
    const data = await res.json()
    if (data.token) {
      setSessionData(data)
      router.push('/')
    }
    setMessage(data.message)
  }

  return (
    <>
      <Head>
        <title>Iniciar sesión</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <main className={cx(styles['form-longin'], 'text-center', 'mt-5')}>
        <form onSubmit={handleSubmit}>
          <h1 className='h3 mb-3 fw-normal'>Iniciar sesión</h1>

          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='floatingInput'
              placeholder='Ingresa tu nombre de usuario'
              value={user}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='floatingInput'>Nombre de usuario</label>
          </div>
          <div className='form-floating'>
            <input
              type='password'
              className='form-control'
              id='floatingPassword'
              placeholder='Ingresa tu contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor='floatingPassword'>Contraseña</label>
          </div>

          {message && <p>{message}</p>}

          <div className={cx(styles.checkbox, 'mb-3')}>
            <label>
              <input type='checkbox' value='remember-me' /> Recordar mi nombre de usuario
            </label>
          </div>
          <button className='w-100 btn btn-lg btn-primary' type='submit'>
            INICIAR SESIÓN
          </button>
        </form>
      </main>
    </>
  )
}
