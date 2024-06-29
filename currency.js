const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcur=document.querySelector(".from select");
const tocur=document.querySelector(".to select");
const msg=document.querySelector(".msg");
let amount=document.querySelector(".amount input");
for(let select of dropdowns)
   { for (code in countryList)
        {
            let newoption=document.createElement("option");
            newoption.innerText=code;
            newoption.value=code;
            if(select.name==="from"&&code==="USD")
                {
                    newoption.selected='selected';
                }
            else if(select.name==="to"&&code==="BDT")
                    {
                        newoption.selected='selected';
                    }
                
            select.append(newoption);
        }
        select.addEventListener("change",(evt)=>{
            updateflag(evt.target);
        });

    }
 const updateflag=(element)=>{
    let currencycode=element.value;
    let countrycode=countryList[currencycode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
  
}
const updateExchangeRate=async()=>{
    let amtval=amount.value;
    if(amtval<1||amtval.length==0)
        {
            amtval=1;
            amount.value=1;
        }
   
        
    const url=`${base_url}${fromcur.value.toLowerCase()}.json`;
    
    let response=await fetch(url);
    let data=await response.json();
   let rate=data[fromcur.value.toLowerCase()][tocur.value.toLowerCase()];
   let finalamt=amtval*rate;
   msg.innerText=`${amtval} ${fromcur.value} = ${finalamt.toFixed(2)} ${tocur.value}`;

}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();  
            updateExchangeRate();   
});
window.addEventListener("load",()=>{
    updateExchangeRate();
})


