
$(document).ready(function () {
    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        //const forms = document.querySelectorAll('.needs-validation')
        //Get the button
        let mybutton = document.getElementById("btn-back-to-top");
        mybutton.style.display = "none";

        // When the user scrolls down 50px from the top of the document, show the button
        window.onscroll = function () {
            scrollFunction();
        };

        function scrollFunction() {
            if (
                document.body.scrollTop > 50 ||
                document.documentElement.scrollTop > 50
            ) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }
        // When the user clicks on the button, scroll to the top of the document
        mybutton.addEventListener("click", backToTop);

        function backToTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    })()
});