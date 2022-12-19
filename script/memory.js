
let case_concernee = document.querySelectorAll(".card");
/* console.log(case_concernee); */

let nb_case =  4; // doit être un multiple de 4
let val_temps = 40 ;

let index_case ;
let index_img ;
let img_alea ;

let click1_img ;
let click1_index ;
let click2_img ;
let click2_index ;
let nb_click = 0 ;

let pseudo = "";
let id_interval ; // variable pour la fct setInterval
let score = 0 ;
let count_hidden_false = 0;

const timerElement = document.getElementById("timer");
let temps = timerElement.innerHTML;
let el_pseudo_grille = document.getElementById("pseudo_grille");


let tab_index_case = []; // le tableau qui est alimenté lors de la fonction initialisationPlateau [[1;img_1],[15,img_1], ....]
let tab_alea =[];
let tab_img = []; // voir fonction initialisationPlateau
let tabCartes ; // Objet HTML qui représentera les cards une fois la grille créée;




/* *************** LANCEMENT DES FCTS *****************/

let elt_score = document.getElementById("score");
initialisationPlateau();
// la fct InitialisationPlateau appelle :
/* nbAleaUnik(); */
/* grille(tab_index_case); */ 
/* cardClicked() */

/* *************** LANCEMENT DES FCTS --- FIN *********/





// Fonction qui renvoie un nombre aléatoire pioché entre 1 et nombre d'avatars (longueur du tableau).
// Afin de déterminer un avatar de manière aléatoire
function alea_choix_img()
{
    let index_img = Math.floor(Math.random()*tab_img.length);  
    return index_img;
}

function grille(sorted_tab_index_case)
{
    let chaine = "";
    let sorted_tab = sorted_tab_index_case;

    let div_container = document.getElementsByClassName("grille");
    // on transforme le HTMLCollector en Tableau pour pouvoir le parser
    let container_item = [].map.call(div_container, item => item); 
    

    let n=0; //artifice s'incrémente en fin de boucle de +4
    for (let j=0; j<nb_case/4 ; j++)// 
    {    
        chaine += 
        "<div class=\"row\">" ;

        for (let i=0; i<4; i++) // 4 colonnes par ligne : toujours
        {
            chaine += 
                "<div class=\"col-6 custom\">"+
                    "<div class=\"container-card\">"+
                        "<div id="+(n+i)+" class=\"card\">"+
                            "<div class=\"side side--front\" id=\"case_"+(n+i)+"_f\">"+
                                "<img src='images/codi.png' alt=\"\">"+
                            "</div>\n"+
                            "<div class=\"side side--back\" id=\"case_"+(n+i)+"_b\" hidden = true>"+
                                "<img src='images/"+sorted_tab[n+i][1]+".png' alt=\"\">"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"            
            ;
        }
        chaine += "</div>";
        n = n+4;
    }
    container_item.forEach(function(item, index)
    {
        item.innerHTML= chaine;
    }
    );    

    tabCartes = document.querySelectorAll(".card"); 
    return tabCartes ;
    /* console.log(chaine); */
}

function cardClicked(){    

    console.log("cardClicked()", tabCartes)

    for (let i=0; i<tabCartes.length; i++){    

    
        tabCartes[i].addEventListener("click", function(){

            if (tabCartes[i].lastChild.hidden == true) {

                tabCartes[i].lastChild.hidden = false;// au click la carte back (last child) n'est plus masquée 

                let verif_match = false ;
                console.log("card clicked !!! nb click :", nb_click)
                console.log(tabCartes[i].lastChild.hidden);
    
                if (nb_click == 0)// 1er click
                {                   
                    click1_img = tabCartes[i].lastChild.firstChild.getAttribute("src").split("/")[1].split(".")[0];
                    click1_index = tabCartes[i].id;
                    
                    nb_click ++;                    
                }
                else if (nb_click == 1)// second click
                {                   
                    click2_img = tabCartes[i].lastChild.firstChild.getAttribute("src").split("/")[1].split(".")[0];
                    click2_index = tabCartes[i].id;
                
                    nb_click = 0;
    
                    // Test à faire avant de lancer la fct de vérification : 
                    // L'utilisateur a cliqué 2 fois sur la même image
                    if (click1_index == click2_index)
                    {
                        console.log("erreur : 2 fois la même case cliquée !!!")
                        nb_click = 1;
                    }
                    else {
                        verif_match = true;
                    }
                } 
    
                if (verif_match == true){
                    isMatched();
                }
    
                return (nb_click, click1_img, click1_index, click2_img , click2_index);
            }            
        }
        );
    };
};

