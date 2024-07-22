## Docker Build
Abra o prompt de comando e navegue até a pasta onde o arquivo Dockerfile está localizado.
Execute o comando abaixo:

`
docker build . -t nuxt:latest
`

## Docker Run
Tenha certeza que a porta 3000 não está sendo usada.

Execute o comando abaixo no prompt de comando:

`
docker run -d --name front -p 3000:3000 nuxt:latest
`

## Antes de abrir o site!

Tenha certeza que os containers para o backend e banco de dados estejam rodando e funcionando normalmente.

