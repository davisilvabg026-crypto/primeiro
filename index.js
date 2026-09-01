import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js'; // rotas externas
import alunoRoutes from './routes/AlunoRoutes.js'; // rotas externas
import cursoRoutes from './routes/CursoRoutes.js'; // rotas externas
import pratoRoutes from './routes/PratoRoutes.js';
import reservaRoutes from './routes/ReservaRoutes.js';

const PORT = 3000
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas
app.use(alunoRoutes)
app.use(cursoRoutes)
app.use(pratoRoutes)
app.use(reservaRoutes)
app.use(routes)
app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
// Exporta o handler compatível com Vercel
export default app;