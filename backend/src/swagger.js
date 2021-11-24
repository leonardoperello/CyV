const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['src/routers/empleado.js', 'src/routers/cliente.js', 'src/routers/estado.js', 'src/routers/operario.js', 'src/routers/orden.js', 'src/routers/oti.js', 'src/routers/rosca.js', 'src/routers/sector.js', 'src/routers/supervisor.js', 'src/routers/tarea.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./index.js')
})