// Animation de scrolling via la barre de navigation
$('header nav a').on('click', function(e){
    e.preventDefault();
    
    let hash = this.hash;
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top
    }, 900, function(){
        window.location.hash = hash;
    });
});

// Animation d'accordéon pour le menu
$(".navbar .navbar-brand").on('click', function(e){
    $(".navbar-collapse").collapse("hide");
});


$(".navbar-nav .nav-link").on('click', function(e){
    $(".navbar-collapse").collapse("hide");
});

// Animation de remplissage des compétences
let skillsLoaded = false;

function loadSkills()
{
    $(".progress-bar").each(function(){
        let bar = this;
        let width = 0;
        let max = bar.style.maxWidth.split('%')[0];
        let id = setInterval(frame, 5);

        function frame()
        {
            if (width >= max)
            {
                clearInterval(id);
            }
            else
            {
                width += 2;
                bar.style.width = width + '%';
            }
        }
    });
        
    skillsLoaded = true;
}

function unloadSkills()
{
    $(".progress-bar").each(function(){
        this.style.width = '0%';
    });
        
    skillsLoaded = false;
}

$(window).on('load', function(e){
    if($('[href="#competences"]').hasClass("active") && !skillsLoaded)
    {
        loadSkills();
    }
});


$('[href="#competences"]').on('click', function(e){
    if(!skillsLoaded)
    {
        loadSkills();
    }
});

$(window).on('scroll', function(e){
    if($('[href="#competences"]').hasClass("active") && !skillsLoaded)
    {
        loadSkills();
    }
    else if(!$('[href="#competences"]').hasClass("active") && skillsLoaded)
    {
        unloadSkills();
    }
});

// fonction formulaire:

$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});

// création de la fonction

function submitForm(){
    // Initiate Variables With Form Content
    let name = $("#name").val();
    let email = $("#email").val();
    let message = $("#message").val();
 
    $.ajax({
        type: "POST",
        url: "form-process.php",
        data: "name=" + name + "&email=" + email + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            }
        }
    });
}
function formSuccess(){
    $( "#msgSubmit" ).removeClass( "hidden" );
}