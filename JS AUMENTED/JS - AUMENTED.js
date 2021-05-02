/////////////////////ABRIR Y CERRAR BOTON DE TUTORIAL COMPUTADORA
function openBtnTutoCompu() {
      document.getElementById("BtnTutoCompu").style.height = "100%";
      document.getElementById("BtnPregunta").style.height = "0%";
         
      
            //Si se abre un menu, se cierran los demas   
            CerrarMenu();  
      
      var anchoVentana = window.innerWidth;
      if(anchoVentana < 1300){
      var x = document.getElementById("myTopnav");
      x.className = "topnav";
      } 
      
      
       //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
       var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    function closeBtnTutoCompu() {
      document.getElementById("BtnTutoCompu").style.height = "0%";
      
       //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
       var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }


    
/////////////////////ABRIR Y CERRAR BOTON DE TUTORIAL MOVILES
    function openBtnTutoDispo() {
      document.getElementById("BtnTutoDispo").style.height = "100%";
      document.getElementById("BtnPregunta").style.height = "0%";
      
      
       var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    function closeBtnTutoDispo() {
      document.getElementById("BtnTutoDispo").style.height = "0%";
      
      
       var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }


/////////////////////ABRIR Y CERRAR BOTON DE INFORMACIÓN DE CONTACTO
function openBtnInfoPerso() {
      document.getElementById("BtnInfoPerso").style.height = "100%";
               
      
            //Si se abre un menu, se cierran los demas   
            CerrarMenu();

      var anchoVentana = window.innerWidth;
      if(anchoVentana < 1300){
      var x = document.getElementById("myTopnav");
      x.className = "topnav";
      } 
      
       //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
       var modal = document.getElementById("myModal");
        modal.style.display = "none";
        
        
       //*PARA QUE SE CIERRE LA PANTALLA DE INICIO AL PRESIONAR CUALQUIER LUGAR//  
          var BtnInfoPerso = document.getElementById("BtnInfoPerso");

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == BtnInfoPerso) {
        document.getElementById("BtnInfoPerso").style.height = "0%";
      }
    };
    }

    function closeBtnInfoPerso() {
      document.getElementById("BtnInfoPerso").style.height = "0%";
       //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
       var modal = document.getElementById("myModal");
        modal.style.display = "none"; 
    }


/////////////////////ABRIR Y CERRAR MENU DE LA DESCRIPCIÓN
    function closeBtnDescrip() {
      document.getElementById("BtnDescrip").style.height = "100%";
      closeBtnPregunta();
      closeBtnTutoCompu();
      closeBtnTutoDispo();
      closeBtnInfoPerso();   
      
      //Si se abre un menu, se cierran los demas   
      CerrarMenu();

      var anchoVentana = window.innerWidth;
      if(anchoVentana < 1300){
      var x = document.getElementById("myTopnav");
      x.className = "topnav";
      } 
      
       //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
       var modal = document.getElementById("myModal");
        modal.style.display = "none";
        
        
       //*PARA QUE SE CIERRE LA PANTALLA DE INICIO AL PRESIONAR CUALQUIER LUGAR//  
          var BtnDescrip = document.getElementById("BtnDescrip");

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == BtnDescrip) {
        document.getElementById("BtnDescrip").style.height = "0%";
      }
    };
    }

    function closeBtnDescrip() {
      document.getElementById("BtnDescrip").style.height = "0%";
       //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
       var modal = document.getElementById("myModal");
        modal.style.display = "none"; 
    }




/////////////////////CERRAR TODOS LOS MENUS Y PESTAÑAS
    function CerrarTodo(){
      closeBtnPregunta();
      closeBtnTutoCompu();
      closeBtnTutoDispo();
      closeBtnInfoPerso();
      closeBtnDescrip();
    
       //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
       var modal = document.getElementById("myModal");
        modal.style.display = "none";
       
      //Si se abre un menu, se cierran los demas   
      CerrarMenu();
      
    //Se cierran los menus y se pone en modo comprimido el menu, sin eliminar los titulos  
    var anchoVentana = window.innerWidth;
    if(anchoVentana < 1300){
    var x = document.getElementById("myTopnav");
    x.className = "topnav";
    }      
    } 
   
    
  
