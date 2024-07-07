#lib para criação de diagramas com svg

![image](https://github.com/RomeuRocha/diagram-pool/assets/62400878/65eef68f-f780-4c57-8b7f-c0966ad9c136)

##Como executar

1.  rode o comando npm run build
2.   abra os arquivos de demonstração

    `<script>
        const container = document.getElementById('svg-container');
        if (container) {
            const diagram = new myLibrary.Diagram({ container });

            // Criando um DiagramElement (nesse caso, um retângulo)
            const rectangle = new myLibrary.Rectangle('rect1', 50, 50, 200, 100, 'blue', 'black');
            
            const circle = new myLibrary.Circle('circle1',160,160,60,'red','black');

            const diamond = new myLibrary.Diamond('Diamond1', 300,300,300,'orange','black');
           

            // Adicionando o DiagramElement ao diagrama
            diagram.addElement(rectangle);
            diagram.addElement(circle);
            diagram.addElement(diamond);
        }
    </script>
`
