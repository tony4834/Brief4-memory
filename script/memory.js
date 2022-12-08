console.log('coucou');


let nb_case = 16 ;
let nb_alea ;


let nb_alea_1;
let nb_alea_2;

let tab_val_case = [];


//image 1
for (i=0; i<2; i++)
{
    nb_alea = Math.floor(Math.random()*nb_case);   
    if (nb_alea in tab_val_case)
    {
        //on sort
    } 
    else 
    {
        tab_val_case[i]=nb_alea;
    }    
}
console.log(tab_val_case);