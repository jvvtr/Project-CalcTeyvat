# CalcTeyvat

Planejador local para **Genshin Impact**, com foco em transformar objetivos de personagens em uma agenda diaria de farm.

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

Tambem funciona abrindo `index.html` diretamente no navegador, mas o servidor local costuma ocorrer bloqueios de API e imagens.

## Recursos

- Bússola de progresso com múltiplos personagens.
- Agenda diaria com indicação de resina, chefes, dominios de talento, linhas ley de Mora e linhas ley de EXP.
- Materiais faltantes agregados por todos os objetivos selecionados.
- Simulador de status com artefatos informados manualmente.
- Recomendação de set, atributos principais e subatributos de artefatos por personagem.
- Busca de personagens e armas usando a API publica `genshin.jmp.blue` quando houver internet.
- Personagens recentes mantidos tambem como extras locais quando ainda nao existem na API.
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
