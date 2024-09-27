//Title constructor function that creates a Title object
function onLoadFunction() 
{
  document.getElementById("message").innerHTML = "FULL NAME : Rakada Deva Rushi Kamidi    NUID:002679991";
  let elements = document.getElementsByClassName( "dropDownTextArea" );
  for(i =0;i<elements.length;i++)
  {
  elements[i].hidden=true;
  }
  let elements2= document.getElementsByClassName("deletebutton");
  for(i=0;i<elements2.length;i++)
  {
    elements2[i].hidden=true;
  }
  let elements3= document.getElementsByClassName("editbutton");
  for(i=0;i<elements3.length;i++)
  {
    elements3[i].hidden=true;
  }
  document.getElementById("button").disabled = true;
  document.getElementById("deletebuttonth").hidden=true;
  document.getElementById("editbuttonth").hidden=true;
  
}


function showConfirm() {
  debugger;
  var confirmDiv = document.getElementById("confirm");
  confirmDiv.style.display = "block";
}

function showConfirm2()
{

  let person = prompt("Enter Student details"," ");
  
  
}
function closeConfirm() {
  var confirmDiv = document.getElementById("confirm");
  confirmDiv.style.display = "none";
}

var lastIndex=3 ;
function addNewRow()
{
  lastIndex++;

  var table = document.getElementById("myTable");
  
  let row= document.createElement("tr");
  row.setAttribute('class','details');
  let c1 = document.createElement("td")
  let c2 = document.createElement("td")
  let c3 = document.createElement("td")
  let c4 = document.createElement("td")
  let c5 = document.createElement("td")
  let c6 = document.createElement("td")
  let c7 = document.createElement("td")
  let c8 = document.createElement("td")
  let c9 = document.createElement("td")
  let c10 =document.createElement("td")


  c1.innerHTML='<input type="checkbox" onclick="highlight(this)"/><br /><br /><img onclick="unHide(this)" src="down.png" width="25px" />'
  c2.innerHTML="Student "+lastIndex;
  c3.innerHTML="Teacher "+lastIndex;
  c4.innerHTML="Approved"
  c5.innerHTML="FALL"
  c6.innerHTML="TA" 
  c7.innerHTML="34567" 
  c8.innerHTML="100%"
  c9.innerHTML='<button class="deletebutton" onclick="deleteRo(this)">Delete</button>';
  c10.innerHTML='<button class="editbutton" onclick="editdet(this)">Edit</button>';
  

  row.appendChild(c1);
  row.appendChild(c2);
  row.appendChild(c3);
  row.appendChild(c4);
  row.appendChild(c5);
  row.appendChild(c6);
  row.appendChild(c7);
  row.appendChild(c8);
  row.appendChild(c9);
  row.appendChild(c10);

  table.appendChild(row);

  let rowdetails= document.createElement("tr");
  rowdetails.setAttribute('class','dropDownTextArea');
  let rowdata =document.createElement("td")
  rowdata.innerHTML= "<td colspan='8'> Advisor:<br /><br />Award Details<br />Summer 1-2014(TA)<br />Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br /></td>";
  rowdata.setAttribute('colspan',8)
  rowdetails.appendChild(rowdata);
  table.appendChild(rowdetails);
  alert("student "+ lastIndex+"  Record Added Successfully");
  onLoadFunction();

}

function unHide(event)

{
  var dropdown = event.parentElement.parentElement;
  var next = dropdown.nextElementSibling;
  if (next && next.classList.contains("dropDownTextArea")) {
    next.style.display = next.style.display === "none" ? "table-row" : "none";
}
}

function highlight(checkbox)
{
  var selectedRow = checkbox.parentElement.parentElement ;
  if(checkbox.checked == true)
  {
    selectedRow.style.backgroundColor="yellow" ;

    document.getElementById("button").disabled=false;
    document.getElementById("button").style.backgroundColor = "orange";
    selectedRow.getElementsByClassName("editbutton")[0].hidden = false;
    selectedRow.getElementsByClassName("deletebutton")[0].hidden = false;
    selectedRow.getElementsByClassName("editbutton")[0].hidden = false;
    document.getElementById("deletebuttonth").hidden=false;
    document.getElementById("editbuttonth").hidden=false;
  }
  else
  {
    selectedRow.style.backgroundColor="White";
    document.getElementById("button").disabled=true;
    document.getElementById("button").style.backgroundColor = "grey";
    selectedRow.getElementsByClassName("editbutton")[0].hidden = true;
    selectedRow.getElementsByClassName("deletebutton")[0].hidden = true;
    let elements2= document.getElementsByClassName("deletebutton");
    var count =0;
    for(var i=0;i<elements2.length;i++){
      if(elements2[i].hidden == false){
        count++
      }
    }
    if(count == 0){
      document.getElementById("deletebuttonth").hidden=true;
      document.getElementById("editbuttonth").hidden=true;
    }
  }

}

function deleteRo(r)
{
  var i = r.parentNode.parentNode.rowIndex;
  var x =r.parentNode.parentNode.cells.item(1).innerHTML;
  document.getElementById("myTable").deleteRow(i);
  alert(x + " Record Deleted Successfully") 
}

function editdet(e)
{
  var x =e.parentNode.parentNode.cells.item(1).innerHTML;
  //confirm("Edit details of "+ x);
  showConfirm2();
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};


