
let case_concernee = document.querySelectorAll(".card");
/* console.log(case_concernee); */

let nb_case = 16 ;
let index_case ;
let index_img ;
let img_alea ;

let tab_index_case = []; // le tableau qui est alimenté lors de la fonction initialisationPlateau [[1;img_1],[15,img_1], ....]
let tab_alea =[];
let tab_img = [["img_1", 0],["img_2", 0],["img_3", 0],["img_4", 0],["img_5", 0],["img_6", 0],["img_7", 0],
["img_8", 0],["img_9", 0],["img_10", 0],["img_11", 0],["img_12", 0],["img_13", 0]];

let cb_box = document.getElementsByClassName("side");
/* console.log(cb_box); */




/* *************** LANCEMENT DES FCTS *****************/
/* *************** */
/* *************** */

/* initialisationPlateau(); */
nbAleaUnik();
/* grille(tab_index_case); */

/* *************** */
/* *************** */
/* *************** */

// Fonction qui renvoie un nombre aléatoire pioché entre 1 et nombre d'avatars (longueur du tableau).
// Afin de déterminer un avatar de manière aléatoire
function alea_choix_img()
{
    let index_img = Math.floor(Math.random()*tab_img.length);  
    return index_img;
}


function grille(tab_index_casetab_index_case_img)
{
    let chaine = "";
    let bootstrapRow = document.getElementsByClassName("row");
    console.log(bootstrapRow);
    let tab = tab_index_case;
    console.log(tab.sort());

    for (let i=0; i<nb_case; i++)
    {   
        for (let j=0; j<tab.length;j++){
            console.log("toto")
        }
        chaine += 
        "<div class=\"container-card\">"+
            "<div class=\"card\">"+
                "<div class=\"side side--front\" id=\"case_"+i+"_f\">"+
                    "<img src='images/codi.png' alt=\"\">"+
                "</div>\n"+
                "<div class=\"side side--back\" id=\"case_"+i+"_b\">"+
                    "<img src='images/"+"codi"+".png' alt=\"\">"+
                "</div>"+
            "</div>"+
        "</div>"
        ;
    }

    bootstrapRow[0].innerHTML= chaine;
    /* console.log(bootstrapRow);   */ 
}

/* *************** */
/* *************** */
/* *************** */

function initialisationPlateau_old()
{
    while (tab_index_case.length<16)
    {
        index_img = alea_choix_img(); 
        choix_img = tab_img[index_img][0];
/*         console.log("************")
        console.log(choix_img); */
        
        let present = false;

        for(let i=0; i<tab_img.length; i++)
        {
            // si l'image n'a pas été choisie plus de 2 fois
            // On teste si le compteur (qui gère le nombre de fois où l'image est présente sur le plateau) est inf&érieur ou égal à deux
            if (tab_img[i][0]== choix_img && tab_img[i][1]<2) 
            {
                index_case = Math.floor(Math.random()*nb_case);    
                /* console.log("index_case :",index_case, " - ",choix_img, " - count sur plateau NON actua :", tab_img[i][1]); */

                // boucle pour s'assurer que l'index de la case pioché aléatoirement n'a pas déjà été pioché  OU 
/*              /* pioches = tab_index_case.filter(e => e[j][0] == index_case);
                const pioches = tab_index_case.filter(function (pioche) {
                return tab_index_case[j][0] == index_case ;
                });   */

                for(var j=0; j<tab_index_case.length; j++) 
                {  
                    /* console.log(j, " : index_case_deja_pioche :",pioches); */
                    if(index_case === tab_index_case[j][0])
                    {
                        present = true;
                    }
                }
        
                if (present == false) // si l'index n'a jamais été pioché auparavant alors on vient mettre l'image choisie
                {   
                    tab_index_case.push([index_case,choix_img]);
                    // ci dessous on vient mettre à jour le tableau image, avce la mise à jour du compteur pour l'image choisie
                    count_img_retenue = tab_img[i][1];  
                    count_img_retenue ++;
                    tab_img[i][1]=count_img_retenue;     
                    /* console.log(" - index case plateau : ",index_case,"count sur plateau actua;", count_img_retenue)  */
                    
                    // ici je relance la fct index_case pour obtenir le second emplacement de l'image qui j'ai piochée
                    present = true ;         
                    while (present == true)
                    {   
                        index_case = Math.floor(Math.random()*nb_case); 
                        // boucle pour s'assurer que l'index de la case pioché aléatoirement n'a pas déjà été pioché
                        for(var j=0; j<tab_index_case.length; j++) 
                        {
                            if(index_case === tab_index_case[j][0])
                            {
                                present = true;
                                break;
                            }
                            else
                            {   present = false
                            };
                        }                        
                    }

                    if (present == false) // si l'index n'a jamais été pioché auparavant alors on vient mettre l'image choisie
                    {   
                        tab_index_case.push([Number(index_case),choix_img]);
                        // ci dessous on vient mettre à jour le tableau image, avce la mise à jour du compteur pour l'image choisie
                        count_img_retenue = tab_img[i][1];  
                        count_img_retenue ++;
                        tab_img[i][1]=count_img_retenue;     
                        /* console.log(" - index case plateau : ",index_case,"count sur plateau actua 2;", count_img_retenue)  */
                    }
                }
            }
        }
    }
   return tab_index_case;
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

    while (tab_index_case.length<nb_case/2)
    {
        index_img = alea_choix_img(); 
        choix_img = tab_img[index_img][0];
        present = false;

        // Vérification du nombre d'apparitions de l'image piochée à l'aide du tableau tab_img
        for (let i=0 ; i<tab_img.length ; i++)
        {
            // Recherche de l'image piochée dans le tableau de départ pour mettre à jour son compteur && màj du compteur si pas plus de 2 apparitions
            if (tab_img[i][0] == choix_img && tab_img[i][1]<2)
            {   
                // Ajout de la première image choisie sans consition dans le tableau
                if (i==1){
                    tab_index_case.push(["",choix_img]);
                    // màj du compteur
                    tab_img[i][1]=2;
                }
                else {
                    // Vérification : image n'a jamais été piochée => PAS présente dans le tableau avec méthode includes() des tableaux
                    if ((tab_index_case.includes(choix_img))==false)
                    {
                        tab_index_case.push(["",choix_img]);
                        // màj du compteur
                        tab_img[i][1]=2;
                    }
                }     
            }
        }
    }

    // 2ième partie de la fonction : affectation des 16 nombres aléatoires picochés aux 8 images
    
    nbAleaUnik();
    //tab_index_case.forEach((el, index)=>console.log(el, el[0], el[1], index) );
    // équivaut à 
    /* tab_index_case.forEach(
        function (el, index) {

            tab_alea.forEach(
                function(nbAleatoire,index ){
                    console.log(nbAleatoire, index)
                    if (index==0 || index==1 )
                    {
                        recup += nbAleatoire
                    }
                    el[0] = recup;
                }
                );
            return console.log(el, el[0], el[1], index);
        }
    ) */

    console.log(tab_index_case);
    let images = tab_index_case.map(placement => placement[1]);
    console.log(images);

    console.log(tab_img);
    console.log(tab_alea)

    //console.log(tab_alea.sort((a,b)=> a-b));
}