//FUNCION PARA CERRAR TODOS LOS MENUS
      function CerrarMenu(){
        document.getElementById("MenuMacro").style.display="none";
        document.getElementById("MenuHidro").style.display="none";
        document.getElementById("MenuOxi").style.display="none";
        document.getElementById("MenuIso").style.display="none";
        document.getElementById("MenuCicli").style.display="none";
        document.getElementById("MenuAro").style.display="none";
        document.getElementById("MenuHalo").style.display="none";
        document.getElementById("MenuNitro").style.display="none";
        document.getElementById("MenuAdi").style.display="none";
        document.getElementById("MenuMas").style.display="none";  
      }




//FUNCIONES PARA CERRAR CADA MENU
    function CerrarMenuMacro(){   
  var x = document.getElementById("MenuMacro");  
  //CERRAR TODAS LAS PESTAÑAS
  closeBtnPregunta();
  closeBtnTutoCompu();
  closeBtnTutoDispo();
  closeBtnInfoPerso();
  closeBtnDescrip();

  //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
  var modal = document.getElementById("myModal");
  modal.style.display = "none";

  //DESAPARECER LOS ELEMENTOS DEl MENU  
  if (x.style.display=="block"){x.style.display="none";}
  else{x.style.display="block"}
        
  //Cerrar los otros menus  
  //document.getElementById("MenuMacro").style.display="none";
  document.getElementById("MenuHidro").style.display="none";
  document.getElementById("MenuOxi").style.display="none";
  document.getElementById("MenuIso").style.display="none";
  document.getElementById("MenuCicli").style.display="none";
  document.getElementById("MenuAro").style.display="none";
  document.getElementById("MenuHalo").style.display="none";
  document.getElementById("MenuNitro").style.display="none";
  document.getElementById("MenuAdi").style.display="none";
  document.getElementById("MenuMas").style.display="none";
  }  

