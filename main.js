window.addEventListener("load", function() {
    const scrollBtn = document.querySelector(".scroll-to-top");
  
    /*button visibility halfway through page*/
    const refreshButtonVisibility = () => {
      if (document.documentElement.scrollTop < 10) {
        scrollBtn.style.display = "none";
      } else {
        scrollBtn.style.display = "block";
      }
    };
  
    /* Initialize button visibility on load */
    refreshButtonVisibility();
  
    /* Button that takes you to top of page */
    scrollBtn.addEventListener("click", () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0; 
    });
  
    /* Button appears when scrolling */
    document.addEventListener("scroll", () => {
      refreshButtonVisibility();
    });
  });
  