function isMatched(){
    // contrôle de l'affichage des images ;
    // calcul des scores;
    
    if (click1_img == click2_img){
        console.log("Gagné pour ce coup!!!");
        // c'est gagné pour ce coup_ci : les images restent affichées et les variables réinitialisées

        score += 60 ;

        nb_click=0;
        click1_img="";
        click1_index="";
        click2_img=""; 
        click2_index="";
    }
    else // c'est perdu : les images sont remasquées au bout d'une seconde
    {
        score = score - 30 ;
        console.log("Perdu");
        /* pointer-events = none; */
        setTimeout(() => {
            hiddenCard();
          }, 1000)
        
    }

    /* console.log("score :", score); */
    elt_score.innerHTML=score;

    // Lancement de la fonction de détection fin
    end();
    
    return (score, nb_click,click1_img, click1_index,click2_img, click2_index);
}

function hiddenCard(){
    console.log("Hidden");
    tabCartes[click1_index].lastChild.hidden = true;
    tabCartes[click2_index].lastChild.hidden = true;

    nb_click=0;
    click1_img="";
    click1_index="";
    click2_img=""; 
    click2_index="";
}

function end(){
    // Est appelée depuis la fct isMatched
    console.log("DEBUT ----  > Fonction End");
    let end = false ;
    count_hidden_false = 0;
    end_temps = false ;
    end_win = false

    for (let i=0; i<tabCartes.length; i++){
        let hidden = tabCartes[i].lastChild.hidden;

        if(hidden == false){            
            count_hidden_false ++;
            if (count_hidden_false == nb_case || temps == '00'){                
                end = true;   
                if(temps == '00'){
                    end_temps = true;
                }  
                else {
                    end_win = true;
                }                          
            }
        }
    }

    if (end == true){
        console.log("Fin de la partie variable Temps!!!",end_temps );
        console.log("Fin de la partie variable Partie!!!",end_win );

        elt_score.innerHTML = score;

        if (end_temps==true){    
            console.log("---------- > Temps écoulé");
        }
        else if (end_win==true){
            console.log("---------- > Toutes les paires sont trouvées")
        };

        clearInterval(id_interval);

        // Enregistrement du score pour le pseudo dans le LocalStorage
        pseudo_stock = el_pseudo_grille.innerHTML;
        score_a_stock = score ;
        
        let scoreStocke = localStorage.getItem(pseudo_stock); 
        let chaine = ""; 
        let tab_scores = document.getElementById("tab_scores");
        
        
        if (scoreStocke === null)
        {
            localStorage.setItem(pseudo_stock, score_a_stock);
        }
        else {
            if (scoreStocke < score_a_stock) {
                localStorage.setItem(pseudo_stock, score_a_stock);
            }
        }
        
        // Récupérer les informations de LocalStorage pour mettre à jour le tableau des scores HTML
        for (i=0 ; i<localStorage.length ; i++) {
            let joueur = localStorage.key(i);
            let score_a_afficher = localStorage.getItem(joueur);
            chaine = chaine + "<br/>" + joueur + " : " + score_a_afficher + "<br/>"
        }
       
        tab_scores.innerHTML = chaine ;

        setTimeout(() => {
            alert("Fin de partie")
          }, 500)
          
        
        // Relance d'une partie Oui/Non 
        setTimeout(() => {
            nelle_Partie();
          }, 1000)       
    }
    console.log("FIN ----  > Fonction End");
}


function nelle_Partie() {
    // Appelée depuis la fonction End();
    if (confirm("Voulez vous faire une nouvelle partie?")) {
        setTimeout(() => {
            initialisationPlateau();
          }, 500)
    }
    else{
        alert("Non merci ; pas de nouvelle partie ;")
    }
}

function nbAleaUnik() {
    nb_tour = 0;
    
    while (tab_alea.length < nb_case)
    {
        let alea = Math.floor(Math.random()*nb_case);

        //console.log(tab_alea.some(el => el === alea)); // utilisation de some : si au moins un élément du tableau est égal au nb_alea tiré au sort 

        if ((tab_alea.some(el => el === alea)) == false) // on aurait le faire avce un includes()
        {
            tab_alea.push(alea);
        }
        nb_tour ++;
    }
    console.log(tab_alea, nb_tour); 
    return tab_alea;       
}

