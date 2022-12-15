
let case_concernee = document.querySelectorAll(".card");
/* console.log(case_concernee); */

let nb_case = 16 ; // doit être un multiple de 4
let index_case ;
let index_img ;
let img_alea ;

let temps = 50;
const timerElement = document.getElementById("timer");

let tab_index_case = []; // le tableau qui est alimenté lors de la fonction initialisationPlateau [[1;img_1],[15,img_1], ....]
let tab_alea =[];
let tab_img = [["img_1", 0],["img_2", 0],["img_3", 0],["img_4", 0],["img_5", 0],["img_6", 0],["img_7", 0],
["img_8", 0],["img_9", 0],["img_10", 0],["img_11", 0],["img_12", 0],["img_13", 0]];

let cb_box = document.getElementsByClassName("side");
/* console.log(cb_box); */




/* *************** LANCEMENT DES FCTS *****************/

initialisationPlateau();
/* nbAleaUnik(); */
/* grille(tab_index_case); */


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
                        "<div class=\"card\">"+
                            "<div class=\"side side--front\" id=\"case_"+j+"_f\">"+
                                "<img src='images/codi.png' alt=\"\">"+
                            "</div>\n"+
                            "<div class=\"side side--back\" id=\"case_"+j+"_b\">"+
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
    
    console.log(chaine);


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

    /* console.log(tab_index_case); */
    let sorted_tab_index_case = tab_index_case.sort((a,b)=> a[0]-b[0]);
    /* console.log(sorted_tab_index_case); */
    grille(sorted_tab_index_case);

    setInterval(diminuerTemps, 1000); 
}



function diminuerTemps() {
    let minutes = parseInt(temps / 60, 10)
    let secondes = parseInt(temps % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes

    timerElement.innerText = minutes + ":" + secondes
    temps = temps <= 0 ? 0 : temps - 1
}