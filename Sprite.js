/**
 * Criado por Marcus em 10/05/2017.
 */
function Sprite()
{
    this.x = 800;
    this.y = 0;
    this.width  = 50;
    this.height = 50;
    this.vy     = 90;
    this.image  = null;

    this.tempo_do_ultimo_tiro = 0;
    this.tempo_entre_tiro = 0.100;
}

Sprite.prototype.desenha = function (contexto) {
    /***if(this.image === null)
        contexto.fillRect(this.x, this.y, this.width, this.height);
    else{
        contexto.drawImage(this.image,this.x,this.y);
        contexto.strokeRect(this.x, this.y, this.width, this.height);
    }***/
    contexto.drawImage(this.image,this.x,this.y);
};

Sprite.prototype.mover = function (dt) {
    this.tempo_do_ultimo_tiro += dt;
    this.y = this.y + this.vy * dt;
};