# CalcTeyvat

Calculadora local para **Genshin Impact**, com foco em materiais, Mora, EXP, armas, talentos, artefatos, resina, gemas, times, elenco proprio e guia diario.

Este projeto foi desenvolvido **100% por IA** com apoio do Codex, como uma ferramenta open source para jogadores que queiram organizar progresso e recursos no proprio computador.

> Projeto de fã, sem afiliacao oficial com HoYoverse, Cognosphere ou Genshin Impact.

## Como Executar

Abra um terminal nesta pasta e rode:

```powershell
python -m http.server 5173
```

Depois acesse:

```text
http://127.0.0.1:5173
```

Tambem funciona abrindo `index.html` diretamente no navegador, mas o servidor local costuma evitar bloqueios de API e imagens.

## Recursos

- Calculadora de personagem, talentos, armas, artefatos, resina e gemas.
- Materiais faltantes em cartoes visuais com progresso e quantidade pendente.
- Busca de personagens e armas usando a API publica `genshin.jmp.blue` quando houver internet.
- Personagens recentes mantidos tambem como extras locais quando ainda nao existem na API.
- Times e composicoes com sugestoes de artefatos, atributos principais e subatributos.
- Montagem manual de times com avaliacao de sinergia.
- Elenco proprio com cadastro de personagens, niveis, talentos, armas e sugestoes de times possiveis.
- Guia diario com comissoes, resina, eventos, missoes por nacao, prioridade, recompensas e check de concluido.
- Dados salvos localmente no `localStorage` do navegador.

## Estrutura

```text
index.html   Estrutura da pagina
styles.css   Estilos e responsividade
app.js       Dados, calculos e interacoes
README.md    Documentacao do projeto
LICENSE      Licenca open source
```

## Licenca

Distribuido sob a licenca MIT. Veja [LICENSE](LICENSE).
