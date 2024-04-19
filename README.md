# Scrapper UFSM

### Extrator feito para fazer raspagem de dados dos eventos da universidade federal de santa maria

- Foi feito inteiramente em TypeScript com nodeJs
  - Para a extração de dados foi utilizada a lib cheerio
    - `npm install cheerio`
  - Para a integração com o banco de dados foi utilizada a lib TypeOrm
    - `npm install typeorm --save`
    - `npm install reflect-metadata --save`
    - `npm install pg --save`
  - Para a execução do projeto TS utilizando node, foi utilizado o executor tsx
    - `npm install --save-dev tsx`
- Para a execução deste projeto é necessario o seguinte comando
  - `tsx getEvents.ts`
- Em SQL a consulta para o retorno de dos dados em demonstração em conjunto é a seguinte
  - `SELECT *
    FROM events e
    INNER JOIN events_to_local el ON e.event_id = el.event_id
    INNER JOIN local l ON l.local_id = el.local_id
    INNER JOIN events_to_types et ON e.event_id = et.event_id
    INNER JOIN type_events te ON te.types_id = et.types_id
    ORDER BY e.date_initial DESC;
    `