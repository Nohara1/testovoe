(() => {
  // src/scripts/main.js
  document.addEventListener("DOMContentLoaded", function() {
    const aboutUsItems = document.querySelectorAll(".cell__item");
    const button = document.querySelector(".cell__button");
    let selectedUrl = "";
    aboutUsItems.forEach((item) => {
      item.addEventListener("click", function() {
        const isActive = this.classList.contains("cell__active");
        aboutUsItems.forEach((el) => el.classList.remove("cell__active"));
        if (!isActive) {
          this.classList.add("cell__active");
          selectedUrl = this.getAttribute("data-url");
        } else {
          selectedUrl = "";
        }
      });
    });
    button.addEventListener("click", function() {
      if (selectedUrl) {
        window.location.href = selectedUrl;
      }
    });
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
        "YEARLY ACCESS": "J\xC4HRLICHER ZUGRIFF",
        "BEST OFFER": "BESTES ANGEBOT",
        "Just {{price}} per year": "Nur {{price}} pro Jahr",
        "WEEKLY ACCESS": "W\xD6CHENTLICHER ZUGRIFF",
        "{{price}} <br>per week": "{{price}} <br>pro Woche",
        "Terms of Use": "Nutzungsbedingungen",
        "Privacy Policy": "Datenschutzrichtlinie",
        "Restore": "Wiederherstellen",
        "Continue": "Weiter"
      },
      es: {
        "Get Unlimited <br>Access": "Obt\xE9n acceso <br>ilimitado",
        "Unlimited Art <br>Creation": "Ilimitada creaci\xF3n <br>de arte",
        "Exclusive <br>Styles": "Estilos <br>exclusivos",
        "Magic Avatars <br>With 20% Off": "20 % de descuento en <br>avatares de IA",
        "YEARLY ACCESS": "ACCESO ANUAL",
        "BEST OFFER": "MEJOR OFERTA",
        "Just {{price}} per year": "Solo {{price}} por a\xF1o",
        "WEEKLY ACCESS": "ACCESO SEMANAL",
        "{{price}} <br>per week": "{{price}} <br>por semana",
        "Terms of Use": "T\xE9rminos de uso",
        "Privacy Policy": "Pol\xEDtica de privacidad",
        "Restore": "Restaurar",
        "Continue": "Continuar"
      },
      fr: {
        "Get Unlimited <br>Access": "Obtenez un acc\xE8s <br>illimit\xE9",
        "Unlimited Art <br>Creation": "Cr\xE9ation artistique <br>illimit\xE9e",
        "Exclusive <br>Styles": "Styles <br>exclusifs",
        "Magic Avatars <br>With 20% Off": "20&nbsp;% de r\xE9duction <br>sur les avatars IA",
        "YEARLY ACCESS": "ACC\xC8S ANNUEL",
        "BEST OFFER": "MEILLEURE OFFRE",
        "Just {{price}} per year": "Seulement {{price}} par an",
        "WEEKLY ACCESS": "ACC\xC8S HEBDOMADAIRE",
        "{{price}} <br>per week": "{{price}} <br>par semaine",
        "Terms of Use": "Conditions d\u2019utilisation",
        "Privacy Policy": "Politique de confidentialit\xE9",
        "Restore": "Restaurer",
        "Continue": "Continuer"
      },
      ja: {
        "Get Unlimited <br>Access": "\u7121\u5236\u9650\u30A2\u30AF\u30BB\u30B9<br>\u3092\u5165\u624B",
        "Unlimited Art <br>Creation": "\u30A2\u30FC\u30C8\u4F5C\u54C1\u3092<br>\u7121\u5236\u9650\u306B\u5275\u9020",
        "Exclusive <br>Styles": "\u7279\u5225\u306A<br>\u30B9\u30BF\u30A4\u30EB",
        "Magic Avatars <br>With 20% Off": "AI\u30A2\u30D0\u30BF\u30FC\u304C<br>20%\u30AA\u30D5",
        "YEARLY ACCESS": "\u5E74\u9593\u30A2\u30AF\u30BB\u30B9",
        "BEST OFFER": "\u30D9\u30B9\u30C8\u30AA\u30D5\u30A1\u30FC",
        "Just {{price}} per year": "\u308F\u305A\u304B{{price}}/\u5E74",
        "WEEKLY ACCESS": "\u9031\u3054\u3068\u306E\u30A2\u30AF\u30BB\u30B9",
        "{{price}} <br>per week": "{{price}}/\u9031<br>",
        "Terms of Use": "\u5229\u7528\u898F\u7D04",
        "Privacy Policy": "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC",
        "Restore": "\u5FA9\u5143\u3059\u308B",
        "Continue": "\u7D9A\u884C\u3059\u308B"
      },
      pt: {
        "Get Unlimited <br>Access": "Obtenha Acesso <br>Ilimitado",
        "Unlimited Art <br>Creation": "Cria\xE7\xE3o de Arte <br>Ilimitada",
        "Exclusive <br>Styles": "Estilos <br>Exclusivos",
        "Magic Avatars <br>With 20% Off": "20% de Desconto em <br>Avatares de IA",
        "YEARLY ACCESS": "ACESSO ANUAL",
        "BEST OFFER": "MELHOR OFERTA",
        "Just {{price}} per year": "Apenas {{price}} por ano",
        "WEEKLY ACCESS": "ACESSO SEMANAL",
        "{{price}} <br>per week": "{{price}} <br>por semana",
        "Terms of Use": "Termos de Uso",
        "Privacy Policy": "Pol\xEDtica de Privacidade",
        "Restore": "Restaurar",
        "Continue": "Continuar"
      }
    };
    const queryParams = new URLSearchParams(window.location.search);
    let lang = queryParams.get("lang") || navigator.language.substring(0, 2).toLowerCase();
    if (!translations[lang]) {
      lang = "en";
    }
    console.log("Detected language:", lang);
    const priceYearly = "$49.99";
    const priceWeekly = "$4.99";
    document.getElementById("title").innerHTML = translations[lang]["Get Unlimited <br>Access"];
    document.getElementById("description").innerHTML = translations[lang]["Unlimited Art <br>Creation"];
    document.getElementById("exclusive-styles").innerHTML = translations[lang]["Exclusive <br>Styles"];
    document.getElementById("magic-avatars").innerHTML = translations[lang]["Magic Avatars <br>With 20% Off"];
    document.getElementById("yearly-access").innerHTML = translations[lang]["YEARLY ACCESS"];
    document.getElementById("best-offer").innerHTML = translations[lang]["BEST OFFER"];
    document.getElementById("yearly-price").innerHTML = translations[lang]["Just {{price}} per year"].replace("{{price}}", priceYearly);
    document.getElementById("weekly-access").innerHTML = translations[lang]["WEEKLY ACCESS"];
    document.getElementById("weekly-price").innerHTML = translations[lang]["{{price}} <br>per week"].replace("{{price}}", priceWeekly);
    document.getElementById("terms-of-use").innerHTML = translations[lang]["Terms of Use"];
    document.getElementById("privacy-policy").innerHTML = translations[lang]["Privacy Policy"];
    document.getElementById("restore").innerHTML = translations[lang]["Restore"];
    document.getElementById("continue").innerHTML = translations[lang]["Continue"];
    if (lang === "de") {
      document.getElementById("weekly-access").style.fontSize = "11px";
      document.getElementById("yearly-access").style.fontSize = "14px";
      document.querySelector(".cart__heading").style.fontSize = "26px";
      document.getElementById("best-offer").style.fontSize = "12px";
      document.querySelector(".footer__items").style.padding = "0";
    } else if (lang === "fr") {
      document.querySelector(".cart__heading").style.fontSize = "28px";
      document.querySelector(".footer__items").style.padding = "0";
      document.getElementById("best-offer").style.fontSize = "12px";
      document.getElementById("yearly-price").style.fontSize = "12px";
      document.getElementById("weekly-access").style.fontSize = "12px";
    } else if (lang === "pt") {
      document.querySelector(".footer__items").style.padding = "0";
      document.getElementById("yearly-price").style.fontSize = "14px";
    }
  });
})();
//# sourceMappingURL=main.js.map
