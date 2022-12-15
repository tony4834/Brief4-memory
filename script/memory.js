
let case_concernee = document.querySelectorAll(".card");
/* console.log(case_concernee); */

let nb_case = 16 ; // doit être un multiple de 4
let index_case ;
let index_img ;
let img_alea ;

let click1_img ;
let click1_index ;
let click2_img ;
let click2_index ;
let nb_click = 0 ;

let score = 0 ;
let count_hidden_false = 0;

let tab_index_case = []; // le tableau qui est alimenté lors de la fonction initialisationPlateau [[1;img_1],[15,img_1], ....]
let tab_alea =[];
let tab_img = [["img_1", 0],["img_2", 0],["img_3", 0],["img_4", 0],["img_5", 0],["img_6", 0],["img_7", 0],
["img_8", 0],["img_9", 0],["img_10", 0],["img_11", 0],["img_12", 0],["img_13", 0]];

/* let cb_box = document.getElementsByClassName("side");
console.log(cb_box); */




/* *************** LANCEMENT DES FCTS *****************/

initialisationPlateau();
/* nbAleaUnik(); */
/* grille(tab_index_case); */
let tabCartes = document.querySelectorAll(".card"); // pour le click sur une card. A placer après la création des éléments (fct initialisationPlateau). Utilisé par les fonctions cardClicked et isMatched
let elt_score = document.getElementById("score");
let elt_timer_text = document.getElementById("timer").innerHTML;
console.log(elt_timer_text);
cardClicked();


/* *************** LANCEMENT DES FCTS --- FIN *****************/



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
    /* console.log(chaine); */
}

function cardClicked(){    

    for (let i=0; i<tabCartes.length; i++){

        tabCartes[i].addEventListener("click", function(){

            tabCartes[i].lastChild.hidden = false;

            if (nb_click == 0)
            {                   
                click1_img = tabCartes[i].lastChild.firstChild.getAttribute("src").split("/")[1].split(".")[0];
                click1_index = tabCartes[i].id;
                
                nb_click ++;
                
            }
            else if (nb_click == 1)
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
                    isMatched();
                }
            } 
            
            return (nb_click, click1_img, click1_index, click2_img , click2_index);
        }
        );
    };
}

function isMatched(){
    // contrôle de l'affichage des images ;
    // calcul des scores;
    
    if (click1_img == click2_img){
        console.log("Gagné pour ce coup!!!");
        // c'est gagné pour ce coup_ci : les images restent affichées et les variables réinitialisées

        score += 60 ;
        
        // Lancement de la fonction de détection fin
        end();

        nb_click=0;
        click1_img="";
        click1_index="";
        click2_img=""; 
        click2_index="";
    }
    else // c'est perdu : les images sont masquées
    {
        score = score - 30 ;
        console.log("Perdu");
        setTimeout(hiddenCard,1000);
    }
    console.log("score :", score);
    elt_score.innerHTML=score;
    
    return (score, nb_click,click1_img, click1_index,click2_img, click2_index);
}

function end(){

    let end = false ;
    count_hidden_false = 0;

    for (let i=0; i<tabCartes.length; i++){
        let hidden = tabCartes[i].lastChild.hidden;

        if(hidden == false){            
            count_hidden_false ++;

            if (count_hidden_false == nb_case || elt_timer_text == '00:00'){
                console.log("Fin de la partie !!!");

                // Enregistrement du score pour le pseudo dans le LocalStorage

                // Relance d'une partie
                elt_score.innerHTML = "0"; // ne fonctionne pas
                setTimeout(initialisationPlateau, 5000);
                
            }
        }
    }
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
    
    while (tab_index_case.length<nb_case)
    {
        index_img = alea_choix_img(); 
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
/*     console.log('-----------')
    console.log(tab_alea);
    console.log(tab_index_case);
    console.log('-----------') */

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
    /* console.log(sorted_tab_index_case); */
    grille(sorted_tab_index_case);    
}

