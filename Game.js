/**
 * Criado por Marcus em 10/05/2017.
 */
var tela     = null;
var contexto = null;
var player   = null;
var level    = null;
var atual    = new Date();
var anterior = new Date();
var dt       = 0;
var inicia_jogo = false;

function init(){

    tela = document.getElementById('tela');
    contexto = tela.getContext('2d');

    player = new Player();
    player.x  = 200;
    player.y  = 540;
    player.desenha(contexto);

    level = new Level();
    level.player = player;
    var img_inimigo = new Image();
    img_inimigo.src = 'img/inimigo.png';
    level.image_inimigo = img_inimigo;

    var img_tiro = new Image();
    img_tiro.src = 'img/tiro.png';
    level.image_tiro = img_tiro;

    var img_tiro_inimigo = new Image();
    img_tiro_inimigo.src = 'img/tiro_inimigo.png';
    level.image_tiro_inimigo = img_tiro_inimigo;

    initControls();
    requestAnimationFrame(drawFrame);
 }

 function drawFrame(){
    requestAnimationFrame(drawFrame);
    atual = new Date();
    dt = (atual  - anterior) / 1000 ;
    contexto.clearRect(0,0, tela.width, tela.height);

    if(inicia_jogo){
        if(!level.run(dt,contexto)){
            alert("Fim de Jogo");
            location.reload();
        }
    }else{
        contexto.font = "50px Arial";
        contexto.strokeText("Space Shooter",250,250);
        player.x = 380;
        player.y = 280;
        contexto.font = "15px Arial";
        contexto.strokeText("Aperte ENTER para INICIAR",280,380);
    }

    player.update(dt);
    player.mover(dt);
    player.desenha(contexto);
    anterior = atual;
 }

function initControls(){
    document.addEventListener('keydown', function(e){
       switch(e.keyCode){
           case 32 :
               level.tiroPlayer(player);
               break;

           case 37 :
               player.direcao = -1;
               break;

           case 39 :
               player.direcao = +1;
               break;

           case 13 :
               if(!inicia_jogo){
                   inicia_jogo = true;
                   player.y = 600 - player.height - 5;
               }
               break;
       }
    });

    document.addEventListener('keyup', function(e){
        switch(e.keyCode){
            case 37 :
                player.direcao = 0;
                break;

            case 39 :
                player.direcao = 0;
                break;
        }
    });
}
