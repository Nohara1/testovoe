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
          }else {
            selectedUrl = '';
        }
      });
  });
  button.addEventListener('click', function() {
    if (selectedUrl) {
        window.location.href = selectedUrl; 
    }
});

//fetch 

const translations = {
    en: {
      "Get Unlimited <br>Access": "Get Unlimited <br>Access",
      "Unlimited Art <br>Creation": "Unlimited Art <br>Creation",
      "Exclusive <br>Styles": "Exclusive <br>Styles",
      "Magic Avatars <br>With 20% Off": "Magic Avatars <br>With 20% Off",
      "YEARLY ACCESS": "YEARLY ACCESS",
      "BEST OFFER": "BEST OFFER",
      "Just {{price}} per year": "Just {{price}} per year",
      "WEEKLY ACCESS": "WEEKLY ACCESS",
      "{{price}} <br>per week": "{{price}} <br>per week",
      "Terms of Use": "Terms of Use",
      "Privacy Policy": "Privacy Policy",
      "Restore": "Restore",
      "Continue": "Continue"
    },
    de: {
      "Get Unlimited <br>Access": "Erhalten Sie unbegrenzten <br>Zugriff",
      "Unlimited Art <br>Creation": "Unbegrenzte <br>Kunstschaffung",
      "Exclusive <br>Styles": "Exklusive <br>Stile",
      "Magic Avatars <br>With 20% Off": "20 % Rabatt auf <br>KI-Avatare",
      "YEARLY ACCESS": "JÄHRLICHER ZUGRIFF",
      "BEST OFFER": "BESTES ANGEBOT",
      "Just {{price}} per year": "Nur {{price}} pro Jahr",
      "WEEKLY ACCESS": "WÖCHENTLICHER ZUGRIFF",
      "{{price}} <br>per week": "{{price}} <br>pro Woche",
      "Terms of Use": "Nutzungsbedingungen",
      "Privacy Policy": "Datenschutzrichtlinie",
      "Restore": "Wiederherstellen",
      "Continue": "Weiter"
    },
    es:{
        "Get Unlimited <br>Access": "Obtén acceso <br>ilimitado",
        "Unlimited Art <br>Creation": "Ilimitada creación <br>de arte",
        "Exclusive <br>Styles": "Estilos <br>exclusivos",
        "Magic Avatars <br>With 20% Off": "20 % de descuento en <br>avatares de IA",
        "YEARLY ACCESS": "ACCESO ANUAL",
        "BEST OFFER": "MEJOR OFERTA",
        "Just {{price}} per year": "Solo {{price}} por año",
        "WEEKLY ACCESS": "ACCESO SEMANAL",
        "{{price}} <br>per week": "{{price}} <br>por semana",
        "Terms of Use": "Términos de uso",
        "Privacy Policy": "Política de privacidad",
        "Restore": "Restaurar",
        "Continue": "Continuar"
      },
      fr:{
        "Get Unlimited <br>Access": "Obtenez un accès <br>illimité",
        "Unlimited Art <br>Creation": "Création artistique <br>illimitée",
        "Exclusive <br>Styles": "Styles <br>exclusifs",
        "Magic Avatars <br>With 20% Off": "20&nbsp;% de réduction <br>sur les avatars IA",
        "YEARLY ACCESS": "ACCÈS ANNUEL",
        "BEST OFFER": "MEILLEURE OFFRE",
        "Just {{price}} per year": "Seulement {{price}} par an",
        "WEEKLY ACCESS": "ACCÈS HEBDOMADAIRE",
        "{{price}} <br>per week": "{{price}} <br>par semaine",
        "Terms of Use": "Conditions d’utilisation",
        "Privacy Policy": "Politique de confidentialité",
        "Restore": "Restaurer",
        "Continue": "Continuer"
      },
      ja:{
        "Get Unlimited <br>Access": "無制限アクセス<br>を入手",
        "Unlimited Art <br>Creation": "アート作品を<br>無制限に創造",
        "Exclusive <br>Styles": "特別な<br>スタイル",
        "Magic Avatars <br>With 20% Off": "AIアバターが<br>20%オフ",
        "YEARLY ACCESS": "年間アクセス",
        "BEST OFFER": "ベストオファー",
        "Just {{price}} per year": "わずか{{price}}/年",
        "WEEKLY ACCESS": "週ごとのアクセス",
        "{{price}} <br>per week": "{{price}}/週<br>",
        "Terms of Use": "利用規約",
        "Privacy Policy": "プライバシーポリシー",
        "Restore": "復元する",
        "Continue": "続行する"
      },
      pt:{
        "Get Unlimited <br>Access": "Obtenha Acesso <br>Ilimitado",
        "Unlimited Art <br>Creation": "Criação de Arte <br>Ilimitada",
        "Exclusive <br>Styles": "Estilos <br>Exclusivos",
        "Magic Avatars <br>With 20% Off": "20% de Desconto em <br>Avatares de IA",
        "YEARLY ACCESS": "ACESSO ANUAL",
        "BEST OFFER": "MELHOR OFERTA",
        "Just {{price}} per year": "Apenas {{price}} por ano",
        "WEEKLY ACCESS": "ACESSO SEMANAL",
        "{{price}} <br>per week": "{{price}} <br>por semana",
        "Terms of Use": "Termos de Uso",
        "Privacy Policy": "Política de Privacidade",
        "Restore": "Restaurar",
        "Continue": "Continuar"
      }
  };
  const queryParams = new URLSearchParams(window.location.search);
            let lang = queryParams.get('lang') || navigator.language.substring(0, 2);

            if (!translations[lang]) {
                lang = 'en';
            }

            console.log("Detected language:", lang);

            const priceYearly = "$49.99"; 
            const priceWeekly = "$4.99";  

            document.getElementById('title').innerHTML = translations[lang]["Get Unlimited <br>Access"];
            document.getElementById('description').innerHTML = translations[lang]["Unlimited Art <br>Creation"];
            document.getElementById('exclusive-styles').innerHTML = translations[lang]["Exclusive <br>Styles"];
            document.getElementById('magic-avatars').innerHTML = translations[lang]["Magic Avatars <br>With 20% Off"];
            document.getElementById('yearly-access').innerHTML = translations[lang]["YEARLY ACCESS"];
            document.getElementById('best-offer').innerHTML = translations[lang]["BEST OFFER"];
            
            document.getElementById('yearly-price').innerHTML = translations[lang]["Just {{price}} per year"].replace("{{price}}", priceYearly);
            document.getElementById('weekly-access').innerHTML = translations[lang]["WEEKLY ACCESS"];
            document.getElementById('weekly-price').innerHTML = translations[lang]["{{price}} <br>per week"].replace("{{price}}", priceWeekly);
            document.getElementById('terms-of-use').innerHTML = translations[lang]["Terms of Use"];
            document.getElementById('privacy-policy').innerHTML = translations[lang]["Privacy Policy"];
            document.getElementById('restore').innerHTML = translations[lang]["Restore"];
            document.getElementById('continue').innerHTML = translations[lang]["Continue"];


            if (lang === 'de' ) {
              document.getElementById('weekly-access').style.fontSize = '11px';
              document.getElementById('yearly-access').style.fontSize = '14px';
                document.querySelector('.cart__heading').style.fontSize = '26px'; 
                document.getElementById('best-offer').style.fontSize = '12px';
                document.querySelector('.footer__items').style.padding = '0';
            }
            else if (lang === 'fr') {
              document.querySelector('.cart__heading').style.fontSize = '28px'; 
              document.querySelector('.footer__items').style.padding = '0';
              document.getElementById('best-offer').style.fontSize = '12px';
              document.getElementById('yearly-price').style.fontSize = '12px';
              document.getElementById('weekly-access').style.fontSize = '12px'
            }else if (lang === 'pt') {
              document.querySelector('.footer__items').style.padding = '0';
              document.getElementById('yearly-price').style.fontSize = '14px'
            }
});
 