import app from './src/app.js'

const server = app.listen(app.get('port'), () => {
  console.log('Server is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'))
})

export default server
