<?php

// youtube video watched: https://www.youtube.com/watch?v=RcN265mm_mw
// NEED ; AFTER EACH LINE
if(isset($_POST['submit'])){ //see if it is submitted
    $mailto = "hannahreader171@gmail.com"; // email address
    //get form data
    $name = $POST['name']; //grab name
    $email = $POST['email']; //grab email
    $message = $POST['message']; //grab message
    $submit_sub = "Confirmation: Message was submitted successfully"; //confirmation to show person

    //Email body to recieve
    $message = "Name: " . $name . "\n"
    . "Message: " . "\n" . $message;

    //message for confirmation to person --  probably won't need
    
    //Email header
    $hearders = "From: " . $email; //client email to recieve

    //php mailer function
    
    $result = mail($mailto, $message, $headers); //sends email to personal email address

    //check if mail sends successfully
    if ($result){
        $success = "Message was sent Sucessfully!";
    }
    else{
        $failed = "Sorry! Message was not sent.";
    }
}

//php code that was copied from website.
/*
$errors = '';
$myemail = 'hannahreader171@gmail.com';//<-----Put Your email address here.

if(empty($_POST['name'])  || 
   empty($_POST['email']) || 
   empty($_POST['message']))
{
    $errors .= "\n Error: all fields are required";
}


$name = $_POST['name']; 
$email_address = $_POST['email']; 
$message = $_POST['message']; 

if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
$email_address))
{
    $errors .= "\n Error: Invalid email address";
}

if( empty($errors))

    {

    $to = $myemail;

    $email_subject = "Contact form submission: $name";

    $email_body = "You have received a new message. ".

    " Here are the details:\n Name: $name \n ".

    "Email: $email_address\n Message \n $message";

    $headers = "From: $myemail\n";

    $headers .= "Reply-To: $email_address";

    mail($to,$email_subject,$email_body,$headers);

    //redirect to the 'thank you' page
    //tryes to redirect to thank you page that does not exist
    //header('Location: contact-form-thank-you.html');


    }
*/
?>