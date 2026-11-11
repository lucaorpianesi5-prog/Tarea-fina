<p align="center"><img src="assets/logo.svg" alt="Tarea Fina" width="200"></p>

# Tarea Fina

Juego para jugar entre amigos, en persona: la app tira una frase al azar y hay que adivinar de qué tema y de qué disco es. Después se debate de dónde viene y se revela la respuesta.

Cubre la discografía de **Los Redondos** y de **Los Fundamentalistas del Aire Acondicionado**.

**Jugar:** https://lucaorpianesi5-prog.github.io/Tarea-fina/

## Cómo se juega

Elegí si querés frases de Los Redondos, de Los Fundamentalistas o de las dos, y un modo:

- **Libre:** tocá **Otra frase**, debatan de qué tema y disco es, y tocá **Revelar** para ver la respuesta. Los puntos se suman a mano.
- **Equipos (con timer):** el celu va en el medio y la pantalla se parte en dos, una mitad por equipo (la de enfrente aparece dada vuelta). Corre el tiempo y el equipo que toca primero su mitad frena el timer y responde en voz alta. Después se revela la respuesta y se marca si acertó: si acertó suma un punto. Si se acaba el tiempo, se revela y se pasa a la siguiente.
- **Jugadores (con timer):** igual, pero con un solo pulsador para todos. Quien frena lo marca en la lista de jugadores y responde.

El tiempo por frase se elige antes de arrancar (de 10 a 60 segundos). Si alguien toca sin querer, se puede seguir corriendo el timer.

No se repite ninguna frase hasta agotar la ronda.

## Frases del juego

Las frases base viven en [`data/frases.tsv`](data/frases.tsv) y las ve cualquiera que abra el link. Es un archivo de texto con una frase por fila y cinco columnas separadas por tabulaciones:

```
Banda	Disco	Año	Canción	Frase
```

- **Banda**: `Los Redondos` o `Los Fundamentalistas del Aire Acondicionado`.
- **Disco / Año / Canción**: tal como aparecen en el desplegable de la app.

Para agregar frases al juego de todos, editá ese archivo y subí el cambio.

### Frases propias en cada dispositivo

Desde el botón **＋** de la app cualquiera puede sumar frases. Esas quedan **solo en su navegador**, no se suben a ningún lado. La misma pantalla tiene una caja de **backup** editable para copiar el banco completo o pegar uno de otro dispositivo (**Actualizar**). Las frases base del repo siempre se mantienen.

## Desarrollo

Es un único `index.html` (HTML + CSS + JS, sin dependencias ni build). Para probarlo en local hace falta servirlo por HTTP, porque el navegador no deja leer `data/frases.tsv` desde un archivo abierto directamente:

```bash
python3 -m http.server 8000
```

Después abrí http://localhost:8000.

## Aviso

Proyecto de fans, sin relación con las bandas ni con sus sellos. Las letras y las obras de arte pertenecen a sus autores.
