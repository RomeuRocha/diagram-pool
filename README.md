# Lib para Criação de Diagramas com SVG

### Abra esse documento em um leitor de markdown

![Diagrama](https://github.com/RomeuRocha/diagram-pool/assets/62400878/65eef68f-f780-4c57-8b7f-c0966ad9c136)

## Gerenciador de Pacotes NPM

## Instalação

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu sistema.
2. Verifique se o npm (Node Package Manager) já está instalado usando o comando:

    ```bash
    npm -v
    ```

3. Se o npm não estiver instalado, instale-o com o comando:

    ```bash
    npm install -g npm
    ```

## Como Executar

1. Rode o comando:

    ```bash
    npm run build
    ```

2. Abra os arquivos de demonstração "index.html".

    ```html
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>Diagrama SVG</title>
    </head>
    <body>
        <div id="svg-container"></div>

        <script>
            const container = document.getElementById('svg-container');
            if (container) {
                const diagram = new myLibrary.Diagram({ container });

                // Criando um DiagramElement (nesse caso, um retângulo)
                const rectangle = new myLibrary.Rectangle('rect1', 50, 50, 200, 100, 'blue', 'black');
                
                const circle = new myLibrary.Circle('circle1', 160, 160, 60, 'red', 'black');

                const diamond = new myLibrary.Diamond('Diamond1', 300, 300, 300, 'orange', 'black');

                // Adicionando o DiagramElement ao diagrama
                diagram.addElement(rectangle);
                diagram.addElement(circle);
                diagram.addElement(diamond);
            }
        </script>
    </body>
    </html>
    ```
