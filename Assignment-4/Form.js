var isValid = true;
var errorCounter = 0;

function validateInputs(object, type, nameType) {
  if(nameType != "" && nameType != null){
      console.log(" Success");
      //regex

    
      var regExzipcode = "^[0-9]{5}$";
      var regExphone = "^[0-9]{3}-[0-9]{3}-[0-9]{4}$";
      var regExname = /^[a-zA-Z]+$/;
      var regExmail = /@northeastern\.edu/;
      var regExStreet = /^([a-zA-Z0-9 _-]+)$/;
      var regExcity = /^[a-zA-Z]+$/;
      var regExstate = /^[a-zA-Z]+$/;


      var name = "errorMsg" + nameType;
      isValid = true;

      switch (type) {

        case 1:
          if (!object.value.trim().match(regExmail)) {
            object.style.border = "3px solid red";
            document.getElementById(name).style.display = "block";
            object.value = "";
            isValid = false;
          } else {
            object.style.border = "";
            document.getElementById(name).style.display = "none";
          }
          break;
        
        case 2:
          if (!object.value.match(regExphone)) {
            object.style.border = "3px solid red";
            document.getElementById(name).style.display = "block";
            object.value = "";
            isValid = false;
          } else {
            object.style.border = "";
            document.getElementById(name).style.display = "none";
          }
          break;
          
        case 3:
          if (!object.value.match(regExzipcode)) {
            object.style.border = "3px solid red";
            document.getElementById(name).style.display = "block";
            object.value = "";
            isValid = false;
          } else {
            object.style.border = "";
            document.getElementById(name).style.display = "none";
          }
          break;
          
        case 4:
          if (!object.value.match(regExname))
          {
            object.style.border = "3px solid red";
            document.getElementById(name).style.display = "block";
            object.value = "";
            isValid = false;
          }else {
            object.style.border = "";
            document.getElementById(name).style.display = "none";
          }
          break;
          
          case 5:
            if (!object.value.match(regExname))
            {
              object.style.border = "3px solid red";
              document.getElementById(name).style.display = "block";
              object.value = "";
              isValid = false;
            }else {
              object.style.border = "";
              document.getElementById(name).style.display = "none";
            }
            break;

            
            case 6:
            if (!object.value.match(regExStreet))
            {
              object.style.border = "3px solid red";
              document.getElementById(name).style.display = "block";
              object.value = "";
              isValid = false;
            }else {
              object.style.border = "";
              document.getElementById(name).style.display = "none";
            }
            break;
           
            case 7:
            if (!object.value.match(regExcity))
            {
              object.style.border = "3px solid red";
              document.getElementById(name).style.display = "block";
              object.value = "";
              isValid = false;
            }else {
              object.style.border = "";
              document.getElementById(name).style.display = "none";
            }
            break;
            
            case 8:
            if (!object.value.match(regExstate))
            {
              object.style.border = "3px solid red";
              document.getElementById(name).style.display = "block";
              object.value = "";
              isValid = false;
            }else {
              object.style.border = "";
              document.getElementById(name).style.display = "none";
            }
            break;
      }
  } 
  else{
  var radioTitle = document.querySelectorAll('#TitleRadio');
  var RadioChecked = false;
  for(var i = 0; i < radioTitle.length; i++)
    {
        if(radioTitle[i].checked == true){
           RadioChecked = true;
        }
    }
    if(!RadioChecked){
      isValid = false;
    }
  if(document.getElementById('firstName').value == "" || document.getElementById('firstName').value == null){
    isValid = false;
  }
  if(document.getElementById('lastName').value == "" || document.getElementById('lastName').value == null){
    isValid = false;
  }
  if(document.getElementById('emailId').value == "" || document.getElementById('emailId').value == null){
    isValid = false;
  }
  if(document.getElementById('phoneNumber').value == "" || document.getElementById('phoneNumber').value == null){
    isValid = false;
  }
  if(document.getElementById('streetAddress1').value == "" || document.getElementById('streetAddress1').value == null){
    isValid = false;
  }
  
  if(document.getElementById('city').value == "" || document.getElementById('city').value == null){
    isValid = false;
  }
   if(document.getElementById('zipcode').value == "" || document.getElementById('zipcode').value == null){
     isValid = false;
   }
  if(document.getElementById('state').value == "" || document.getElementById('state').value == null){
    isValid = false;
  }

  var socialMediaHear = document.querySelectorAll('#mediaFeedback');
  var isMediaSelected = false
  for(var i = 0; i < socialMediaHear.length; i++)
    {
        if(socialMediaHear[i].checked == true){
            isMediaSelected = true;
        }
    }
    if(!isMediaSelected){
      isValid = false;
    }

  if(document.getElementById('comments').value == "" || document.getElementById('comments').value == null){
    isValid = false;
  }

  if(!isValid){

  document.getElementById("errorMsgManditory").style.display = "block";
  }
}
}
// Alert Messages.
function onSubmit() {
  window.event.preventDefault();
    validateInputs(null,null,null);

    if(isValid){

    alert("Form submitted successfully");
    window.event.preventDefault();

    displayTable();
    document.getElementById("feedback").reset();
    hideonReset();

    }
  }

  function hideonReset(){
    var argErrors = document.querySelectorAll('.Error');

    for(var i = 0; i < argErrors.length; i++)
    {
        argErrors[i].style.display = 'none';
    }
    document.getElementById("phoneNumber").style.border = "";
    document.getElementById("emailId").style.border = "";
    document.getElementById("zipcode").style.border = "";

    hideCheckboxesandNotes();
  }
  function showCheckbox(element){
    hideCheckboxesandNotes();
    if (element.value != 'NA' && element.value != null) {
        document.getElementById(element.value).style.display="";
    }
    
  }
  //On dropdown change, this function hides the checkboxes and notes of text fields.
  function hideCheckboxesandNotes(){
    var argCheckboxes = document.querySelectorAll('.menuCheckboxes');

    for(var i = 0; i < argCheckboxes.length; i++)
    {
      argCheckboxes[i].style.display = 'none';
    }

    var argNotes = document.querySelectorAll('.NoteField');
    for(var i = 0; i<argNotes.length; i++)
    {
        argNotes[i].style.display = 'none';
    }
  }
  //putting data into a table and displaying it next to the feedback form
  function displayTable(){
  document.getElementById('tableForm').style.display = "block";
  var radioTitle = document.querySelectorAll('#TitleRadio');
  for(var i = 0; i < radioTitle.length; i++)
    {
        if(radioTitle[i].checked == true){
            document.getElementById('TTitle').value = radioTitle[i].value;
        }
    }
  //Radio values
  document.getElementById('TfirstName').value = document.getElementById('firstName').value;

  document.getElementById('TlastName').value = document.getElementById('lastName').value;

  document.getElementById('TemailId').value = document.getElementById('emailId').value;

  document.getElementById('TphoneNumber').value = document.getElementById('phoneNumber').value;

  document.getElementById('TstreetAddress1').value = document.getElementById('streetAddress1').value;

  document.getElementById('TstreetAddress2').value = document.getElementById('streetAddress2').value;

  document.getElementById('Tcity').value = document.getElementById('city').value;

   document.getElementById('Tzipcode').value = document.getElementById('zipcode').value;

  document.getElementById('Tstate').value = document.getElementById('state').value;

  var socialMediaHear = document.querySelectorAll('#mediaFeedback');
  document.getElementById('Thear').value = "";
  var FeebackResult = "";
  var counter = 0;
  for(var i = 0; i < socialMediaHear.length; i++)
    {
        if(socialMediaHear[i].checked == true){
            if(counter == 0){
            FeebackResult = FeebackResult +socialMediaHear[i].value;
            counter++;
            }
            else{
                FeebackResult = FeebackResult + ", "+ socialMediaHear[i].value;  
            }
        }
    }
  document.getElementById('Thear').value = FeebackResult;

  if(document.getElementById('dropdown').value != 'NA')
  {
  document.getElementById('TMocha').value = document.getElementById('dropdown').value;
  } else{
    document.getElementById('TMocha').value = "";
  }

  var menuCheckboxes = document.querySelectorAll('.checkboxAns');
  for(var i = 0; i < menuCheckboxes.length; i++)
    {
        if(menuCheckboxes[i].checked == true){
            if(menuCheckboxes[i].value == "Cappuccino")
            {
                document.getElementById('TmenuCheckboxes').value = "Add Cappuccino for extra-5$." ;
            } 
             else if(menuCheckboxes[i].value == "Macchiato")
             {
                document.getElementById('TmenuCheckboxes').value = "Add Macchiato for extra-0.99$." ;
            }
              else if(menuCheckboxes[i].value == "Ristretto")
              {
                document.getElementById('TmenuCheckboxes').value = "Add Ristretto for extra-2$." ;
            }else if(menuCheckboxes[i].value == "Americano")
            {
                document.getElementById('TmenuCheckboxes').value = "Add Americano for extra-3$." ;
            } else if(menuCheckboxes[i].value == "Mocha")
            {
                document.getElementById('TmenuCheckboxes').value = "Add Mocha for extra-1f$." ;
            }
        }
    }

  document.getElementById('TNote').value = document.getElementById('note').value;

  document.getElementById('Tcomments').value = document.getElementById('comments').value;
        
  }

