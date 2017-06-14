/**
 * Criado por Marcus em 10/05/2017.
 */
function Player()
{
    this.x = null;
    this.y = null;
    this.width  = 64;
    this.height = 56;

    var img_nave = new Image();
    img_nave.src = 'img/nave.png';
    this.image = img_nave;
    this.tempo_do_ultimo_tiro = 0;
    this.tempo_entre_tiro = 0.100;
    this.direcao = 0;
    this.vx = 90;
}


Player.prototype.update = function (dt) {
    this.tempo_do_ultimo_tiro += dt;
}

Player.prototype.desenha = function (contexto) {
    contexto.drawImage(
        this.image,
        0,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height);
}

Player.prototype.mover = function (dt) {
    this.x = this.x + this.vx * dt * this.direcao * 2.29;
};