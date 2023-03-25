var container=document.createElement("div");
container.className="container";

var tables=document.createElement("table");
tables.setAttribute("class","table");

var row=document.createElement("tr");

var head=document.createElement("th");
head.innerHTML=("id");
var head1=document.createElement("th");
head1.innerHTML=("Name");
var head2=document.createElement("th");
head2.innerHTML=("Email");


row.append(head,head1,head2);
tables.append(row);
container.append(tables);
document.body.append(container);

var res=fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
res.then((data)=>data.json())
.then((data1)=>sum(data1)) 
.catch((error)=>console.log(error));

function sum(data1)
{
  console.log(data1);
  for(var i=0;i<data1.length;i++){
        var ele=document.createElement("tr");
    var ele1=document.createElement("td");
  var ele2=document.createElement("td");
    var ele3=document.createElement("td");
    ele1.innerHTML=(data1[i].id);
    ele2.innerHTML=(data1[i].name);
    ele3.innerHTML=(data1[i].email);
    ele.append(ele1,ele2,ele3);
    tables.append(ele);
  }
} 
var page=document.createElement("div");
page.setAttribute("class","pagination-container");

var page1=document.createElement("div");
page1.setAttribute("class","pagination");

var button=document.createElement("button");
button.setAttribute("class","control","id","prev","title","Previous page");
button.innerHTML=("< prev");

var num=document.createElement("div");
num.setAttribute("class","pagenumber");

var button1=document.createElement("button");
button1.setAttribute("class","control","id","prev","title","Previous page");
button1.innerHTML=("Next >");

page1.append(button,num,button1);
page.append(page1);
container.append(page)
// ---------------------------------------------------------------------------------------------------------------------------------------
const pageNumbers = document.querySelector(".pageNumbers");
const paginationList = document.getElementById("paginationList");
const listItems = paginationList.querySelectorAll("li");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const contentLimit = 10;
const pageCount = Math.ceil(listItems.length / contentLimit);
let currentPage = 1;

const displayPageNumbers = (index) =>{
    const pageNumber = document.createElement("a");
    pageNumber.innerText = index;
    pageNumber.setAttribute('href', "#");
    pageNumber.setAttribute("index", index);
    pageNumbers.appendChild(pageNumber);
};

const getPageNumbers = ()=>{
    for(let i=1; i <= pageCount; i++){
        displayPageNumbers(i);
    };
};

const disableButton = (button) =>{
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};

const enableButton = (button) =>{
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

const controlButtonsStatus = () =>{
    if(currentPage == 1){
        disableButton(prevButton);
    }
    else{
        enableButton(prevButton);
    }
    if(pageCount == currentPage){
        disableButton(nextButton);
    }
    else{
        enableButton(nextButton);
    }
};

const handleActivePageNumber = () =>{
    document.querySelectorAll('a').forEach((button) =>{
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("index"));
        if(pageIndex == currentPage){
            button.classList.add('active');
        }
    });
};

const setCurrentPage = (pageNum) =>{
    currentPage = pageNum;

    handleActivePageNumber();
    controlButtonsStatus();

    const prevRange = (pageNum -1) * contentLimit;
    const currRange = pageNum * contentLimit;

    listItems.forEach((item, index) =>{
        item.classList.add('hidden');
        if(index >= prevRange && index < currRange){
            item.classList.remove('hidden');
        }
    });
};

window.addEventListener('load', ()=>{
    getPageNumbers();
    setCurrentPage(1);

    prevButton.addEventListener('click', ()=>{
        setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener("click", ()=>{
        setCurrentPage(currentPage + 1);
    });

    document.querySelectorAll('a').forEach((button) =>{
        const pageIndex = Number(button.getAttribute('index'));

        if(pageIndex){
            button.addEventListener('click', ()=>{
                setCurrentPage(pageIndex);
            });
        };
    });
});