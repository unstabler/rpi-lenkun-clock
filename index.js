const SDL2 = require('node-sdl2');
const Application = SDL2.app;
const Window = SDL2.window;
const Image = SDL2.image;
const Font = SDL2.font;

const SCREEN_WIDTH  = 480;
const SCREEN_HEIGHT = 320;


const backgroundImage = new Image(__dirname + '/background.png'); 
const font = new Font(__dirname + '/goyangNJ.ttf', 32);


const mainWindow = new Window({ w: SCREEN_WIDTH, h: SCREEN_HEIGHT, borderless: true });

const draw = () => {
    const { render } = mainWindow;
    const { outputSize } = render;

    render.fillRect([[0, 0, SCREEN_WIDTH, SCREEN_HEIGHT]]);
    render.copy(backgroundImage.texture(render), null, [0, 0, outputSize.w, outputSize.h]);

    // 시간 표시
    const currentTime = new Date().toLocaleTimeString();
    const fontSize = font.getSize(currentTime);
    const text = font.blend(currentTime, 0xffffff);
    render.copy(text.texture(render), null, [outputSize.w - fontSize.w - 8, 0, fontSize.w, fontSize.h]);
    // 새 프레임 렌더
    render.present();
};


function renderText(render, text, x, y, color = 0x000000) {
    let offsetY = 0;
    text.split("\n").forEach((line) => {
        const textSize = font.getSize(line);
        const text = font.blend(line, color);
        render.copy(text.texture(render), null, [x, y + offsetY, textSize.w, textSize.h]);
        offsetY += textSize.h;
    });
}

mainWindow.on('close', () => {
    Application.quit();
});

mainWindow.on('change', () => {
    draw();
});

setInterval(() => draw(), 1000 / 60);