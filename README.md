# edutech-chat: Ejercicio práctico

**Contexto:** El equipo académico de Kuepa ofrece streaming de sus clases virtuales en el
LMS de la organización, que están disponibles solo para estudiantes. En estos streaming
los estudiantes pueden visualizar un video mientras el docente dicta la clase.

**Objetivo:** Como equipo académico se quiere brindar una herramienta de chat a las clases
virtuales que permita la interacción entre los participantes y el moderador de la clase.

**Criterios de aceptación:**
- [x] Un estudiante debe poder interactuar con los demás participantes a través de
mensajes del chat.
- [x] Los mensajes del chat que ven los participantes deben actualizarse sin requerir la
recarga de la pantalla.
- [x] Los mensajes del chat deben indicar claramente quién escribió el mensaje y datos
relevantes.
- [x] Debe identificarse en los mensajes del chat de forma clara quién es el moderador.
- [x] Los mensajes del chat debe almacenarse en un sistema de persistencia de datos
que facilite su consulta.
- [x] Solamente estudiantes identificados (logueados) pueden ingresar a las clases
virtuales y hacer uso del chat.

> Herramientas utilizadas: Node.js, Socket.io, Next.js, PostgreSQL
