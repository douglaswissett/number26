//**********************************************************************
//
//  TITLE     - NUMBER26 Coding Challenge
//  AUTHOR    - DOUGLAS WISSETT WALKER
//  DATE      - 25/04/2016
//  VERSION   - 0.0.1
//
//**********************************************************************

$(document).ready(() => {
  console.log('js loaded');



  // function to grab age 
  function getAge(birthday) {
      let today = new Date();
      let birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
  }






  // function to preview gravitar
  function readURL(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
          $('#preview').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }




  $("#imageUpload").change(function(){
      readURL(this);
  });


  $('#signUp').click(function(e) {
    e.preventDefault();
    $('html,body').animate({
        scrollTop: $('#signForm').offset().top },
      'slow');
  });








  // function to check if valid email was entered
  function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }








  // fiddle to hide nav bar
  (function($) {
    var ost = 0;
    $(window).scroll(function() {
      var cOst = $(this).scrollTop();

      if(cOst > ost) {
         $('header').addClass('fixed').removeClass('default');
      }
      else {
         $('header').addClass('default').removeClass('fixed');
      }

      ost = cOst;
    });
  })(jQuery);










  // default hidden form inputs
  $('.address').hide();
  $('.profile').hide();
  $('.passwordInfo').hide();



  // form navigations
  $('#nextBtn').click((e) => {
    // prevent form from submitting
    e.preventDefault();
    // clear user messages
    $('.user').remove();

    // check valid email address
    if( !validateEmail($('#email').val() )) {
      let div = $('<div>').addClass('user');
      div.append('<p>Invalid email address</p>');
      $('#form').append(div);
      return;
    }

    // check user name provided
    if(!form.fullName.value) {
      let div = $('<div>').addClass('user');
      div.append('<p>We need to know your name</p>');
      $('#form').append(div);
      return; 
    }

    // check user is over 18 to sign up
    let age = getAge(form.dob.value);
    if(age < 18) {
      
      let div = $('<div>').addClass('user');
      div.append('<p>Please make sure you\'ve entered a valid date of birth and you\'re over 18 - unfortunately the Rubix Bear eats children</p>');
      $('#form').append(div);
      return;
    }

    if( $('#nationality').val() == 0 ) {
      let div = $('<div>').addClass('user');
      div.append('<p>Please pick a nationality</p>');
      $('#form').append(div);
      return;   
    }

    // hide and show current form
    $('.userInfo').hide();
    $('.address').show();

    // back button show last sign up form inputs
    $('#formBack').click((e) => {
      e.preventDefault();

      $('.address').hide();
      $('.userInfo').show();
    });

    // next button show next sign up form inputs
    $('#formNext').click((e) => {
      // prevent form from submitting
      e.preventDefault();
      // clear user messages
      $('.user').remove();

      if(!form.address1.value || !form.address2.value ||
        !form.areacode.value || !form.city.value) {

        let div = $('<div>').addClass('user');
        div.append('<p>Please enter a valid address - don\'t worry, we won\'t drive past late at night to see who\'s home</p>');
        $('#form').append(div);
        return;
      }


      // hide and show current form page
      $('.address').hide();
      $('.profile').show();

      $('#formBack2').click((e) => {
        e.preventDefault();




        $('.profile').hide();
        $('.address').show();
      });

      $('#formNext2').click((e) => {
        e.preventDefault();
        // clear user messages
        $('.user').remove();

        $('.profile').hide();
        $('.passwordInfo').show();

        $('#formBack3').click((e) => {
          e.preventDefault();

          $('.passwordInfo').hide();
          $('.profile').show();
        })
      });
    });
  });














  // password stength checker    Attribution: http://jsfiddle.net/aleem/KE3RB/8/
  $('#pass').keyup(function(e) {
    let strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    let mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    let enoughRegex = new RegExp("(?=.{6,}).*", "g");
    if (false == enoughRegex.test($(this).val())) {
           $('#passstrength').html('More Characters');
    } else if (strongRegex.test($(this).val())) {
           $('#passstrength').className = 'ok';
           $('#passstrength').html('Strong!');
    } else if (mediumRegex.test($(this).val())) {
           $('#passstrength').className = 'alert';
           $('#passstrength').html('Medium!');
    } else {
           $('#passstrength').className = 'error';
           $('#passstrength').html('Weak!');
    }
    return true;
  });

















  $('#form').submit((event)=> {
    // prevent form from submitting
    event.preventDefault();

    // clear user messages
    $('.user').remove();

    let form = document.getElementById('form');

    if(!form.fullName.value || !form.dob.value || !form.address1.value || !form.address2.value ||
        !form.areacode.value || !form.city.value || !form.nationality.value || !form.email.value || 
        !form.password.value) {

      let div = $('<div>').addClass('user');
      div.append('<p>Slow down there! You still need to provide more information. It\'s ok, have another go and we\'ll wait</p>');
      $('#form').append(div);

    } else {

      if(form.password.value === form.passwordConfirmation.value) {

        // check for three consecutive characters in password
        if(/(.)\1\1/.test(form.password.value)) {

          let div = $('<div>').addClass('user');
          div.append('<p>Password cannot contain three consecutive characters</p>');
          $('#form').append(div);
          return;
        }

        // check user is over 18 to sign up
        let age = getAge(form.dob.value);
        if(age < 18) {
          
          let div = $('<div>').addClass('user');
          div.append('<p>Please make sure you\'ve entered a valid date of birth and you\'re over 18 - unfortunately the Rubix Bear eats children</p>');
          $('#form').append(div);
          return;
        }

        // check checkbox is checked
        if(!form.checkbox.checked) {

          let div = $('<div>').addClass('user');
          div.append('<p>Please tick the checkbox</p>');
          $('#form').append(div);
          return;
        }


        // make ajax to some example.php file
        let data = {
          fullName: form.fullName.value,
          dob: form.dob.value,
          address: form.address1.value + ', ' + form.address2,
          zip: form.areacode.value,
          city: form.city.value,
          nationality: form.nationality.value,
          email: form.email.value,
          password: form.password.value
        }

        $.ajax({
          url: 'example.php',
          type: 'POST',
          data: data
        })

        $('.passwordInfo').hide();
        let h2 = $('<h2>').innerHTML = `Form submitted, welcome ${form.fullName.value}`;
        let div = $('<div>').addClass('submitMessage');
        div.append(h2);
        $('#form').append(div);

      } else {

        let div = $('<div>').addClass('user');
        div.append('<p>Sorry, but just like your outfit, the passwords you\'ve entered don\'t match</p>');
        $('#form').append(div);
      }
    }
  });

});