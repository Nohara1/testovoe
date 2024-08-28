document.addEventListener("DOMContentLoaded", function () {
  const aboutUsItems = document.querySelectorAll(".cell__item");
  const button = document.querySelector(".cell__button");
  
  let selectedUrl = '';

  aboutUsItems.forEach((item) => {
    item.addEventListener('click', function(){
      const isActive = this.classList.contains('cell__active');
        
      aboutUsItems.forEach(el => el.classList.remove('cell__active'));
        
      if (!isActive) {
        this.classList.add('cell__active');
        selectedUrl = this.getAttribute('data-url');
      } else {
        selectedUrl = '';
      }
    });
  });

  button.addEventListener('click', function() {
    if (selectedUrl) {
      window.location.href = selectedUrl; 
    }
  });

  const queryParams = new URLSearchParams(window.location.search);
  let lang = queryParams.get('lang') || navigator.language.substring(0, 2).toLowerCase();

  function loadTranslations(language) {
    return fetch(`./translations/${language}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Language file not found');
        }
        return response.json();
      });
  }

  loadTranslations(lang)
    .then(translations => {
      console.log("Detected language:", lang);
      return translations;
    })
    .catch(error => {
      console.error('Language not found:', lang, error);
      return loadTranslations('en');
    })
    .then(translations => {
      const priceYearly = "$49.99";
      const priceWeekly = "$4.99";

      document.getElementById('title').innerHTML = translations["Get Unlimited <br>Access"];
      document.getElementById('description').innerHTML = translations["Unlimited Art <br>Creation"];
      document.getElementById('exclusive-styles').innerHTML = translations["Exclusive <br>Styles"];
      document.getElementById('magic-avatars').innerHTML = translations["Magic Avatars <br>With 20% Off"];
      document.getElementById('yearly-access').innerHTML = translations["YEARLY ACCESS"];
      document.getElementById('best-offer').innerHTML = translations["BEST OFFER"];
      document.getElementById('yearly-price').innerHTML = translations["Just {{price}} per year"].replace("{{price}}", priceYearly);
      document.getElementById('weekly-access').innerHTML = translations["WEEKLY ACCESS"];
      document.getElementById('weekly-price').innerHTML = translations["{{price}} <br>per week"].replace("{{price}}", priceWeekly);
      document.getElementById('terms-of-use').innerHTML = translations["Terms of Use"];
      document.getElementById('privacy-policy').innerHTML = translations["Privacy Policy"];
      document.getElementById('restore').innerHTML = translations["Restore"];
      document.getElementById('continue').innerHTML = translations["Continue"];

      if (lang === 'de') {
        document.getElementById('weekly-access').style.fontSize = '11px';
        document.getElementById('yearly-access').style.fontSize = '14px';
        document.querySelector('.cart__heading').style.fontSize = '26px';
        document.getElementById('best-offer').style.fontSize = '12px';
        document.querySelector('.footer__items').style.padding = '0';
      } else if (lang === 'fr') {
        document.querySelector('.cart__heading').style.fontSize = '28px';
        document.querySelector('.footer__items').style.padding = '0';
        document.getElementById('best-offer').style.fontSize = '12px';
        document.getElementById('yearly-price').style.fontSize = '12px';
        document.getElementById('weekly-access').style.fontSize = '12px';
      } else if (lang === 'pt') {
        document.querySelector('.footer__items').style.padding = '0';
        document.getElementById('yearly-price').style.fontSize = '14px';
      }
    })
    .catch(error => {
      console.error('Error loading translations:', error);
    });
});
