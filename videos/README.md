# Vídeos em Libras

Coloque nesta pasta os vídeos gravados e revisados por uma pessoa surda ou intérprete fluente em Libras. Sugestão de nomes:

- `algoritmo-libras.mp4`
- `variavel-libras.mp4`
- `condicao-libras.mp4`
- `repeticao-libras.mp4`

## Checklist antes de usar

Grave com boa iluminação, rosto e mãos visíveis, fundo sem muita informação, enquadramento estável e velocidade confortável. Revise o sinal de cada conceito com uma pessoa fluente. Adicione legenda sincronizada e mantenha a transcrição escrita abaixo do vídeo.

## Como conectar um vídeo

No `index.html`, substitua o quadro de demonstração pelo elemento abaixo:

```html
<video controls preload="metadata" aria-label="Explicação em Libras sobre algoritmo">
  <source src="videos/algoritmo-libras.mp4" type="video/mp4">
  <track kind="captions" src="legendas/algoritmo.vtt" srclang="pt-BR" label="Português" default>
  Seu navegador não conseguiu abrir o vídeo. Leia a transcrição abaixo.
</video>
```

O arquivo de legenda deve estar em formato `.vtt`. Mesmo com vídeo e legenda, mantenha uma transcrição em texto simples na página.
