// FOR DATE

var date=(function () {
    var d=new Date();
var month = d.getMonth()+1, year = d.getFullYear();
if(month===1)
document.getElementById("date").textContent='JANUARY'+' '+year;
else if(month===2)
document.getElementById("date").textContent='FEBRUARY'+' '+year;
else if(month===3)
document.getElementById("date").textContent='MARCH'+' '+year;
else if(month===4)
document.getElementById("date").textContent='APRIL'+' '+year;
else if(month===5)
document.getElementById("date").textContent='MAY'+' '+year;
else if(month===6)
document.getElementById("date").textContent='JUNE'+' '+year;
else if(month===7)
document.getElementById("date").textContent='JULY'+' '+year;
else if(month===8)
document.getElementById("date").textContent='AUGUST'+' '+year;
else if(month===9)
document.getElementById("date").textContent='SEPTEMBER'+' '+year;
else if(month===10)
document.getElementById("date").textContent='OCTOBER'+' '+year;
else if(month===11)
document.getElementById("date").textContent='NOVENBER'+' '+year;
else if(month===12)
document.getElementById("date").textContent='DECEMBER'+' '+year;
})();

var inArr=[];           // array for income data
var outArr=[];          //array for expense data
var global=0.00;
var total_inc=0.00;
var total_exp=0.00;
var inc_count=0;
var exp_count=0;



function display(){
    var n = Math.abs(global).toFixed(2);
    var x = n.split(".");
    document.querySelector("#total_inc").textContent="+" + " " + total_inc.toFixed(2);
    document.querySelector("#total_exp").textContent="-" + " " + total_exp.toFixed(2);
    if(x[0].length>3)
    {
        x[0]=x[0].substr(0,x[0].length-3) + "," + x[0].substr(x[0].length-3,3);
        if(global<0)
        document.querySelector("#total").textContent ="-" + " " + x[0] + "." + x[1];
        else if(global>0)
        document.querySelector("#total").textContent ="+" + " " + x[0] + "." + x[1];
    }
    else
    {
        if(global<0)
        document.querySelector("#total").textContent ="-" + " " + Math.abs(global).toFixed(2);
        else if(global>0)
        document.querySelector("#total").textContent ="+" + " " + Math.abs(global).toFixed(2);
        else
        document.querySelector("#total").textContent = "0.00";
    }
}




          // Module 1: on entering enter key
document.addEventListener("keypress",function(event){
    if(event.keyCode===13)    // for keypress "Enter"
    {   
        if(document.querySelector("#discription").value == "")
        alert("DISCRIPTION BOX IS EMPTY!!!");
        else if(document.querySelector("#value").value < 0)
        alert("CHOOSE '+' FOR INCOME AND '-' FOR EXPENSE AND ENTER POSITIVE NUMBER IN VALUE BOX !!!");
        else
        {
            var html,newHtml;
            var input = (function(){                // to take input fromm the user
            return{
                id: document.querySelector("select").value,
                disc : document.querySelector("#discription").value,
                val : document.querySelector("#value").value,
                count : 0
            }
        })();
        if(input.id=="+")
        {
            input.count = inc_count;  // assigning unique count no. to input element
            inArr.push(input);        // to append input from user to array
            html = '<div id="%id%" class="income_list"><h4 class="income_list_disc">%discription%</h4><div class="income_list_val">%value%</div><button class="delete">x</button></div>'    // html to be added to append input
            newHtml = html.replace("%discription%",input.disc);
            newHtml = newHtml.replace("%id%","inc_" + input.count);
            newHtml = newHtml.replace("%value%", Number(input.val).toFixed(2));
            document.querySelector(".income_list_container").insertAdjacentHTML("afterbegin", newHtml);      // code to append input
            total_inc += Number(input.val);
            inc_count++;
        }      
        else if(input.id="-")
        {
            input.count = exp_count;
            outArr.push(input);      // to append input from user to array
            html = '<div id="%id%" class="expenses_list"><h4 class="expenses_list_disc">%discription%</h4><div class="expenses_list_val">%value%</div><button id="ss" class="delete">x</button></div>'     // html to be added to append input
            newHtml = html.replace("%discription%",input.disc);
            newHtml = newHtml.replace("%id%","exp_" + input.count);
            newHtml = newHtml.replace("%value%",  Number(input.val).toFixed(2));
            document.querySelector(".expenses_list_container").insertAdjacentHTML("afterbegin", newHtml);    // code to append input
            total_exp += Number(input.val);
            exp_count++;
        }
        global = total_inc-total_exp;
        display();
        document.querySelector("#discription").value=""; 
        document.querySelector("#value").value=""; 
        }
    }
}); 


        // Module 2: on entering delete button
document.querySelector("#down").addEventListener("click", function(event){
    var x = event.target.className;
    var n = event.target.parentNode.id;
    if(x=="delete")
    {
        var y = n.split("_")
        if(y[0]=="inc")
        {
            var z=document.getElementById(n).childNodes;
            var sub = z[1].textContent;
            inArr.splice(Number(y[1]),1);
            inArr.splice(Number(y[1]),0,0);
            global-=Number(sub);
            total_inc-=Number(sub);
        }
        else if(y[0]=="exp")
        {
            var z=document.getElementById(n).childNodes;
            var add = z[1].textContent;
            outArr.splice(Number(y[1]),1);
            outArr.splice(Number(y[1]),0,0);
            global+=Number(add);
            total_exp-=Number(add);
        }
        document.getElementById(n).parentNode.removeChild(document.getElementById(n));
        display();
    }
});