function initialisationPlateau() {

    // 1ère partie : Mise à jour du tableau tab_index_case, uniquement avec les images dans un premier temps.
    // Pour une image picochée au hasard on la pousse 2 fois dans le tableau tab_index_case. Afin de s'assurerla présence de paire d'images
    // Mise à jour du compteur dans la variable initiale tableau tab_img. 

    // réinitialisation des variables dans le cas de plus d'une partie
    score = 0;
    elt_score.innerHTML="0";

    tab_img = [["img_1", 0],["img_2", 0],["img_3", 0],["img_4", 0],["img_5", 0],["img_6", 0],["img_7", 0],
    ["img_8", 0],["img_9", 0],["img_10", 0],["img_11", 0],["img_12", 0],["img_13", 0]];
    tab_index_case = [] ; // Initialisation de la variable dans le cas d'une seconde partie (et plus)

    console.log("initPlateau DEB");    
    
    while (tab_index_case.length<nb_case)
    {
        index_img = alea_choix_img(); 
        console.log("index_img :", index_img);
        choix_img = tab_img[index_img][0];
        

        // Vérification du nombre d'apparitions de l'image piochée à l'aide du tableau tab_img
        for (let i=0 ; i<tab_img.length ; i++)
        {
            // Recherche de l'image piochée dans le tableau de départ pour mettre à jour son compteur && màj du compteur si pas plus de 2 apparitions
            if (tab_img[i][0] == choix_img && tab_img[i][1]<2)
            {   
                // Vérification : image n'a jamais été piochée => PAS présente dans le tableau avec méthode includes() des tableaux
                if ((tab_index_case.includes(choix_img))==false)
                {
                    tab_index_case.push(["",choix_img]);
                    tab_index_case.push(["",choix_img]);// push *2 pour les paires
                    // màj du compteur
                    tab_img[i][1]=2;
                }   
            }
        }
    }


    // ****************** 2ième partie de la fonction ****************

    // Le tab_index_case à ce stade ne contient que les images, les emplacements sont vides 
    // tab_index_case=[["",avatar1], ["",avatar1], ["",avatar2],["",avatar2], ...]
    // Le tableau tab_alea contient les index des cases piochées aléatoirement.
    // Il faut faire correspondre les deux tableaux
    
    // Appel de la fct qui renvoie tab_alea rempli
    nbAleaUnik();

    tab_index_case.forEach(function(el, index)
    {
        tab_alea.forEach(function(num, ind)
        {
            //console.log(index, el, el[0], el[1]);
            if (index==ind){
                el[0]=num;
            }            
            /* return console.log(num, ind); */            
        });
        return tab_index_case;
        /* return console.log(index, el, el[0], el[1]); */
    });

    console.log(tab_index_case);
    let sorted_tab_index_case = tab_index_case.sort((a,b)=> a[0]-b[0]);
    grille(sorted_tab_index_case);

    // Lancer de la fonction qui réalise le traitement des cartes cliquées directement dans cette fct initialisation du plateau. 
    // Nécessaire lorsque l'on relance une partie après la fin de la première partie
    cardClicked();

    console.log("initPlateau FIN");

    id_interval = setInterval(diminuerTemps, 1000); 
    temps = val_temps;
}

function diminuerTemps() {
    console.log("diminuer temps");
    let minutes = parseInt(temps / 60, 10);
    let secondes = parseInt(temps % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;

    timerElement.innerText = minutes + ":" + secondes;
    temps = temps <= 0 ? 0 : temps - 1;
}

function start(){
    var contentHeader = document.getElementById("header-content");
    var valueText = document.getElementById("pseudo").value;

    


    if (valueText === ''){
        alert('Inscrit un Pseudo')
    }
    else{
        contentHeader.remove();
        document.getElementById("game").hidden = false;
        document.getElementById("set-timer").hidden = false;
        console.log(valueText);
        console.log("element pseudo de la grille :",el_pseudo_grille);
        el_pseudo_grille.innerHTML = valueText;
    }
      
}

/* function BoutonDroit()
{
        if((event.button==2)||(event.button==3)||(event.button==4))
                        alert('Votre texte');
}
        document.onmousedown=BoutonDroit; */

/* var clickmessage="No! No! C'est ma propre image, Bouton droit désactivé sur les images!"
function disableclick(ev)
{   if (document.all)
    {if (event.button==2 || event.button==3)
        {if (event.srcElement.tagName=="IMG")
            {alert(clickmessage);
            return false;
            }
        }
    }
    if (document.layers)
    {
        if (ev.which==3)
        {alert(clickmessage);
        return false;
        }
    }
}
function associateimages()
{for (i=0;i<document.images.length;i++)
    document.images[i].onmousedown=disableclick
}
if (document.all)
    document.onmousedown=disableclick
else if (document.layers)
    associateimages()
 */
