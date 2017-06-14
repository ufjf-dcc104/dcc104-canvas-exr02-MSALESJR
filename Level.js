/**
 * Criado por Marcus em 10/05/2017.
 */
function Level()
{
    this.tempo_entre_inimigos = 1;
    this.tempo_corrido_depois_que_ultimo_inimigo_foi_criado = 0;
    this.inimigos = [];
    this.tempo_corrido_desde_do_inicio_do_jogo = 0;
    this.image_inimigo = null;
    this.image_tiro = null;
    this.image_tiro_inimigo = null;

    this.tiro_player  = [];
    this.tiro_inimigo = [];
    this.player = null;
    this.pontos = 0;
    this.vidas  = 5;
}

Level.prototype.tiroPlayer = function(){
    /*** player pode dar um tipo por segundo **/
    if(this.player.tempo_do_ultimo_tiro > this.player.tempo_entre_tiro){
        var tiro = new Sprite();
        tiro.x = this.player.x + ((this.player.width / 2) - 4);
        tiro.y = this.player.y;
        tiro.width  = 7;
        tiro.height = 25;
        tiro.image  = this.image_tiro;
        tiro.vy     = -500;
        this.tiro_player.push(tiro);
        this.player.tempo_do_ultimo_tiro = 0;
    }
}

Level.prototype.tiroInimigo = function(){
    for(var i = 0; i < this.inimigos.length; i++){
        var inimigo = this.inimigos[i];
        if(inimigo.tempo_do_ultimo_tiro > inimigo.tempo_entre_tiro){
            var tiro = new Sprite();
            tiro.x = inimigo.x + ((inimigo.width / 2) - 4);
            tiro.y = inimigo.y + inimigo.height;
            tiro.width  = 7;
            tiro.height = 25;
            tiro.image  = this.image_tiro_inimigo;
            tiro.vy     = 300;
            this.tiro_inimigo.push(tiro);
            inimigo.tempo_do_ultimo_tiro = 0;
        }
    }
}

Level.prototype.run = function(dt, contexto){

    /** Verifica se esta no fim do jogo  **/
    if(this.vidas == 0){
        return false;
    }

    contexto.font = "20px Arial";
    contexto.fillText("SCORE : " + this.pontos,5,20);
    contexto.fillText("VIDAS : " + this.vidas,15,50);

    this.tempo_corrido_desde_do_inicio_do_jogo += dt;
    this.tempo_corrido_depois_que_ultimo_inimigo_foi_criado += dt;

    /*** Verifica o limite da tela a direita do player **/
    if((this.player.x + this.player.width) > 800){
        player.x = (800 - player.width);
        player.direcao = 0;
    }

    /*** Verifica o limite da tela a esquerda do player **/
    if((this.player.x) < 0){
        player.x = 0;
        player.direcao = 0;
    }

    this.tiroInimigo();

    if(this.tempo_corrido_depois_que_ultimo_inimigo_foi_criado >= this.tempo_entre_inimigos){
        var inimigo = new Sprite();
        inimigo.y = -50;
        inimigo.x = (Math.random() * 800);
        inimigo.width = 50;
        inimigo.height= 50;
        inimigo.vy = 150;
        inimigo.image = this.image_inimigo;
        inimigo.tempo_entre_tiro = 0.500 + Math.random();
        this.inimigos.push(inimigo);
        this.tempo_corrido_depois_que_ultimo_inimigo_foi_criado = 0;
    }


    contexto.fillStyle = "#1C1C1C";

    for(var i = 0; i < this.inimigos.length; i++){
        var inimigo = this.inimigos[i];
        inimigo.mover(dt);
        inimigo.desenha(contexto);
    }

    for(var t = 0; t < this.tiro_player.length; t++){
        var tiro = this.tiro_player[t];
        tiro.mover(dt);
        tiro.desenha(contexto);
    }

    for(var t = 0; t < this.tiro_inimigo.length; t++){
        var tiro = this.tiro_inimigo[t];
        tiro.mover(dt);
        tiro.desenha(contexto);
    }

    this.check();
    this.colisaoEntreObjetos();
    return true;
}

Level.prototype.colisaoEntreObjetos = function(){
    /**** Colisao inimigo com tiro do player **/
    for(var i = 0; i < this.tiro_player.length; i++ ){
        var tiro = this.tiro_player[i];
        for(var j = 0; j < this.inimigos.length; j++){
            var inimigo = this.inimigos[j];
            if(this.colidiu(tiro,inimigo)){
                this.pontos += 100;
                this.tiro_player.splice(i,1);
                this.inimigos.splice(j,1);
            }
        }
    }

    /**** Colisao inimigo com tiro do player **/
    for(var i = 0; i < this.tiro_inimigo.length; i++ ){
        var tiro = this.tiro_inimigo[i];
        for(var j = 0; j < this.inimigos.length; j++){
            var inimigo = this.inimigos[j];
            if(this.colidiu(tiro,inimigo)){
                this.pontos += 100;
                this.tiro_inimigo.splice(i,1);
                this.inimigos.splice(j,1);
            }
        }
    }

    /*** Colisao entre inimigo e Player ***/
    for(var j = 0; j < this.inimigos.length; j++){
        var inimigo = this.inimigos[j];
        if(this.colidiu(player,inimigo)){
            this.vidas -= 1;
            this.inimigos.splice(j,1);
        }
    }

    /*** Colisao entre tiro inimigo e Player ***/
    for(var j = 0; j < this.tiro_inimigo.length; j++){
        var inimigo = this.tiro_inimigo[j];
        if(this.colidiu(player,inimigo)){
            this.vidas -= 1;
            this.tiro_inimigo.splice(j,1);
        }
    }
}

Level.prototype.colidiu = function (objeto1, objeto2) {
    if(objeto1.x + objeto1.width < objeto2.x) return false;
    if(objeto1.x > objeto2.x + objeto2.width) return false;
    if(objeto1.y + objeto1.height < objeto2.y) return false;
    if(objeto2.y + objeto2.height < objeto1.y) return false;
    return true;
}

Level.prototype.check = function(){
    /*** Remove inimigo */
    for(var i = 0; i < this.inimigos.length; i++){
        var inimigo = this.inimigos[i];
        if(inimigo.y > 615){
            this.inimigos.splice(i,1);
        }
    }
    /*** Remove tiro player **/
    for(var t = 0; t < this.tiro_player.length; t++){
        var tiro = this.tiro_player[t];
        if(tiro.y < -30){
            this.tiro_player.splice(t,1);
        }
    }

    /*** Remove tiro player **/
    for(var t = 0; t < this.tiro_inimigo.length; t++){
        var tiro = this.tiro_inimigo[t];
        if(tiro.y > 700){
            this.tiro_inimigo.splice(t,1);
        }
    }
}