//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------    
    function CerrarMenuHidro(){   
  var x = document.getElementById("MenuHidro");  
  //CERRAR TODAS LAS PESTAÑAS
  closeBtnPregunta();
  closeBtnTutoCompu();
  closeBtnTutoDispo();
  closeBtnInfoPerso();
  closeBtnDescrip();

  //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
  var modal = document.getElementById("myModal");
  modal.style.display = "none";

  //DESAPARECER LOS ELEMENTOS DEl MENU  
  if (x.style.display=="block"){x.style.display="none";}
  else{x.style.display="block"}
        
  //Cerrar los otros menus  
  document.getElementById("MenuMacro").style.display="none";
  //document.getElementById("MenuHidro").style.display="none";
  document.getElementById("MenuOxi").style.display="none";
  document.getElementById("MenuIso").style.display="none";
  document.getElementById("MenuCicli").style.display="none";
  document.getElementById("MenuAro").style.display="none";
  document.getElementById("MenuHalo").style.display="none";
  document.getElementById("MenuNitro").style.display="none";
  document.getElementById("MenuAdi").style.display="none";
  document.getElementById("MenuMas").style.display="none";
  }
    
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------    
      function CerrarMenuOxi(){   
  var x = document.getElementById("MenuOxi");  
//CERRAR TODAS LAS PESTAÑAS
closeBtnPregunta();
closeBtnTutoCompu();
closeBtnTutoDispo();
closeBtnInfoPerso();
closeBtnDescrip();

  //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
  var modal = document.getElementById("myModal");
  modal.style.display = "none";

  //DESAPARECER LOS ELEMENTOS DEl MENU  
  if (x.style.display=="block"){x.style.display="none";}
  else{x.style.display="block"}
        
  //Cerrar los otros menus  
  document.getElementById("MenuMacro").style.display="none";
  document.getElementById("MenuHidro").style.display="none";
  //document.getElementById("MenuOxi").style.display="none";
  document.getElementById("MenuIso").style.display="none";
  document.getElementById("MenuCicli").style.display="none";
  document.getElementById("MenuAro").style.display="none";
  document.getElementById("MenuHalo").style.display="none";
  document.getElementById("MenuNitro").style.display="none";
  document.getElementById("MenuAdi").style.display="none";
  document.getElementById("MenuMas").style.display="none";
  }
    
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------    
    
    function CerrarMenuIso(){   
  var x = document.getElementById("MenuIso");  
//CERRAR TODAS LAS PESTAÑAS
closeBtnPregunta();
closeBtnTutoCompu();
closeBtnTutoDispo();
closeBtnInfoPerso();
closeBtnDescrip();

  //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
  var modal = document.getElementById("myModal");
  modal.style.display = "none";

  //DESAPARECER LOS ELEMENTOS DEl MENU  
  if (x.style.display=="block"){x.style.display="none";}
  else{x.style.display="block"}
        
  //Cerrar los otros menus  
  document.getElementById("MenuMacro").style.display="none";
  document.getElementById("MenuHidro").style.display="none";
  document.getElementById("MenuOxi").style.display="none";
  //document.getElementById("MenuIso").style.display="none";
  document.getElementById("MenuCicli").style.display="none";
  document.getElementById("MenuAro").style.display="none";
  document.getElementById("MenuHalo").style.display="none";
  document.getElementById("MenuNitro").style.display="none";
  document.getElementById("MenuAdi").style.display="none";
  document.getElementById("MenuMas").style.display="none";
  }  
    
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------    
         
  function CerrarMenuCicli(){   
  var x = document.getElementById("MenuCicli");  
//CERRAR TODAS LAS PESTAÑAS
closeBtnPregunta();
closeBtnTutoCompu();
closeBtnTutoDispo();
closeBtnInfoPerso();
closeBtnDescrip();

  //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
  var modal = document.getElementById("myModal");
  modal.style.display = "none";

  //DESAPARECER LOS ELEMENTOS DEl MENU  
  if (x.style.display=="block"){x.style.display="none";}
  else{x.style.display="block"}
        
  //Cerrar los otros menus  
  document.getElementById("MenuMacro").style.display="none";
  document.getElementById("MenuHidro").style.display="none";
  document.getElementById("MenuOxi").style.display="none";
  document.getElementById("MenuIso").style.display="none";
  //document.getElementById("MenuCicli").style.display="none";
  document.getElementById("MenuAro").style.display="none";
  document.getElementById("MenuHalo").style.display="none";
  document.getElementById("MenuNitro").style.display="none";
  document.getElementById("MenuAdi").style.display="none";
  document.getElementById("MenuMas").style.display="none";
  }    
    
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------    
    
 function CerrarMenuAro(){   
  var x = document.getElementById("MenuAro");  
//CERRAR TODAS LAS PESTAÑAS
closeBtnPregunta();
closeBtnTutoCompu();
closeBtnTutoDispo();
closeBtnInfoPerso();
closeBtnDescrip();

  //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
  var modal = document.getElementById("myModal");
  modal.style.display = "none";

  //DESAPARECER LOS ELEMENTOS DEl MENU  
  if (x.style.display=="block"){x.style.display="none";}
  else{x.style.display="block"}
        
  //Cerrar los otros menus  
  document.getElementById("MenuMacro").style.display="none";
  document.getElementById("MenuHidro").style.display="none";
  document.getElementById("MenuOxi").style.display="none";
  document.getElementById("MenuIso").style.display="none";
  document.getElementById("MenuCicli").style.display="none";
  //document.getElementById("MenuAro").style.display="none";
  document.getElementById("MenuHalo").style.display="none";
  document.getElementById("MenuNitro").style.display="none";
  document.getElementById("MenuAdi").style.display="none";
  document.getElementById("MenuMas").style.display="none";
  }     
    
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------    
     function CerrarMenuHalo(){   
  var x = document.getElementById("MenuHalo");  
//CERRAR TODAS LAS PESTAÑAS
closeBtnPregunta();
closeBtnTutoCompu();
closeBtnTutoDispo();
closeBtnInfoPerso();
closeBtnDescrip();

  //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
  var modal = document.getElementById("myModal");
  modal.style.display = "none";

  //DESAPARECER LOS ELEMENTOS DEl MENU  
  if (x.style.display=="block"){x.style.display="none";}
  else{x.style.display="block"}
        
  //Cerrar los otros menus  
  document.getElementById("MenuMacro").style.display="none";
  document.getElementById("MenuHidro").style.display="none";
  document.getElementById("MenuOxi").style.display="none";
  document.getElementById("MenuIso").style.display="none";
  document.getElementById("MenuCicli").style.display="none";
  document.getElementById("MenuAro").style.display="none";
  //document.getElementById("MenuHalo").style.display="none";
  document.getElementById("MenuNitro").style.display="none";
  document.getElementById("MenuAdi").style.display="none";
  document.getElementById("MenuMas").style.display="none";
  }      
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------        
    
   function CerrarMenuNitro(){   
  var x = document.getElementById("MenuNitro");  
//CERRAR TODAS LAS PESTAÑAS
closeBtnPregunta();
closeBtnTutoCompu();
closeBtnTutoDispo();
closeBtnInfoPerso();
closeBtnDescrip();

  //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
  var modal = document.getElementById("myModal");
  modal.style.display = "none";

  //DESAPARECER LOS ELEMENTOS DEl MENU  
  if (x.style.display=="block"){x.style.display="none";}
  else{x.style.display="block"}
        
  //Cerrar los otros menus  
  document.getElementById("MenuMacro").style.display="none";
  document.getElementById("MenuHidro").style.display="none";
  document.getElementById("MenuOxi").style.display="none";
  document.getElementById("MenuIso").style.display="none";
  document.getElementById("MenuCicli").style.display="none";
  document.getElementById("MenuAro").style.display="none";
  document.getElementById("MenuHalo").style.display="none";
  //document.getElementById("MenuNitro").style.display="none";
  document.getElementById("MenuAdi").style.display="none";
  document.getElementById("MenuMas").style.display="none";
  }   
    
    
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------    
    
  function CerrarMenuAdi(){   
  var x = document.getElementById("MenuAdi");  
//CERRAR TODAS LAS PESTAÑAS
closeBtnPregunta();
closeBtnTutoCompu();
closeBtnTutoDispo();
closeBtnInfoPerso();
closeBtnDescrip();

  //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
  var modal = document.getElementById("myModal");
  modal.style.display = "none";

  //DESAPARECER LOS ELEMENTOS DEl MENU  
  if (x.style.display=="block"){x.style.display="none";}
  else{x.style.display="block"}
        
  //Cerrar los otros menus  
  document.getElementById("MenuMacro").style.display="none";
  document.getElementById("MenuHidro").style.display="none";
  document.getElementById("MenuOxi").style.display="none";
  document.getElementById("MenuIso").style.display="none";
  document.getElementById("MenuCicli").style.display="none";
  document.getElementById("MenuAro").style.display="none";
  document.getElementById("MenuHalo").style.display="none";  
  document.getElementById("MenuNitro").style.display="none";
  //document.getElementById("MenuAdi").style.display="none";
  document.getElementById("MenuMas").style.display="none";
  }    
    
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------       
   function CerrarMenuMas(){   
  var x = document.getElementById("MenuMas");  
//CERRAR TODAS LAS PESTAÑAS
closeBtnPregunta();
closeBtnTutoCompu();
closeBtnTutoDispo();
closeBtnInfoPerso();
closeBtnDescrip();

  //*PARA QUE NO SE SOLAPEN LAS VENTANAS SI SE ABREN AL MISMO TIEMPO --  VENTANA DE INFO Y VENTANA DE TUTORIAL//  
  var modal = document.getElementById("myModal");
  modal.style.display = "none";

  //DESAPARECER LOS ELEMENTOS DEl MENU  
  if (x.style.display=="block"){x.style.display="none";}
  else{x.style.display="block"}
        
  //Cerrar los otros menus  
  document.getElementById("MenuMacro").style.display="none";
  document.getElementById("MenuHidro").style.display="none";
  document.getElementById("MenuOxi").style.display="none";
  document.getElementById("MenuIso").style.display="none";
  document.getElementById("MenuCicli").style.display="none";
  document.getElementById("MenuAro").style.display="none";
  document.getElementById("MenuHalo").style.display="none";
  document.getElementById("MenuNitro").style.display="none";
  document.getElementById("MenuAdi").style.display="none";
  //document.getElementById("MenuMas").style.display="none";
  }       
  
