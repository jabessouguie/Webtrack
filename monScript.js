var victore = false;
var deplacements = document.getElementById("deplacement");
var compteur = 0;
var bouge = true;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
  

async function mix()
{
    bouge = true;
    compteur = 0;
    deplacements.textContent = compteur;
    for(i=0;i<100;i++)
    {
        rowNum1 = Math.floor(Math.random() * 4);        
        rowNum2 = Math.floor(Math.random() * 4);
        colNum1 = Math.floor(Math.random() * 4)+1;
        colNum2 = Math.floor(Math.random() * 4)+1;
        if((rowNum1 != rowNum2)||(colNum1 != colNum2))
        {            
            tempo = document.getElementById("matrix").children[rowNum1].children[colNum1].children[0].innerHTML;
            document.getElementById("matrix").children[rowNum1].children[colNum1].children[0].innerHTML = document.getElementById("matrix").children[rowNum2].children[colNum2].children[0].innerHTML;
            document.getElementById("matrix").children[rowNum2].children[colNum2].children[0].innerHTML = tempo;
            tempoClass = document.getElementById("matrix").children[rowNum1].children[colNum1].children[0].getAttribute("class");    
            //alert(rowNum1 + " - " + colNum1 + " - " +  document.getElementById("matrix").children[rowNum1].children[colNum1].children[0].classList);
            document.getElementById("matrix").children[rowNum1].children[colNum1].children[0].classList = document.getElementById("matrix").children[rowNum2].children[colNum2].children[0].classList;
            //alert(document.getElementById("matrix").children[rowNum1].children[colNum1].children[0].classList);
            //alert(rowNum2 + " - " + colNum2 + " - " + document.getElementById("matrix").children[rowNum2].children[colNum2].children[0].classList);
            document.getElementById("matrix").children[rowNum2].children[colNum2].children[0].classList = tempoClass;
            //alert(document.getElementById("matrix").children[rowNum2].children[colNum2].children[0].classList);
            await sleep(50);   
        }
    }  
}

function moveElement(num)
{
    move = false;
    if (victoire) return;
    rowNum = Math.floor(num /4);
    colNum = (num % 4) + 1; 
    // Il s'agit juste de bouger en vérifiant que la case n'est pas au bout. Surement long et pas optimal mais bon
    if ((rowNum>0) && (document.getElementById("matrix").children[rowNum-1].children[colNum].children[0].innerHTML=="*"))        
    {
        document.getElementById("matrix").children[rowNum-1].children[colNum].children[0].innerHTML = document.getElementById("matrix").children[rowNum].children[colNum].children[0].innerHTML;
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].innerHTML = "*";
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("cell");
        document.getElementById("matrix").children[rowNum-1].children[colNum].children[0].classList.toggle("bouton-danger");
        document.getElementById("matrix").children[rowNum-1].children[colNum].children[0].classList.toggle("bouton-info");        
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("bouton-danger");
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("bouton-info");  
        document.getElementById("matrix").children[rowNum-1].children[colNum].children[0].classList.toggle("cell");  
        verifyTri();      
        return;
    }
    if ((rowNum<3) && (document.getElementById("matrix").children[rowNum+1].children[colNum].children[0].innerHTML=="*"))        
    {
        document.getElementById("matrix").children[rowNum+1].children[colNum].children[0].innerHTML = document.getElementById("matrix").children[rowNum].children[colNum].children[0].innerHTML;
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].innerHTML = "*";
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("cell");
        document.getElementById("matrix").children[rowNum+1].children[colNum].children[0].classList.toggle("bouton-danger");
        document.getElementById("matrix").children[rowNum+1].children[colNum].children[0].classList.toggle("bouton-info");       
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("bouton-danger");
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("boutonn-info");
        document.getElementById("matrix").children[rowNum+1].children[colNum].children[0].classList.toggle("cell");  
        verifyTri();
        return;
    }
    if ((colNum>1) && (document.getElementById("matrix").children[rowNum].children[colNum-1].children[0].innerHTML=="*"))        
    {
        document.getElementById("matrix").children[rowNum].children[colNum-1].children[0].innerHTML = document.getElementById("matrix").children[rowNum].children[colNum].children[0].innerHTML;
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].innerHTML = "*";
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("cell");        
        document.getElementById("matrix").children[rowNum].children[colNum-1].children[0].classList.toggle("bouton-danger");
        document.getElementById("matrix").children[rowNum].children[colNum-1].children[0].classList.toggle("bouton-info");
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("bouton-danger");
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("bouton-info");
        document.getElementById("matrix").children[rowNum].children[colNum-1].children[0].classList.toggle("cell");          
        verifyTri();
        return;
    }
    if ((colNum<4) && (document.getElementById("matrix").children[rowNum].children[colNum+1].children[0].innerHTML=="*"))        
    {
        document.getElementById("matrix").children[rowNum].children[colNum+1].children[0].innerHTML = document.getElementById("matrix").children[rowNum].children[colNum].children[0].innerHTML;
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].innerHTML = "*";
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("cell");
        document.getElementById("matrix").children[rowNum].children[colNum+1].children[0].classList.toggle("bouton-danger");
        document.getElementById("matrix").children[rowNum].children[colNum+1].children[0].classList.toggle("bouton-info");        
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("boutonn-danger");
        document.getElementById("matrix").children[rowNum].children[colNum].children[0].classList.toggle("boutonn-info");
        document.getElementById("matrix").children[rowNum].children[colNum+1].children[0].classList.toggle("cell");  
        verifyTri();        
        return;
    }    
}

function verifyTri()
{
    listBt = document.querySelectorAll(".cell");    
    i=0;
    while(i<listBt.length-1)
    {
        console.log(listBt[i].innerHTML + " - " +  listBt[i+1].innerHTML + " - " + listBt.length);
        if(parseInt(listBt[i].innerHTML) >  parseInt(listBt[i+1].innerHTML)) return false;
        i++;
    }        
    finish = true;
    printFinish();
    return true;
}

async function affichageFinal()
{
    move = false;
    listBt = document.querySelectorAll("[onmouseover]");  
    for(i=0;i<listBt.length;i++)
    {
        listBt[i].classList.add("boutonn-succes");
        listBt[i].classList.remove("boutonn-danger");
        listBt[i].classList.remove("boutonn-info");
        await sleep(150);
    };
}
